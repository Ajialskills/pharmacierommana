import type { Metadata } from "next";
import { createClient as createServerClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Boutique parapharmacie en ligne",
  description:
    "Parcourez notre catalogue de produits parapharmaceutiques : soins visage, corps, bébé, hygiène, santé et bien-être. Livraison rapide depuis Tétouan.",
  openGraph: {
    title: "Boutique — Pharmacie Rommana",
    description: "Produits de parapharmacie sélectionnés avec soin. Livraison gratuite dès 400 DH sur Tétouan.",
  },
};
import { getCategories } from "@/app/actions/categories";
import { getBrands } from "@/app/actions/brands";
import ProductCard from "@/components/product/ProductCard";
import BoutiqueFilters from "@/components/boutique/BoutiqueFilters";
import type { Product } from "@/types";
import PageHero from "@/components/layout/PageHero";
import BoutiqueSearch from "@/components/boutique/BoutiqueSearch";

interface PageProps {
  searchParams: Promise<{
    categorie?: string;
    marque?: string;
    min?: string;
    max?: string;
    promo?: string;
    q?: string;
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
  if (params.q) query = query.ilike("name", `%${params.q}%`);

  const { data, count } = await query;
  const products = (data as Product[]) ?? [];
  const totalPages = Math.ceil((count ?? 0) / PAGE_SIZE);

  return (
    <>
      <PageHero
        title="Notre boutique"
        subtitle={`${count ?? 0} produits disponibles`}
        crumbs={[{ label: "Boutique" }]}
      />
      <div style={{ maxWidth: "var(--spacing-max-width)" }} className="mx-auto px-[var(--spacing-lg)] py-10">

      <div className="flex gap-8">
        {/* Sidebar */}
        <aside className="hidden lg:block w-60 flex-shrink-0">
          <BoutiqueFilters categories={categories} brands={brands} />
        </aside>

        {/* Grid */}
        <div className="flex-1 min-w-0">
          <BoutiqueSearch />
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
                <div className="flex justify-center items-center gap-1 mt-10">
                  {(() => {
                    const qs = (p: number) => {
                      const next = new URLSearchParams();
                      if (params.categorie) next.set("categorie", params.categorie);
                      if (params.marque) next.set("marque", params.marque);
                      if (params.min) next.set("min", params.min);
                      if (params.max) next.set("max", params.max);
                      if (params.promo) next.set("promo", params.promo);
                      if (params.q) next.set("q", params.q);
                      next.set("page", String(p));
                      return `?${next.toString()}`;
                    };

                    const pageLinkCls = (p: number) =>
                      `min-w-[32px] h-8 px-2 flex items-center justify-center text-sm transition-colors ${
                        p === page
                          ? "font-bold text-[var(--color-primary)] border-b-2 border-[var(--color-primary)]"
                          : "text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)]"
                      }`;

                    const pages: (number | "…")[] = [];
                    const WING = 2;

                    // Always include page 1
                    pages.push(1);

                    const rangeStart = Math.max(2, page - WING);
                    const rangeEnd = Math.min(totalPages - 1, page + WING);

                    if (rangeStart > 2) pages.push("…");
                    for (let i = rangeStart; i <= rangeEnd; i++) pages.push(i);
                    if (rangeEnd < totalPages - 1) pages.push("…");

                    // Always include last page
                    if (totalPages > 1) pages.push(totalPages);

                    return pages.map((p, i) =>
                      p === "…" ? (
                        <span key={`ellipsis-${i}`} className="min-w-[32px] h-8 flex items-center justify-center text-sm text-[var(--color-on-surface-variant)]">…</span>
                      ) : (
                        <a key={p} href={qs(p)} className={pageLinkCls(p)}>{p}</a>
                      )
                    );
                  })()}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
    </>
  );
}
