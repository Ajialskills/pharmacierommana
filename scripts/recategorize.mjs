import { createClient } from "@supabase/supabase-js";

const sb = createClient(
  "https://mrfhnzjfqquremzuoxxp.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1yZmhuempmcXF1cmVtenVveHhwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3OTU2ODExNCwiZXhwIjoyMDk1MTQ0MTE0fQ.S9Xzt3XPZ1aCPlfD4zTAYeXdXKWH0zrt5Nz-IfxTwqM"
);

// ── 1. Load all current categories ───────────────────────────────────────────
const { data: allCats } = await sb.from("categories").select("id, name, parent_id");
const catById  = new Map(allCats.map(c => [c.id, c]));
const catBySlug = new Map();

for (const c of allCats) {
  const parent = c.parent_id ? catById.get(c.parent_id) : null;
  const key = parent ? `${parent.name} > ${c.name}` : c.name;
  catBySlug.set(key, c.id);
}

// Helper — look up by display-name path, fall back to parent
function resolve(...keys) {
  for (const k of keys) {
    if (catBySlug.has(k)) return catBySlug.get(k);
  }
  return null;
}

// ── 2. Mapping: WooCommerce category label → CLAUDE.md category ──────────────
// Keys are the "Parent > Child" labels from the imported WooCommerce data.
const OLD_TO_NEW = {
  // ── Visage ────────────────────────────────────────────────────────────────
  "Visage":                             resolve("Visage"),
  "Visage > Soin Visage":               resolve("Visage > Soin visage"),
  "Visage > Hydratation Visage":        resolve("Visage > Soin visage"),
  "Visage > Masques & Exfoliants":      resolve("Visage > Soin visage"),
  "Visage > Yeux & Levres":             resolve("Visage > Soin visage"),
  "Visage > Nettoyants & Démaquillants":resolve("Visage > Soin visage"),
  "Visage > Nettoyants & Démaquillant": resolve("Visage > Soin visage"),
  "Visage > Mousses & Gels Nettoyants": resolve("Visage > Soin visage"),

  // ── Corps ─────────────────────────────────────────────────────────────────
  "Corps":                              resolve("Corps"),
  "Corps > Soin Corps":                 resolve("Corps > Soins de corps"),
  "Corps > Hydratation Corps":          resolve("Corps > Soins de corps"),
  "Corps > Nettoyant Corps":            resolve("Corps > Hygiène de corps"),
  "Corps > Hygiène":                    resolve("Corps > Hygiène de corps"),
  "Corps > Hygiène & Soins Intimes":    resolve("Hygiène > Hygiène intime"),

  // ── Solaire ───────────────────────────────────────────────────────────────
  "Solaire":                            resolve("Solaire"),
  "Solaire > Protection Solaire VIsage":resolve("Solaire > Indication"),
  "Solaire > Protection Solaire Corps": resolve("Solaire > Indication"),
  "Solaire > Protection Solaire Teintée":resolve("Solaire > Caractéristique"),

  // ── Capillaire → Cheveux ──────────────────────────────────────────────────
  "Capillaire":                              resolve("Cheveux"),
  "Capillaire > Shampooings Anti-Chute":     resolve("Cheveux > Shampoing"),
  "Capillaire > Shampooings Antipelliculaire":resolve("Cheveux > Shampoing"),
  "Capillaire > Shampooings Cheveux Gras":   resolve("Cheveux > Shampoing"),
  "Capillaire > Shampooings Cheveux Normaux":resolve("Cheveux > Shampoing"),
  "Capillaire > Shampooings Cheveux Secs":   resolve("Cheveux > Shampoing"),
  "Capillaire > Soins & Traitements":        resolve("Cheveux"),
  "Capillaire > Soins Sans Rinçage":         resolve("Cheveux"),
  "Capillaire > Après-Shampoing":            resolve("Cheveux"),

  // ── Santé & Bien être ─────────────────────────────────────────────────────
  "Santé & Bien être":                       resolve("Santé"),
  "Santé & Bien être > Premiers secours":    resolve("Santé > Soins et confort"),
  "Santé & Bien être > Santé au quotidien":  resolve("Santé > Soins et confort"),
  "Santé & Bien être > Huiles Végétales":    resolve("Santé"),
  "Santé & Bien être > Huiles Essentielles": resolve("Santé"),
  "Santé & Bien être > Anti-poux":           resolve("Cheveux > Soin anti-poux"),
  "Santé & Bien être > Hygiène ( Nez":       resolve("Santé > Yeux-nez-oreille"),
  "Santé & Bien être > Grossesse - Maman":   resolve("Maternité > Maman"),

  // ── Compléments Alimentaires → Santé ─────────────────────────────────────
  "Compléments Alimentaires":                           resolve("Santé"),
  "Compléments Alimentaires > Energie & Vitalité":      resolve("Santé"),
  "Compléments Alimentaires > Mémoire & Concentration": resolve("Santé"),
  "Compléments Alimentaires > Beauté de peau":          resolve("Santé"),
  "Compléments Alimentaires > Immunité & Défenses Naturelles": resolve("Santé"),
  "Compléments Alimentaires > Detox & Transit":         resolve("Santé"),
  "Compléments Alimentaires > Stress & Sommeil":        resolve("Santé"),
  "Compléments Alimentaires > Cheveux & Ongles":        resolve("Santé"),
  "Compléments Alimentaires > Articulations":           resolve("Santé"),
  "Compléments Alimentaires > Cardiovasculaire":        resolve("Santé"),
  "Compléments Alimentaires > Stimulant Appétit":       resolve("Santé"),
  "Compléments Alimentaires > Santé Femme":             resolve("Santé"),
  "Compléments Alimentaires > Confort Urinaire":        resolve("Santé"),
  "Compléments Alimentaires > Spécifiques Enfants":     resolve("Santé"),
  "Compléments Alimentaires > Minceur":                 resolve("Santé"),

  // ── Homme ─────────────────────────────────────────────────────────────────
  "Homme":                       resolve("Homme"),
  "Homme > Rasage & Barbe":      resolve("Homme"),
  "Homme > Soins visage Homme":  resolve("Homme"),
};

console.log("Category map built. Null targets:");
for (const [k, v] of Object.entries(OLD_TO_NEW)) {
  if (!v) console.log("  ⚠ No target for:", k);
}

// ── 3. Fetch all products with their current category label ──────────────────
const { data: products } = await sb
  .from("products")
  .select("id, name, category_id");

console.log(`\nRe-categorizing ${products.length} products…\n`);

// Build label for each old category id
function oldLabel(catId) {
  const cat = catById.get(catId);
  if (!cat) return null;
  const parent = cat.parent_id ? catById.get(cat.parent_id) : null;
  return parent ? `${parent.name} > ${cat.name}` : cat.name;
}

let ok = 0, skipped = 0, fail = 0;

for (const product of products) {
  const label = oldLabel(product.category_id);
  const newCatId = label ? OLD_TO_NEW[label] : null;

  if (!newCatId) {
    console.warn(`  ⚠ No mapping for "${label}" — product: ${product.name}`);
    skipped++;
    continue;
  }

  const { error } = await sb
    .from("products")
    .update({ category_id: newCatId })
    .eq("id", product.id);

  if (error) { console.error(`  ✗ ${product.name}:`, error.message); fail++; }
  else ok++;
}

console.log(`\nMigrated: ${ok} | Skipped (no mapping): ${skipped} | Failed: ${fail}`);

// ── 4. Delete old WooCommerce categories (those with no products left) ────────
const OLD_CAT_NAMES = [
  "Santé & Bien être", "Compléments Alimentaires", "Capillaire",
  "Visage > Soin Visage", "Visage > Nettoyants & Démaquillants",
  "Visage > Nettoyants & Démaquillant", "Visage > Masques & Exfoliants",
  "Visage > Hydratation Visage", "Visage > Yeux & Levres",
  "Visage > Mousses & Gels Nettoyants",
  "Corps > Soin Corps", "Corps > Hydratation Corps",
  "Corps > Nettoyant Corps", "Corps > Hygiène & Soins Intimes", "Corps > Hygiène",
  "Solaire > Protection Solaire VIsage", "Solaire > Protection Solaire Corps",
  "Solaire > Protection Solaire Teintée",
  "Capillaire > Shampooings Anti-Chute", "Capillaire > Shampooings Antipelliculaire",
  "Capillaire > Shampooings Cheveux Gras", "Capillaire > Shampooings Cheveux Normaux",
  "Capillaire > Shampooings Cheveux Secs", "Capillaire > Soins & Traitements",
  "Capillaire > Soins Sans Rinçage", "Capillaire > Après-Shampoing",
  "Santé & Bien être > Premiers secours", "Santé & Bien être > Santé au quotidien",
  "Santé & Bien être > Huiles Végétales", "Santé & Bien être > Huiles Essentielles",
  "Santé & Bien être > Anti-poux", "Santé & Bien être > Hygiène ( Nez",
  "Santé & Bien être > Grossesse - Maman",
  "Compléments Alimentaires > Energie & Vitalité",
  "Compléments Alimentaires > Mémoire & Concentration",
  "Compléments Alimentaires > Beauté de peau",
  "Compléments Alimentaires > Immunité & Défenses Naturelles",
  "Compléments Alimentaires > Detox & Transit",
  "Compléments Alimentaires > Stress & Sommeil",
  "Compléments Alimentaires > Cheveux & Ongles",
  "Compléments Alimentaires > Articulations",
  "Compléments Alimentaires > Cardiovasculaire",
  "Compléments Alimentaires > Stimulant Appétit",
  "Compléments Alimentaires > Santé Femme",
  "Compléments Alimentaires > Confort Urinaire",
  "Compléments Alimentaires > Spécifiques Enfants",
  "Compléments Alimentaires > Minceur",
  "Homme > Rasage & Barbe", "Homme > Soins visage Homme",
];

console.log("\nDeleting old WooCommerce categories…");

// Delete children first, then parents
const oldChildIds = OLD_CAT_NAMES.filter(l => l.includes(" > ")).map(l => catBySlug.get(l)).filter(Boolean);
const oldParentIds = OLD_CAT_NAMES.filter(l => !l.includes(" > ")).map(l => catBySlug.get(l)).filter(Boolean);

if (oldChildIds.length) {
  const { error } = await sb.from("categories").delete().in("id", oldChildIds);
  if (error) console.error("Child delete error:", error.message);
  else console.log(`  Deleted ${oldChildIds.length} old sub-categories`);
}

if (oldParentIds.length) {
  const { error } = await sb.from("categories").delete().in("id", oldParentIds);
  if (error) console.error("Parent delete error:", error.message);
  else console.log(`  Deleted ${oldParentIds.length} old top-level categories`);
}

console.log("\n✅ Done");
