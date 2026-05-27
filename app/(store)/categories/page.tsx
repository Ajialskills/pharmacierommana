import Link from "next/link";
import type { Metadata } from "next";
import { getCategories } from "@/app/actions/categories";
import type { Category } from "@/types";
import PageHero from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "Catégories — Pharmacie Rommana",
  description: "Parcourez toutes nos catégories de produits parapharmaceutiques.",
};

export default async function CategoriesPage() {
  const allCategories = await getCategories();
  const topLevel = allCategories.filter((c) => !c.parent_id);
  const subMap = allCategories.reduce<Record<string, Category[]>>((acc, c) => {
    if (c.parent_id) {
      if (!acc[c.parent_id]) acc[c.parent_id] = [];
      acc[c.parent_id].push(c);
    }
    return acc;
  }, {});

  return (
    <>
      <PageHero
        title="Catégories"
        subtitle="Tous nos produits organisés par famille"
        crumbs={[{ label: "Catégories" }]}
      />
      <div style={{ maxWidth: "var(--spacing-max-width)" }} className="mx-auto px-[var(--spacing-lg)] py-10">

      {topLevel.length === 0 ? (
        <div className="text-center py-24 text-[var(--color-on-surface-variant)]">
          <p>Aucune catégorie disponible.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {topLevel.map((cat) => {
            const subs = subMap[cat.id] ?? [];
            return (
              <div key={cat.id} className="bg-white border border-[var(--color-border-subtle)] rounded-2xl overflow-hidden">
                <Link
                  href={`/boutique/${cat.slug}`}
                  className="block p-5 hover:bg-[color-mix(in_srgb,var(--color-primary)_4%,transparent)] transition-colors"
                >
                  <h2 className="font-bold text-[var(--color-on-surface)] text-sm mb-1 hover:text-[var(--color-primary)] transition-colors">
                    {cat.name}
                  </h2>
                  {cat.description && (
                    <p className="text-xs text-[var(--color-on-surface-variant)] line-clamp-2 leading-relaxed">
                      {cat.description}
                    </p>
                  )}
                </Link>
                {subs.length > 0 && (
                  <div className="px-5 pb-4 flex flex-wrap gap-1.5 border-t border-[var(--color-border-subtle)] pt-3">
                    {subs.map((sub) => (
                      <Link
                        key={sub.id}
                        href={`/boutique/${sub.slug}`}
                        className="inline-block text-xs px-2.5 py-1 rounded-full bg-[var(--color-surface-container-low)] text-[var(--color-on-surface-variant)] hover:bg-[color-mix(in_srgb,var(--color-primary)_10%,transparent)] hover:text-[var(--color-primary)] transition-colors"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
      </div>
    </>
  );
}
