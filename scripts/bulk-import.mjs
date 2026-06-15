/**
 * Bulk import script — reads wc-products.csv, uploads images to Cloudinary,
 * creates brands/categories in Supabase, and inserts all 896 products.
 *
 * Usage: node scripts/bulk-import.mjs
 */

import { createClient } from "@supabase/supabase-js";
import { v2 as cloudinary } from "cloudinary";
import { parse } from "csv-parse/sync";
import fs from "fs";
import path from "path";

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

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

cloudinary.config({
  cloud_name: env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

const PICTURES_DIR = path.resolve("public/pictures");
const CSV_PATH = path.resolve("public/wc-products.csv");
const FOLDER = "pharmacierommana/products";

// ── Helpers ───────────────────────────────────────────────────────────────────
function slugify(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function filenameFromUrl(url) {
  return url.split("/").pop();
}

// ── Upload image to Cloudinary ─────────────────────────────────────────────────
async function uploadImage(filename) {
  const localPath = path.join(PICTURES_DIR, filename);
  if (!fs.existsSync(localPath)) return null;

  const publicId = `${FOLDER}/${path.parse(filename).name}`;

  try {
    const result = await cloudinary.uploader.upload(localPath, {
      public_id: publicId,
      overwrite: false,
      resource_type: "image",
    });
    return result.secure_url;
  } catch (err) {
    if (err?.error?.http_code === 423) {
      // Already exists — return the URL
      return `https://res.cloudinary.com/${env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${publicId}`;
    }
    console.error(`  ✗ Upload failed for ${filename}:`, err?.error?.message ?? err.message);
    return null;
  }
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log("📦 Reading CSV…");
  const raw = fs.readFileSync(CSV_PATH, "utf-8").replace(/^﻿/, "");
  const rows = parse(raw, { columns: true, skip_empty_lines: true });
  console.log(`   ${rows.length} products found`);

  // ── 1. Collect unique brands ──────────────────────────────────────────────
  const brandNames = [...new Set(rows.map((r) => r["Marques"]).filter(Boolean))];
  console.log(`\n🏷  Upserting ${brandNames.length} brands…`);

  const brandMap = {}; // name → id
  for (const name of brandNames) {
    const slug = slugify(name);
    const { data, error } = await supabase
      .from("brands")
      .upsert({ slug, name, is_featured: false }, { onConflict: "slug" })
      .select("id, name")
      .single();
    if (error) { console.error(`  ✗ Brand "${name}":`, error.message); continue; }
    brandMap[name] = data.id;
    process.stdout.write(".");
  }
  console.log(" done");

  // ── 2. Collect unique categories (flat + hierarchy) ───────────────────────
  const categoryEntries = new Map(); // slug → { slug, name, parent_slug }
  for (const row of rows) {
    for (const raw of row["Catégories"].split(",").map((s) => s.trim())) {
      const parts = raw.split(">").map((s) => s.trim());
      const parent = parts[0];
      const child = parts[1];
      categoryEntries.set(slugify(parent), { slug: slugify(parent), name: parent, parent_slug: null });
      if (child) {
        categoryEntries.set(slugify(child), { slug: slugify(child), name: child, parent_slug: slugify(parent) });
      }
    }
  }

  console.log(`\n📂 Upserting ${categoryEntries.size} categories…`);
  const categoryMap = {}; // slug → id

  // Insert parents first
  for (const cat of categoryEntries.values()) {
    if (cat.parent_slug !== null) continue;
    const { data, error } = await supabase
      .from("categories")
      .upsert({ slug: cat.slug, name: cat.name }, { onConflict: "slug" })
      .select("id")
      .single();
    if (error) { console.error(`  ✗ Category "${cat.name}":`, error.message); continue; }
    categoryMap[cat.slug] = data.id;
    process.stdout.write(".");
  }

  // Insert children
  for (const cat of categoryEntries.values()) {
    if (cat.parent_slug === null) continue;
    const parentId = categoryMap[cat.parent_slug] ?? null;
    const { data, error } = await supabase
      .from("categories")
      .upsert({ slug: cat.slug, name: cat.name, parent_id: parentId }, { onConflict: "slug" })
      .select("id")
      .single();
    if (error) { console.error(`  ✗ Sub-category "${cat.name}":`, error.message); continue; }
    categoryMap[cat.slug] = data.id;
    process.stdout.write(".");
  }
  console.log(" done");

  // ── 3. Upload images + insert products ────────────────────────────────────
  console.log(`\n🖼  Uploading images and importing products…`);
  let ok = 0, skip = 0, fail = 0;

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const name = row["Nom"].trim();
    const slug = slugify(name);
    const price = parseFloat(row["Tarif régulier"]) || 0;
    const sale_price = row["Tarif promo"] ? parseFloat(row["Tarif promo"]) : null;
    const brandName = row["Marques"]?.trim();
    const brand_id = brandName ? (brandMap[brandName] ?? null) : null;

    // Pick first category
    const firstCat = row["Catégories"].split(",")[0].trim();
    const parts = firstCat.split(">").map((s) => s.trim());
    const catSlug = slugify(parts[parts.length - 1]);
    const category_id = categoryMap[catSlug] ?? null;

    // Upload image
    let imageUrl = null;
    if (row["Images"]) {
      const filename = filenameFromUrl(row["Images"]);
      imageUrl = await uploadImage(filename);
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
        stock: row["En stock ?"] === "1" ? 99 : 0,
      },
      { onConflict: "slug" }
    );

    if (error) {
      console.error(`\n  ✗ [${i + 1}] "${name}": ${error.message}`);
      fail++;
    } else {
      ok++;
      if (ok % 50 === 0) console.log(`  ✓ ${ok}/${rows.length} done…`);
    }

    // Avoid Cloudinary rate limit (max ~500/min on free plan)
    await sleep(130);
  }

  console.log(`\n✅ Import complete: ${ok} ok, ${skip} skipped, ${fail} failed`);
}

main().catch((err) => { console.error(err); process.exit(1); });
