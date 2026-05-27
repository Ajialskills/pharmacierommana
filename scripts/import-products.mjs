import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { parse } from "csv-parse/sync";

const SUPABASE_URL = "https://mrfhnzjfqquremzuoxxp.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1yZmhuempmcXF1cmVtenVveHhwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3OTU2ODExNCwiZXhwIjoyMDk1MTQ0MTE0fQ.S9Xzt3XPZ1aCPlfD4zTAYeXdXKWH0zrt5Nz-IfxTwqM";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

function slug(str) {
  return str.toLowerCase()
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// Parse CSV
const csv = readFileSync("public/wc-products.csv", "utf-8").replace(/^﻿/, "");
const rows = parse(csv, { columns: true, skip_empty_lines: true, relax_quotes: true });

console.log(`Parsed ${rows.length} rows`);

// ── 1. Collect all unique categories and brands ──────────────────────────────
const categoryMap = new Map(); // "Parent > Child" → id
const brandMap = new Map();    // "BrandName" → id

const allCatStrings = new Set();
const allBrandStrings = new Set();

for (const row of rows) {
  if (row["Catégories"]) {
    row["Catégories"].split(",").map(s => s.trim()).filter(Boolean).forEach(c => allCatStrings.add(c));
  }
  if (row["Marques"]) {
    row["Marques"].split(",").map(s => s.trim()).filter(Boolean).forEach(b => allBrandStrings.add(b));
  }
}

// ── 2. Upsert top-level categories ───────────────────────────────────────────
const topLevelCats = new Set();
const childCats = new Map(); // child name → parent name

for (const cat of allCatStrings) {
  if (cat.includes(" > ")) {
    const [parent, child] = cat.split(" > ").map(s => s.trim());
    topLevelCats.add(parent);
    childCats.set(child, parent);
  } else {
    topLevelCats.add(cat);
  }
}

console.log(`\nUpserting ${topLevelCats.size} top-level categories…`);
for (const name of topLevelCats) {
  const { data, error } = await supabase
    .from("categories")
    .upsert({ name, slug: slug(name), parent_id: null }, { onConflict: "slug" })
    .select("id, slug")
    .single();
  if (error) { console.error(`  ✗ ${name}:`, error.message); continue; }
  categoryMap.set(name, data.id);
  console.log(`  ✓ ${name}`);
}

console.log(`\nUpserting ${childCats.size} sub-categories…`);
for (const [child, parent] of childCats) {
  const parentId = categoryMap.get(parent);
  if (!parentId) { console.warn(`  ⚠ Parent not found for ${child}`); continue; }
  const { data, error } = await supabase
    .from("categories")
    .upsert({ name: child, slug: slug(child), parent_id: parentId }, { onConflict: "slug" })
    .select("id, slug")
    .single();
  if (error) { console.error(`  ✗ ${child}:`, error.message); continue; }
  categoryMap.set(`${parent} > ${child}`, data.id);
  console.log(`  ✓ ${parent} > ${child}`);
}

// ── 3. Upsert brands ─────────────────────────────────────────────────────────
console.log(`\nUpserting ${allBrandStrings.size} brands…`);
for (const name of allBrandStrings) {
  const { data, error } = await supabase
    .from("brands")
    .upsert({ name, slug: slug(name) }, { onConflict: "slug" })
    .select("id")
    .single();
  if (error) { console.error(`  ✗ ${name}:`, error.message); continue; }
  brandMap.set(name, data.id);
  console.log(`  ✓ ${name}`);
}

// ── 4. Import products ───────────────────────────────────────────────────────
console.log(`\nImporting products…`);
let ok = 0, fail = 0;

for (const row of rows) {
  const name = row["Nom"]?.trim();
  if (!name) continue;

  const price = parseFloat(row["Tarif régulier"] || "0");
  const salePrice = parseFloat(row["Tarif promo"] || "0");
  const stock = parseInt(row["Stock"] || "0") || (row["En stock ?"] === "1" ? 1 : 0);
  const isPublished = row["Publié"] === "1";

  // Category: take first listed
  let categoryId = null;
  const catStrings = (row["Catégories"] || "").split(",").map(s => s.trim()).filter(Boolean);
  for (const cs of catStrings) {
    const id = categoryMap.get(cs) ?? categoryMap.get(cs.split(" > ").pop());
    if (id) { categoryId = id; break; }
  }

  // Brand: take first listed
  let brandId = null;
  const brandStr = (row["Marques"] || "").split(",").map(s => s.trim()).filter(Boolean)[0];
  if (brandStr) brandId = brandMap.get(brandStr) ?? null;

  // Images
  const images = (row["Images"] || "").split(",").map(s => s.trim()).filter(Boolean);

  const product = {
    name,
    slug: slug(name),
    price,
    sale_price: salePrice > 0 && salePrice < price ? salePrice : null,
    stock,
    is_published: isPublished,
    category_id: categoryId,
    brand_id: brandId,
    images,
    description: row["Description courte"]?.trim() || row["Description"]?.trim() || null,
  };

  const { error } = await supabase
    .from("products")
    .upsert(product, { onConflict: "slug" });

  if (error) {
    console.error(`  ✗ ${name}:`, error.message);
    fail++;
  } else {
    ok++;
    if (ok % 50 === 0) console.log(`  … ${ok} done`);
  }
}

console.log(`\n✅ Done — ${ok} imported, ${fail} failed`);
