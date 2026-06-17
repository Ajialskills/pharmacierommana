/**
 * Fetch brand logos from official websites and save locally to public/brands/.
 * Generates a SQL migration to update the brands table with logo_url + is_featured.
 *
 * Usage: node scripts/fetch-brand-logos.mjs
 */

import fs from "fs";
import path from "path";
import https from "https";
import http from "http";
import { URL } from "url";

const OUT_DIR = path.resolve("public/brands");
fs.mkdirSync(OUT_DIR, { recursive: true });

// Top pharmacy brands to feature — name must match DB name exactly, slug must match DB slug
const FEATURED_BRANDS = [
  { name: "Vichy",           slug: "vichy",             domain: "vichy.com" },
  { name: "La Roche Posay",  slug: "la-roche-posay",    domain: "laroche-posay.com" },
  { name: "Bioderma",        slug: "bioderma",           domain: "bioderma.com" },
  { name: "Avene",           slug: "avene",              domain: "avene.com" },
  { name: "Uriage",          slug: "uriage",             domain: "uriage.com" },
  { name: "Cerave",          slug: "cerave",             domain: "cerave.fr" },
  { name: "Klorane",         slug: "klorane",            domain: "klorane.com" },
  { name: "Ducray",          slug: "ducray",             domain: "ducray.com" },
  { name: "Eucerin",         slug: "eucerin",            domain: "eucerin.fr" },
  { name: "Svr",             slug: "svr",                domain: "laboratoiresvr.com" },
  { name: "Cétaphil",        slug: "cetaphil",           domain: "cetaphil.fr" },
  { name: "ISDIN",           slug: "isdin",              domain: "isdin.com" },
  { name: "A-Derma",         slug: "a-derma",            domain: "a-derma.com" },
  { name: "Noreva",          slug: "noreva",             domain: "noreva.com" },
  { name: "PEDIAKID",        slug: "pediakid",           domain: "pediakid.com" },
  { name: "Physiodose",      slug: "physiodose",         domain: "physiodose.com" },
  { name: "Urgo",            slug: "urgo",               domain: "urgo.fr" },
  { name: "Omron",           slug: "omron",              domain: "omron-healthcare.com" },
];

function fetchUrl(urlStr, redirects = 5) {
  return new Promise((resolve, reject) => {
    if (redirects === 0) return reject(new Error("Too many redirects"));
    const parsed = new URL(urlStr);
    const mod = parsed.protocol === "https:" ? https : http;
    const req = mod.get(urlStr, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; PharmacieRommana/1.0; logo-fetcher)",
        "Accept": "text/html,application/xhtml+xml,*/*",
      },
      timeout: 10000,
    }, (res) => {
      if ([301, 302, 303, 307, 308].includes(res.statusCode) && res.headers.location) {
        const next = new URL(res.headers.location, urlStr).toString();
        return resolve(fetchUrl(next, redirects - 1));
      }
      const chunks = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () => resolve({ status: res.statusCode, body: Buffer.concat(chunks).toString("utf-8"), headers: res.headers }));
      res.on("error", reject);
    });
    req.on("error", reject);
    req.on("timeout", () => { req.destroy(); reject(new Error("Timeout")); });
  });
}

function downloadBinary(urlStr, destPath, redirects = 5) {
  return new Promise((resolve, reject) => {
    if (redirects === 0) return reject(new Error("Too many redirects"));
    const parsed = new URL(urlStr);
    const mod = parsed.protocol === "https:" ? https : http;
    const req = mod.get(urlStr, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; PharmacieRommana/1.0; logo-fetcher)" },
      timeout: 10000,
    }, (res) => {
      if ([301, 302, 303, 307, 308].includes(res.statusCode) && res.headers.location) {
        const next = new URL(res.headers.location, urlStr).toString();
        return resolve(downloadBinary(next, destPath, redirects - 1));
      }
      if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode}`));
      const out = fs.createWriteStream(destPath);
      res.pipe(out);
      out.on("finish", () => resolve(res.headers["content-type"] ?? ""));
      out.on("error", reject);
    });
    req.on("error", reject);
    req.on("timeout", () => { req.destroy(); reject(new Error("Timeout")); });
  });
}

/** Extract candidate logo URLs from HTML */
function extractLogoUrls(html, base) {
  const candidates = [];

  // JSON-LD logo
  const jldMatch = html.match(/"logo"\s*:\s*\{[^}]*"url"\s*:\s*"([^"]+)"/);
  if (jldMatch) candidates.push(jldMatch[1]);
  const jldSimple = html.match(/"logo"\s*:\s*"(https?:[^"]+)"/);
  if (jldSimple) candidates.push(jldSimple[1]);

  // OG image
  const ogMatch = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i);
  if (ogMatch) candidates.push(ogMatch[1]);

  // Apple touch icon (best square logo)
  const appleMatch = html.match(/<link[^>]*rel=["'][^"']*apple-touch-icon[^"']*["'][^>]*href=["']([^"']+)["']/i);
  if (appleMatch) candidates.push(appleMatch[1]);

  // <img> with "logo" in class or alt or id
  const imgMatches = html.matchAll(/<img[^>]*(?:class|alt|id)=["'][^"']*logo[^"']*["'][^>]*src=["']([^"']+)["']/gi);
  for (const m of imgMatches) candidates.push(m[1]);

  // Resolve relative URLs
  return candidates.map((u) => {
    try { return new URL(u, base).toString(); } catch { return null; }
  }).filter(Boolean);
}

async function fetchLogoForBrand(brand) {
  const baseUrl = `https://www.${brand.domain}`;
  console.log(`\n[${brand.slug}] Fetching ${baseUrl}...`);

  let candidates = [];

  try {
    const { body } = await fetchUrl(baseUrl);
    candidates = extractLogoUrls(body, baseUrl);
    console.log(`  Found ${candidates.length} candidate(s)`);
  } catch (err) {
    console.log(`  ✗ Fetch failed: ${err.message}`);
  }

  // Try common direct paths if no candidates
  if (candidates.length === 0) {
    const common = [
      `/logo.png`, `/logo.svg`, `/images/logo.png`, `/images/logo.svg`,
      `/assets/logo.png`, `/assets/logo.svg`, `/img/logo.png`,
      `/apple-touch-icon.png`,
    ];
    for (const p of common) {
      candidates.push(new URL(p, baseUrl).toString());
    }
  }

  // Try each candidate
  for (const candidate of candidates.slice(0, 6)) {
    // Skip og:image — usually a photo not a logo
    if (candidate.includes("og:image")) continue;

    const ext = candidate.match(/\.(svg|png|jpg|jpeg|webp)(\?|$)/i)?.[1] ?? "png";
    const destPath = path.join(OUT_DIR, `${brand.slug}.${ext}`);

    try {
      const contentType = await downloadBinary(candidate, destPath);
      const stat = fs.statSync(destPath);
      if (stat.size < 200) { fs.unlinkSync(destPath); continue; } // too small = probably error HTML

      // Verify it's actually an image
      if (contentType.startsWith("text/")) { fs.unlinkSync(destPath); continue; }

      console.log(`  ✓ Downloaded ${path.basename(destPath)} (${stat.size} bytes) from ${candidate}`);
      return `/brands/${brand.slug}.${ext}`;
    } catch (err) {
      console.log(`  ✗ ${candidate.slice(0, 80)}: ${err.message}`);
      if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
    }
  }

  console.log(`  ✗ No logo found`);
  return null;
}

async function main() {
  const results = [];

  for (const brand of FEATURED_BRANDS) {
    const logoPath = await fetchLogoForBrand(brand);
    results.push({ ...brand, logoPath });
  }

  // Generate SQL migration
  const sqlLines = [
    `-- Migration: feature brands and set logo URLs`,
    `-- Generated by scripts/fetch-brand-logos.mjs`,
    `-- Run in Supabase SQL Editor: https://supabase.com/dashboard/project/_/sql`,
    ``,
  ];

  for (const r of results) {
    const logoSql = r.logoPath ? `'${r.logoPath}'` : "NULL";
    sqlLines.push(
      `UPDATE brands SET logo_url = ${logoSql}, is_featured = true WHERE slug = '${r.slug}';`
    );
  }

  const sqlPath = path.resolve("supabase/migrations/20260616000001_featured_brands.sql");
  fs.writeFileSync(sqlPath, sqlLines.join("\n") + "\n");
  console.log(`\n✓ SQL migration written to ${sqlPath}`);

  // Summary
  const succeeded = results.filter((r) => r.logoPath);
  const failed = results.filter((r) => !r.logoPath);
  console.log(`\nSummary: ${succeeded.length}/${results.length} logos fetched`);
  if (failed.length) console.log("Missing:", failed.map((r) => r.name).join(", "));

  console.log("\nNext step: Run the SQL migration in your Supabase dashboard SQL editor.");
}

main().catch((err) => { console.error(err); process.exit(1); });
