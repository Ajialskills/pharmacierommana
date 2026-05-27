import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createClient as createServerClient } from "@/lib/supabase/server";
import { getCategories } from "@/app/actions/categories";
import { getBrands } from "@/app/actions/brands";
import ProductCard from "@/components/product/ProductCard";
import BoutiqueFilters from "@/components/boutique/BoutiqueFilters";
import type { Product, Category } from "@/types";

interface PageProps {
  params: Promise<{ categorie: string }>;
  searchParams: Promise<{ page?: string; marque?: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { categorie: slug } = await params;
  const categories = await getCategories();
  const category = categories.find((c: Category) => c.slug === slug);
  if (!category) return { title: "Catégorie introuvable" };
  return {
    title: `${category.name} — Parapharmacie en ligne`,
    description: `Découvrez notre sélection de produits ${category.name} chez Pharmacie Rommana à Tétouan. Livraison rapide partout au Maroc.`,
    openGraph: {
      title: `${category.name} — Pharmacie Rommana`,
      description: `Produits ${category.name} de qualité. Livraison gratuite dès 400 DH sur Tétouan.`,
    },
  };
}

const PAGE_SIZE = 20;

export default async function CategorieProductsPage({ params, searchParams }: PageProps) {
  const { categorie: slug } = await params;
  const sp = await searchParams;
  const page = parseInt(sp.page ?? "1");
  const offset = (page - 1) * PAGE_SIZE;

  const [supabase, categories, brands] = await Promise.all([
    createServerClient(),
    getCategories(),
    getBrands(),
  ]);

  const category = categories.find((c: Category) => c.slug === slug);
  if (!category) notFound();

  const childIds = categories.filter((c: Category) => c.parent_id === category.id).map((c: Category) => c.id);
  const allIds = [category.id, ...childIds];

  let query = supabase
    .from("products")
    .select("*", { count: "exact" })
    .eq("is_published", true)
    .in("category_id", allIds)
    .order("created_at", { ascending: false })
    .range(offset, offset + PAGE_SIZE - 1);

  if (sp.marque) query = query.eq("brand_id", sp.marque);

  const { data, count } = await query;
  const products = (data as Product[]) ?? [];
  const totalPages = Math.ceil((count ?? 0) / PAGE_SIZE);

  return (
    <div style={{ maxWidth: "var(--spacing-max-width)" }} className="mx-auto px-[var(--spacing-lg)] py-10">
      <div className="mb-8">
        <p className="text-xs text-[var(--color-on-surface-variant)] mb-1">
          <a href="/boutique" className="hover:text-[var(--color-primary)]">Boutique</a>
          {" / "}
          <span className="text-[var(--color-on-surface)]">{category.name}</span>
        </p>
        <h1 className="text-2xl font-bold text-[var(--color-on-surface)]">{category.name}</h1>
        <p className="text-sm text-[var(--color-on-surface-variant)] mt-1">{count ?? 0} produits</p>
      </div>

      <div className="flex gap-8">
        <aside className="hidden lg:block w-60 flex-shrink-0">
          <BoutiqueFilters categories={categories} brands={brands} />
        </aside>
        <div className="flex-1 min-w-0">
          {products.length === 0 ? (
            <div className="text-center py-24 text-[var(--color-on-surface-variant)]">
              <p className="text-lg font-semibold">Aucun produit dans cette catégorie</p>
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
                      href={`/boutique/${slug}?page=${p}`}
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
