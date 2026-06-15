/**
 * Upload product images to Cloudinary and update Supabase product records.
 * Reads existing products that have local /Pictures/... paths,
 * uploads to Cloudinary, and patches the images array.
 *
 * Usage: node scripts/upload-images.mjs
 */

import { createClient } from "@supabase/supabase-js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";

// ── Load env ──────────────────────────────────────────────────────────────────
const env = Object.fromEntries(
  fs.readFileSync(".env.local", "utf-8")
    .split("\n")
    .filter((l) => l.includes("=") && !l.startsWith("#"))
    .map((l) => { const i = l.indexOf("="); return [l.slice(0, i).trim(), l.slice(i + 1).trim()]; })
);

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
cloudinary.config({
  cloud_name: env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

const PICTURES_DIR = path.resolve("public/pictures");
const FOLDER = "pharmacierommana/products";

function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

async function uploadImage(filename) {
  const localPath = path.join(PICTURES_DIR, filename);
  if (!fs.existsSync(localPath)) {
    // Try case-insensitive match
    const files = fs.readdirSync(PICTURES_DIR);
    const match = files.find((f) => f.toLowerCase() === filename.toLowerCase());
    if (!match) return null;
    return uploadImage(match);
  }

  const publicId = `${FOLDER}/${path.parse(filename).name}`;
  try {
    const result = await cloudinary.uploader.upload(localPath, {
      public_id: publicId,
      overwrite: false,
      resource_type: "image",
    });
    return result.secure_url;
  } catch (err) {
    // Already uploaded — build the URL
    if (err?.error?.http_code === 423 || err?.http_code === 423) {
      const ext = path.extname(filename).slice(1);
      return `https://res.cloudinary.com/${env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${publicId}.${ext}`;
    }
    console.error(`  ✗ ${filename}:`, err?.error?.message ?? err.message);
    return null;
  }
}

async function main() {
  // Fetch all products with local image paths
  const { data: products, error } = await supabase
    .from("products")
    .select("id, name, images")
    .order("name");

  if (error) throw error;

  const toUpdate = products.filter((p) =>
    p.images?.some((img) => img.startsWith("/Pictures/") || img.startsWith("/pictures/"))
  );

  console.log(`📦 ${products.length} products total, ${toUpdate.length} need image upload\n`);

  let ok = 0, notFound = 0, fail = 0;

  for (let i = 0; i < toUpdate.length; i++) {
    const product = toUpdate[i];
    const newImages = [];

    for (const imgPath of product.images) {
      const filename = imgPath.split("/").pop();
      const url = await uploadImage(filename);
      if (url) {
        newImages.push(url);
      } else {
        notFound++;
        console.log(`  ⚠ Not found: ${filename} (${product.name})`);
      }
    }

    if (newImages.length > 0) {
      const { error: updateError } = await supabase
        .from("products")
        .update({ images: newImages })
        .eq("id", product.id);

      if (updateError) {
        console.error(`  ✗ Update failed for "${product.name}":`, updateError.message);
        fail++;
      } else {
        ok++;
        if (ok % 25 === 0 || ok === 1) {
          console.log(`  ✓ [${i + 1}/${toUpdate.length}] ${product.name}`);
        }
      }
    }

    // Respect Cloudinary free plan rate limit (~500 uploads/min)
    await sleep(150);
  }

  console.log(`\n✅ Done: ${ok} updated, ${notFound} images not found locally, ${fail} errors`);
}

main().catch((err) => { console.error(err); process.exit(1); });
