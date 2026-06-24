"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Category, Brand } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";

interface Props {
  categories: Category[];
  brands: Brand[];
}

const selectCls = "w-full border border-[var(--color-border-subtle)] rounded-lg px-2.5 py-1.5 text-xs text-[var(--color-on-surface)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all appearance-none";

const PRICE_MIN = 0;
const PRICE_MAX = 2000;

export default function BoutiqueFilters({ categories, brands }: Props) {
  const router = useRouter();
  const params = useSearchParams();
  const { tr } = useLanguage();

  const activeCategory = params.get("categorie");
  const activeBrand = params.get("marque");
  const activePromo = params.get("promo") === "1";
  const activeRating = params.get("rating");
  const hasFilters = activeCategory || activeBrand || activePromo || params.get("min") || params.get("max") || activeRating;

  const topLevel = categories.filter((c) => !c.parent_id);
  const subOf = (parentId: string) => categories.filter((c) => c.parent_id === parentId);

  const inferParent = () => {
    if (!activeCategory) return "";
    if (topLevel.find((c) => c.id === activeCategory)) return activeCategory;
    const parent = topLevel.find((c) => subOf(c.id).some((s) => s.id === activeCategory));
    return parent?.id ?? "";
  };

  const [selectedParent, setSelectedParent] = useState(inferParent);
  const subs = selectedParent ? subOf(selectedParent) : [];

  const [priceMin, setPriceMin] = useState(parseInt(params.get("min") ?? String(PRICE_MIN)));
  const [priceMax, setPriceMax] = useState(parseInt(params.get("max") ?? String(PRICE_MAX)));

  useEffect(() => { setSelectedParent(inferParent()); }, [activeCategory]);

  function update(key: string, value: string | null) {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    next.delete("page");
    router.push(`/boutique?${next.toString()}`);
  }

  function onParentChange(id: string) {
    setSelectedParent(id);
    update("categorie", id || null);
  }

  function onSubChange(id: string) {
    update("categorie", id || selectedParent || null);
  }

  function applyPrice() {
    const next = new URLSearchParams(params.toString());
    if (priceMin > PRICE_MIN) next.set("min", String(priceMin));
    else next.delete("min");
    if (priceMax < PRICE_MAX) next.set("max", String(priceMax));
    else next.delete("max");
    next.delete("page");
    router.push(`/boutique?${next.toString()}`);
  }

  const pct = (v: number) => ((v - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100;

  const activeSubCategory = activeCategory && !topLevel.find((c) => c.id === activeCategory) ? activeCategory : "";

  return (
    <div className="space-y-5">
      {hasFilters && (
        <button
          onClick={() => { setSelectedParent(""); setPriceMin(PRICE_MIN); setPriceMax(PRICE_MAX); router.push("/boutique"); }}
          className="text-xs font-semibold text-[var(--color-primary)] hover:underline"
        >
          ← {tr("boutique.reset_filters")}
        </button>
      )}

      {/* Promo */}
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={activePromo}
          onChange={(e) => update("promo", e.target.checked ? "1" : null)}
          className="w-4 h-4 accent-[var(--color-primary)]"
        />
        <span className="text-xs font-semibold text-[var(--color-on-surface)]">{tr("boutique.on_sale")}</span>
      </label>

      {/* Categories */}
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-on-surface-variant)] mb-2">{tr("nav.categories")}</p>
        <div className="space-y-2">
          <div className="relative">
            <select value={selectedParent} onChange={(e) => onParentChange(e.target.value)} className={selectCls}>
              <option value="">Toutes les catégories</option>
              {topLevel.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-on-surface-variant)]" width="14" height="14" viewBox="0 0 12 12" fill="none">
              <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="relative">
            <select
              value={activeSubCategory}
              onChange={(e) => onSubChange(e.target.value)}
              disabled={subs.length === 0}
              className={`${selectCls} ${subs.length === 0 ? "opacity-40 cursor-not-allowed" : ""}`}
            >
              <option value="">Toutes les sous-catégories</option>
              {subs.map((sub) => (
                <option key={sub.id} value={sub.id}>{sub.name}</option>
              ))}
            </select>
            <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-on-surface-variant)]" width="14" height="14" viewBox="0 0 12 12" fill="none">
              <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* Marques */}
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-on-surface-variant)] mb-2">{tr("nav.brands")}</p>
        <div className="relative">
          <select
            value={activeBrand ?? ""}
            onChange={(e) => update("marque", e.target.value || null)}
            disabled={brands.length === 0}
            className={`${selectCls} ${brands.length === 0 ? "opacity-40 cursor-not-allowed" : ""}`}
          >
            <option value="">Toutes les marques</option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.id}>{brand.name}</option>
            ))}
          </select>
          <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-on-surface-variant)]" width="14" height="14" viewBox="0 0 12 12" fill="none">
            <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Price range */}
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-on-surface-variant)] mb-3">Prix</p>

        {/* Track */}
        <div className="relative h-1.5 bg-[var(--color-border-subtle)] rounded-full mb-4">
          <div
            className="absolute h-1.5 rounded-full bg-[var(--color-primary)]"
            style={{ left: `${pct(priceMin)}%`, right: `${100 - pct(priceMax)}%` }}
          />
          <input
            type="range"
            min={PRICE_MIN} max={PRICE_MAX} step={10}
            value={priceMin}
            onChange={(e) => { const v = Math.min(parseInt(e.target.value), priceMax - 10); setPriceMin(v); }}
            onMouseUp={applyPrice} onTouchEnd={applyPrice} onKeyUp={applyPrice}
            className="absolute inset-0 w-full opacity-0 cursor-pointer h-1.5"
            style={{ zIndex: priceMin > PRICE_MAX - 100 ? 5 : 3 }}
          />
          <input
            type="range"
            min={PRICE_MIN} max={PRICE_MAX} step={10}
            value={priceMax}
            onChange={(e) => { const v = Math.max(parseInt(e.target.value), priceMin + 10); setPriceMax(v); }}
            onMouseUp={applyPrice} onTouchEnd={applyPrice} onKeyUp={applyPrice}
            className="absolute inset-0 w-full opacity-0 cursor-pointer h-1.5"
            style={{ zIndex: 4 }}
          />
          {/* Thumbs */}
          <div className="absolute w-3.5 h-3.5 rounded-full bg-white border-2 border-[var(--color-primary)] shadow -top-[5px] pointer-events-none" style={{ left: `calc(${pct(priceMin)}% - 7px)` }} />
          <div className="absolute w-3.5 h-3.5 rounded-full bg-white border-2 border-[var(--color-primary)] shadow -top-[5px] pointer-events-none" style={{ left: `calc(${pct(priceMax)}% - 7px)` }} />
        </div>

        <div className="flex items-center justify-between text-xs text-[var(--color-on-surface-variant)]">
          <span className="font-semibold text-[var(--color-on-surface)]">{priceMin} DH</span>
          <span className="font-semibold text-[var(--color-on-surface)]">{priceMax} DH</span>
        </div>
      </div>

      {/* Rating */}
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-on-surface-variant)] mb-2">Avis clients</p>
        <div className="space-y-1">
          {[4, 3, 2, 1].map((stars) => (
            <button
              key={stars}
              onClick={() => update("rating", activeRating === String(stars) ? null : String(stars))}
              className={`flex items-center gap-2 w-full px-2 py-1.5 rounded-lg text-xs transition-colors ${activeRating === String(stars) ? "bg-[color-mix(in_srgb,var(--color-primary)_10%,transparent)] text-[var(--color-primary)] font-semibold" : "text-[var(--color-on-surface-variant)] hover:text-[var(--color-on-surface)]"}`}
            >
              <span className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} width="11" height="11" viewBox="0 0 24 24" fill={i < stars ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" style={{ color: i < stars ? "#f59e0b" : "var(--color-border-subtle)" }}>
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </span>
              <span>& plus</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
