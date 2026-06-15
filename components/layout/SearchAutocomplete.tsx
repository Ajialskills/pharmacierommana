"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";


interface Result {
  id: string;
  slug: string;
  name: string;
  images: string[];
  price: number;
  sale_price: number | null;
}

function useDebounce(value: string, delay: number) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

export default function SearchAutocomplete() {
  const router = useRouter();
  const { tr } = useLanguage();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debouncedQuery = useDebounce(query, 280);

  useEffect(() => {
    if (debouncedQuery.trim().length < 2) {
      setResults([]);
      setOpen(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

    const supabase = createClient();
    supabase
      .from("products")
      .select("id, slug, name, images, price, sale_price")
      .eq("is_published", true)
      .ilike("name", `%${debouncedQuery.trim()}%`)
      .limit(8)
      .then(({ data }) => {
        if (cancelled) return;
        setResults((data as Result[]) ?? []);
        setOpen(true);
        setActiveIndex(-1);
        setLoading(false);
      });

    return () => { cancelled = true; };
  }, [debouncedQuery]);

  // Close on outside click
  useEffect(() => {
    function onPointerDown(e: PointerEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  const navigate = useCallback((slug: string) => {
    setOpen(false);
    setQuery("");
    router.push(`/produit/${slug}`);
  }, [router]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (activeIndex >= 0 && results[activeIndex]) {
      navigate(results[activeIndex].slug);
    } else if (query.trim()) {
      setOpen(false);
      router.push(`/boutique?q=${encodeURIComponent(query.trim())}`);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!open || results.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, -1));
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div ref={containerRef} className="hidden md:flex flex-1 relative" role="search">
      <form onSubmit={handleSubmit} className="w-full flex relative">
        <label htmlFor="header-search" className="sr-only">Rechercher des produits</label>
        <input
          id="header-search"
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => results.length > 0 && setOpen(true)}
          aria-label="Rechercher des produits"
          aria-autocomplete="list"
          aria-expanded={open}
          aria-controls="search-listbox"
          autoComplete="off"
          placeholder={tr("header.search_placeholder")}
          className="w-full bg-[var(--color-background-soft)] border border-[var(--color-border-subtle)] rounded-full px-6 py-2.5 text-[var(--color-on-surface)] placeholder:text-[var(--color-outline)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all text-sm pr-12"
        />
        <button
          type="submit"
          aria-label="Rechercher"
          className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-primary)]"
        >
          {loading ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-spin">
              <circle cx="12" cy="12" r="10" strokeOpacity=".25" />
              <path d="M12 2a10 10 0 0 1 10 10" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
          )}
        </button>
      </form>

      {/* Dropdown */}
      {open && results.length > 0 && (
        <ul
          id="search-listbox"
          role="listbox"
          aria-label="Suggestions de produits"
          className="absolute top-full left-0 right-0 mt-2 bg-white border border-[var(--color-border-subtle)] rounded-2xl shadow-xl z-50 overflow-hidden py-1"
        >
          {results.map((r, i) => {
            const displayPrice = r.sale_price ?? r.price;
            return (
              <li
                key={r.id}
                role="option"
                aria-selected={i === activeIndex}
                onPointerDown={() => navigate(r.slug)}
                onMouseEnter={() => setActiveIndex(i)}
                className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors ${
                  i === activeIndex
                    ? "bg-[var(--color-surface-container-low)]"
                    : "hover:bg-[var(--color-surface-container-low)]"
                }`}
              >
                <div className="w-10 h-10 rounded-lg bg-[var(--color-background-soft)] flex items-center justify-center shrink-0 overflow-hidden">
                  {r.images[0] ? (
                    <Image src={r.images[0]} alt="" width={40} height={40} className="object-contain w-full h-full p-0.5" />
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[var(--color-outline)]">
                      <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
                    </svg>
                  )}
                </div>
                <span className="flex-1 text-sm text-[var(--color-on-surface)] line-clamp-1">{r.name}</span>
                <span className="text-sm font-bold text-[var(--color-primary)] shrink-0">
                  {displayPrice.toFixed(2)} د.م.
                </span>
              </li>
            );
          })}

          {/* See all results */}
          <li
            role="option"
            aria-selected={false}
            onPointerDown={() => {
              setOpen(false);
              router.push(`/boutique?q=${encodeURIComponent(query.trim())}`);
            }}
            className="flex items-center justify-center gap-1.5 px-4 py-3 text-sm font-semibold text-[var(--color-primary)] border-t border-[var(--color-border-subtle)] cursor-pointer hover:bg-[var(--color-surface-container-low)] transition-colors"
          >
            {tr("header.all_results")} &ldquo;{query}&rdquo;
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </li>
        </ul>
      )}

      {/* No results */}
      {open && !loading && query.trim().length >= 2 && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[var(--color-border-subtle)] rounded-2xl shadow-xl z-50 px-4 py-4 text-sm text-[var(--color-on-surface-variant)] text-center">
          {tr("header.no_results")} &ldquo;{query}&rdquo;
        </div>
      )}
    </div>
  );
}
