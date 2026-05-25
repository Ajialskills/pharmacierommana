"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import type { Category, Brand } from "@/types";

interface Props {
  categories: Category[];
  brands: Brand[];
}

export default function BoutiqueFilters({ categories, brands }: Props) {
  const router = useRouter();
  const params = useSearchParams();

  const update = useCallback((key: string, value: string | null) => {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    next.delete("page");
    router.push(`/boutique?${next.toString()}`);
  }, [params, router]);

  const topLevel = categories.filter((c) => !c.parent_id);
  const subOf = (parentId: string) => categories.filter((c) => c.parent_id === parentId);

  const activeCategory = params.get("categorie");
  const activeBrand = params.get("marque");
  const activePromo = params.get("promo") === "1";

  const hasFilters = activeCategory || activeBrand || activePromo;

  return (
    <div className="space-y-6">
      {hasFilters && (
        <button
          onClick={() => router.push("/boutique")}
          className="text-xs font-semibold text-[var(--color-primary)] hover:underline"
        >
          ← Réinitialiser les filtres
        </button>
      )}

      {/* Promo */}
      <div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={activePromo}
            onChange={(e) => update("promo", e.target.checked ? "1" : null)}
            className="w-4 h-4 accent-[var(--color-primary)]"
          />
          <span className="text-sm font-semibold text-[var(--color-on-surface)]">Offres spéciales</span>
        </label>
      </div>

      {/* Categories */}
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-on-surface-variant)] mb-3">Catégories</p>
        <div className="space-y-1">
          <button
            onClick={() => update("categorie", null)}
            className={`block w-full text-left text-sm px-2 py-1.5 rounded-lg transition-colors ${!activeCategory ? "bg-[color-mix(in_srgb,var(--color-primary)_10%,transparent)] text-[var(--color-primary)] font-semibold" : "text-[var(--color-on-surface-variant)] hover:text-[var(--color-on-surface)]"}`}
          >
            Tous les produits
          </button>
          {topLevel.map((cat) => (
            <div key={cat.id}>
              <button
                onClick={() => update("categorie", cat.id)}
                className={`block w-full text-left text-sm px-2 py-1.5 rounded-lg transition-colors font-medium ${activeCategory === cat.id ? "bg-[color-mix(in_srgb,var(--color-primary)_10%,transparent)] text-[var(--color-primary)] font-semibold" : "text-[var(--color-on-surface)] hover:text-[var(--color-primary)]"}`}
              >
                {cat.name}
              </button>
              {subOf(cat.id).map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => update("categorie", sub.id)}
                  className={`block w-full text-left text-sm pl-5 pr-2 py-1 rounded-lg transition-colors ${activeCategory === sub.id ? "text-[var(--color-primary)] font-semibold" : "text-[var(--color-on-surface-variant)] hover:text-[var(--color-on-surface)]"}`}
                >
                  {sub.name}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Brands */}
      {brands.length > 0 && (
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-on-surface-variant)] mb-3">Marques</p>
          <div className="space-y-1">
            {brands.map((brand) => (
              <button
                key={brand.id}
                onClick={() => update("marque", activeBrand === brand.id ? null : brand.id)}
                className={`block w-full text-left text-sm px-2 py-1.5 rounded-lg transition-colors ${activeBrand === brand.id ? "bg-[color-mix(in_srgb,var(--color-primary)_10%,transparent)] text-[var(--color-primary)] font-semibold" : "text-[var(--color-on-surface-variant)] hover:text-[var(--color-on-surface)]"}`}
              >
                {brand.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
