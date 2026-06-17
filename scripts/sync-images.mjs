/**
 * sync-images.mjs
 * Reads wc-products.csv, constructs Cloudinary URLs from already-uploaded images,
 * and upserts all products + brands + categories into Supabase.
 *
 * Usage: node scripts/sync-images.mjs
 */

import { createClient } from "@supabase/supabase-js";
import { parse } from "csv-parse/sync";
import fs from "fs";
import path from "path";
import https from "https";

// ── Load env ──────────────────────────────────────────────────────────────────
const env = Object.fromEntries(
  fs.readFileSync(".env.local", "utf-8")
    .split("\n")
    .filter((l) => l.includes("=") && !l.startsWith("#"))
    .map((l) => {
      const idx = l.indexOf("=");
      return [l.slice(0, idx).trim(), l.slice(idx + 1).trim()];
    })
);

const CLOUD_NAME = env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const SUPABASE_URL = env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = env.SUPABASE_SERVICE_ROLE_KEY;
const FOLDER = "pharmacierommana/products";

if (!CLOUD_NAME) throw new Error("NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME not set");
if (!SERVICE_KEY) throw new Error("SUPABASE_SERVICE_ROLE_KEY not set");

const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

const CSV_PATH = path.resolve("public/wc-products.csv");

function slugify(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function filenameFromUrl(url) {
  return url.split("/").pop();
}

function cloudinaryUrl(filename) {
  const name = path.parse(filename).name;
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_auto/${FOLDER}/${name}`;
}

// Quick HTTP HEAD check — returns true if Cloudinary has this asset
function assetExists(url) {
  return new Promise((resolve) => {
    const req = https.request(url, { method: "HEAD", timeout: 5000 }, (res) => {
      resolve(res.statusCode === 200);
    });
    req.on("error", () => resolve(false));
    req.on("timeout", () => { req.destroy(); resolve(false); });
    req.end();
  });
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  console.log("📦 Reading CSV…");
  const raw = fs.readFileSync(CSV_PATH, "utf-8").replace(/^﻿/, "");
  const rows = parse(raw, { columns: true, skip_empty_lines: true });
  console.log(`   ${rows.length} products found`);

  // ── 1. Brands ────────────────────────────────────────────────────────────────
  const brandNames = [...new Set(rows.map((r) => r["Marques"]).filter(Boolean))];
  console.log(`\n🏷  Upserting ${brandNames.length} brands…`);

  const brandMap = {};
  for (const name of brandNames) {
    const slug = slugify(name);
    const { data, error } = await supabase
      .from("brands")
      .upsert({ slug, name }, { onConflict: "slug", ignoreDuplicates: false })
      .select("id")
      .single();
    if (error) { process.stderr.write(`\n  ✗ Brand "${name}": ${error.message}`); continue; }
    brandMap[name] = data.id;
    process.stdout.write(".");
  }
  console.log(" done");

  // ── 2. Categories ─────────────────────────────────────────────────────────────
  const categoryEntries = new Map();
  for (const row of rows) {
    for (const raw of (row["Catégories"] || "").split(",").map((s) => s.trim()).filter(Boolean)) {
      const parts = raw.split(">").map((s) => s.trim());
      const parent = parts[0];
      const child = parts[1];
      if (parent) categoryEntries.set(slugify(parent), { slug: slugify(parent), name: parent, parent_slug: null });
      if (child) categoryEntries.set(slugify(child), { slug: slugify(child), name: child, parent_slug: slugify(parent) });
    }
  }

  console.log(`\n📂 Upserting ${categoryEntries.size} categories…`);
  const categoryMap = {};

  for (const cat of categoryEntries.values()) {
    if (cat.parent_slug !== null) continue;
    const { data, error } = await supabase
      .from("categories")
      .upsert({ slug: cat.slug, name: cat.name }, { onConflict: "slug", ignoreDuplicates: false })
      .select("id").single();
    if (error) { process.stderr.write(`\n  ✗ Cat "${cat.name}": ${error.message}`); continue; }
    categoryMap[cat.slug] = data.id;
    process.stdout.write(".");
  }
  for (const cat of categoryEntries.values()) {
    if (cat.parent_slug === null) continue;
    const parentId = categoryMap[cat.parent_slug] ?? null;
    const { data, error } = await supabase
      .from("categories")
      .upsert({ slug: cat.slug, name: cat.name, parent_id: parentId }, { onConflict: "slug", ignoreDuplicates: false })
      .select("id").single();
    if (error) { process.stderr.write(`\n  ✗ Sub-cat "${cat.name}": ${error.message}`); continue; }
    categoryMap[cat.slug] = data.id;
    process.stdout.write(".");
  }
  console.log(" done");

  // ── 3. Products ───────────────────────────────────────────────────────────────
  console.log(`\n🖼  Syncing ${rows.length} products with Cloudinary URLs…`);
  let ok = 0, noImg = 0, fail = 0;

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const name = row["Nom"]?.trim();
    if (!name) continue;

    const slug = slugify(name);
    const price = parseFloat(row["Tarif régulier"]) || 0;
    const sale_price = row["Tarif promo"] ? parseFloat(row["Tarif promo"]) : null;
    const brandName = row["Marques"]?.trim();
    const brand_id = brandName ? (brandMap[brandName] ?? null) : null;

    const firstCat = (row["Catégories"] || "").split(",")[0].trim();
    const catParts = firstCat.split(">").map((s) => s.trim());
    const catSlug = slugify(catParts[catParts.length - 1]);
    const category_id = categoryMap[catSlug] ?? null;

    let imageUrl = null;
    if (row["Images"]) {
      const filename = filenameFromUrl(row["Images"]);
      const url = cloudinaryUrl(filename);
      // Fast HEAD check — skip the 130ms sleep, just verify existence
      const exists = await assetExists(url);
      if (exists) {
        imageUrl = url;
      } else {
        noImg++;
      }
    } else {
      noImg++;
    }

    const { error } = await supabase.from("products").upsert(
      {
        slug,
        name,
        brand_id,
        category_id,
        price,
        sale_price,
        images: imageUrl ? [imageUrl] : [],
        is_published: row["Publié"] === "1",
        stock: row["En stock\xa0?"] === "1" ? 99 : 0,
        description: row["Description courte"]?.trim() || null,
      },
      { onConflict: "slug" }
    );

    if (error) {
      process.stderr.write(`\n  ✗ [${i + 1}] "${name}": ${error.message}`);
      fail++;
    } else {
      ok++;
      if (ok % 50 === 0) process.stdout.write(`\n  ✓ ${ok}/${rows.length}…`);
      else process.stdout.write(".");
    }

    // Small delay to avoid Supabase rate limits
    await sleep(30);
  }

  console.log(`\n\n✅ Done: ${ok} upserted, ${noImg} without image, ${fail} failed`);
  if (noImg > 0) console.log(`   (${noImg} products had no matching Cloudinary asset — check CSV Images column)`);
}

main().catch((err) => { console.error(err); process.exit(1); });
