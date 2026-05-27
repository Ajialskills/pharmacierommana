import { createClient } from "@supabase/supabase-js";
import { readdirSync } from "fs";

const SUPABASE_URL = "https://mrfhnzjfqquremzuoxxp.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1yZmhuempmcXF1cmVtenVveHhwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3OTU2ODExNCwiZXhwIjoyMDk1MTQ0MTE0fQ.S9Xzt3XPZ1aCPlfD4zTAYeXdXKWH0zrt5Nz-IfxTwqM";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

function toSlug(str) {
  return str
    .toLowerCase()
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// Only original files — skip WooCommerce thumbnail variants (e.g. -100x100.jpg)
const files = readdirSync("public/Pictures").filter(
  (f) => !/\-\d+x\d+\./.test(f)
);

console.log(`Found ${files.length} original images\n`);

// Build a map: slug → filename
const imageSlugMap = new Map();
for (const file of files) {
  const nameWithoutExt = file.replace(/\.[^.]+$/, "");
  const slug = toSlug(nameWithoutExt);
  imageSlugMap.set(slug, file);
}

// Fetch all products
const { data: products, error } = await supabase
  .from("products")
  .select("id, name, slug");

if (error) { console.error("Failed to fetch products:", error.message); process.exit(1); }

console.log(`Matching ${products.length} products to images…\n`);

let matched = 0, unmatched = 0;

for (const product of products) {
  const file = imageSlugMap.get(product.slug);

  if (!file) {
    unmatched++;
    continue;
  }

  const { error: updateError } = await supabase
    .from("products")
    .update({ images: [`/Pictures/${file}`] })
    .eq("id", product.id);

  if (updateError) {
    console.error(`  ✗ ${product.name}:`, updateError.message);
  } else {
    matched++;
    console.log(`  ✓ ${product.name}`);
  }
}

console.log(`\n✅ Done — ${matched} matched, ${unmatched} unmatched`);
