"use client";

import { useState, useMemo } from "react";
import ProductCard from "@/components/product/ProductCard";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Product } from "@/types";

interface Props {
  products: Product[];
  filterCategories: { id: string; name: string; productIds: string[] }[];
}

export default function BestSellersSection({ products, filterCategories }: Props) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const { tr, trCat } = useLanguage();
  if (products.length === 0) return null;

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (activeCategory) {
        const cat = filterCategories.find((c) => c.id === activeCategory);
        if (!cat?.productIds.includes(p.id)) return false;
      }
      if (search.trim()) {
        if (!p.name.toLowerCase().includes(search.trim().toLowerCase())) return false;
      }
      const effectivePrice = p.sale_price ?? p.price;
      if (minPrice && effectivePrice < parseFloat(minPrice)) return false;
      if (maxPrice && effectivePrice > parseFloat(maxPrice)) return false;
      return true;
    });
  }, [products, activeCategory, search, minPrice, maxPrice, filterCategories]);

  return (
    <section aria-labelledby="bestsellers-heading" className="-mt-3 pb-24 bg-gradient-to-br from-[var(--color-surface-container-low)] via-white to-[color-mix(in_srgb,var(--color-primary-container)_12%,white)]">
      <div style={{ maxWidth: "var(--spacing-max-width)" }} className="mx-auto px-[var(--spacing-lg)]">
        <div className="flex flex-col items-center text-center mb-8">
          <h2
            id="bestsellers-heading"
            style={{
              fontSize: "var(--text-headline-lg)",
              fontWeight: "var(--text-headline-lg--font-weight)",
              backdropFilter: "blur(24px) saturate(200%)",
              WebkitBackdropFilter: "blur(24px) saturate(200%)",
              background: "linear-gradient(135deg, rgba(3, 95, 99, 0.22) 0%, rgba(3, 95, 99, 0.10) 100%)",
              boxShadow: "0 8px 32px rgba(3,95,99,0.18), 0 2px 8px rgba(3,95,99,0.10), inset 0 1px 0 rgba(100,210,215,0.40), inset 0 -1px 0 rgba(3,95,99,0.15)",
              border: "1px solid rgba(3, 95, 99, 0.35)",
            }}
            className="inline-block text-[#035F63] font-black px-8 py-3 rounded-full"
          >
            {tr("boutique.quick_search")}
          </h2>
        </div>

        {/* Filter bar */}
        <div className="flex flex-wrap items-center gap-3 mb-8 bg-white border border-[var(--color-border-subtle)] rounded-2xl px-4 py-3">

          {/* Search */}
          <div className="relative flex-1 min-w-[160px]">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-on-surface-variant)]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="search"
              placeholder={tr("boutique.search_placeholder")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-surface-container-low)] text-[var(--color-on-surface)] placeholder:text-[var(--color-on-surface-variant)] focus:outline-none focus:border-[var(--color-primary)] transition-colors"
            />
          </div>

          <div className="w-px h-5 bg-[var(--color-border-subtle)] hidden sm:block" />

          {/* Category pills */}
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                activeCategory === null
                  ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)]"
                  : "bg-transparent text-[var(--color-on-surface-variant)] border-[var(--color-border-subtle)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
              }`}
            >
              {tr("boutique.all")}
            </button>
            {filterCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id === activeCategory ? null : cat.id)}
                className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                  activeCategory === cat.id
                    ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)]"
                    : "bg-transparent text-[var(--color-on-surface-variant)] border-[var(--color-border-subtle)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                }`}
              >
                {trCat(cat.name, cat.id)}
              </button>
            ))}
          </div>

          <div className="w-px h-5 bg-[var(--color-border-subtle)] hidden sm:block" />

          {/* Price range */}
          <div className="flex items-center gap-2 shrink-0">
            <input
              type="number"
              placeholder="Min"
              min={0}
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-16 px-2 py-1.5 text-xs rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-surface-container-low)] text-[var(--color-on-surface)] placeholder:text-[var(--color-on-surface-variant)] focus:outline-none focus:border-[var(--color-primary)] transition-colors"
            />
            <span className="text-xs text-[var(--color-on-surface-variant)]">—</span>
            <input
              type="number"
              placeholder="Max"
              min={0}
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-16 px-2 py-1.5 text-xs rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-surface-container-low)] text-[var(--color-on-surface)] placeholder:text-[var(--color-on-surface-variant)] focus:outline-none focus:border-[var(--color-primary)] transition-colors"
            />
            <span className="text-xs text-[var(--color-on-surface-variant)] font-medium">DH</span>
          </div>
        </div>

        {/* Products grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-[var(--spacing-gutter)]">
            {filtered.slice(0, 5).map((p, i) => (
              <ProductCard key={p.id} product={p} showBadge={false} priority={i === 0} />
            ))}
          </div>
        ) : (
          <p className="text-center text-sm text-[var(--color-on-surface-variant)] py-12">
            Aucun produit ne correspond à votre recherche.
          </p>
        )}
      </div>
    </section>
  );
}
