import { createClient as createServerClient } from "@/lib/supabase/server";
import { getCategories } from "@/app/actions/categories";
import { getBrands } from "@/app/actions/brands";
import ProductCard from "@/components/product/ProductCard";
import BoutiqueFilters from "@/components/boutique/BoutiqueFilters";
import type { Product } from "@/types";

interface PageProps {
  searchParams: Promise<{
    categorie?: string;
    marque?: string;
    min?: string;
    max?: string;
    promo?: string;
    page?: string;
  }>;
}

const PAGE_SIZE = 20;

export default async function BoutiquePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = parseInt(params.page ?? "1");
  const offset = (page - 1) * PAGE_SIZE;

  const [supabase, categories, brands] = await Promise.all([
    createServerClient(),
    getCategories(),
    getBrands(),
  ]);

  let query = supabase
    .from("products")
    .select("*", { count: "exact" })
    .eq("is_published", true)
    .order("created_at", { ascending: false })
    .range(offset, offset + PAGE_SIZE - 1);

  if (params.categorie) query = query.eq("category_id", params.categorie);
  if (params.marque) query = query.eq("brand_id", params.marque);
  if (params.min) query = query.gte("price", parseFloat(params.min));
  if (params.max) query = query.lte("price", parseFloat(params.max));
  if (params.promo === "1") query = query.not("sale_price", "is", null);

  const { data, count } = await query;
  const products = (data as Product[]) ?? [];
  const totalPages = Math.ceil((count ?? 0) / PAGE_SIZE);

  return (
    <div style={{ maxWidth: "var(--spacing-max-width)" }} className="mx-auto px-[var(--spacing-lg)] py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--color-on-surface)]">Notre boutique</h1>
        <p className="text-sm text-[var(--color-on-surface-variant)] mt-1">{count ?? 0} produits disponibles</p>
      </div>

      <div className="flex gap-8">
        {/* Sidebar */}
        <aside className="hidden lg:block w-60 flex-shrink-0">
          <BoutiqueFilters categories={categories} brands={brands} />
        </aside>

        {/* Grid */}
        <div className="flex-1 min-w-0">
          {products.length === 0 ? (
            <div className="text-center py-24 text-[var(--color-on-surface-variant)]">
              <p className="text-lg font-semibold">Aucun produit trouvé</p>
              <p className="text-sm mt-2">Essayez de modifier vos filtres.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {products.map((p) => <ProductCard key={p.id} product={p} />)}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-10">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <a
                      key={p}
                      href={`?page=${p}${params.categorie ? `&categorie=${params.categorie}` : ""}${params.marque ? `&marque=${params.marque}` : ""}`}
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold border transition-colors ${
                        p === page
                          ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)]"
                          : "border-[var(--color-border-subtle)] text-[var(--color-on-surface-variant)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                      }`}
                    >
                      {p}
                    </a>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
