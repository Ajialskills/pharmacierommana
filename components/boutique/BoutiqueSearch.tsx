"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useDebounce } from "@/hooks/useDebounce";
import { createClient } from "@/lib/supabase/client";
import type { Product } from "@/types";

export default function BoutiqueSearch() {
  const router = useRouter();
  const params = useSearchParams();
  const [value, setValue] = useState(params.get("q") ?? "");
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [open, setOpen] = useState(false);
  const debounced = useDebounce(value, 250);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const mounted = useRef(false);

  // Fetch suggestions
  useEffect(() => {
    if (!debounced.trim()) { setSuggestions([]); return; }
    let cancelled = false;
    const supabase = createClient();
    supabase
      .from("products")
      .select("id, name, slug, images, price, sale_price")
      .eq("is_published", true)
      .ilike("name", `%${debounced}%`)
      .limit(6)
      .then(({ data }) => {
        if (!cancelled) {
          setSuggestions((data as Product[]) ?? []);
          setOpen(true);
        }
      });
    return () => { cancelled = true; };
  }, [debounced]);

  // Push search to URL (skip initial mount to avoid wiping ?page= on navigation)
  useEffect(() => {
    if (!mounted.current) { mounted.current = true; return; }
    const next = new URLSearchParams(params.toString());
    if (debounced) next.set("q", debounced);
    else next.delete("q");
    next.delete("page");
    router.push(`/boutique?${next.toString()}`);
  }, [debounced, params, router]);

  // Close on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  function clear() { setValue(""); setSuggestions([]); setOpen(false); }

  const displayPrice = (p: Product) => (p.sale_price ?? p.price).toFixed(2);

  return (
    <div ref={wrapperRef} className="relative mb-6">
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-on-surface-variant)] pointer-events-none"
          width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
        </svg>
        <input
          type="search"
          value={value}
          onChange={(e) => { setValue(e.target.value); if (e.target.value) setOpen(true); }}
          onFocus={() => { if (suggestions.length > 0) setOpen(true); }}
          placeholder="Rechercher un produit…"
          className="w-full border border-[var(--color-border-subtle)] rounded-xl pl-9 pr-8 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
        />
        {value && (
          <button onClick={clear} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-on-surface-variant)] hover:text-[var(--color-on-surface)]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Dropdown */}
      {open && suggestions.length > 0 && (
        <div className="absolute z-50 top-full mt-1 w-full bg-white border border-[var(--color-border-subtle)] rounded-xl shadow-lg overflow-hidden">
          {suggestions.map((p) => (
            <Link
              key={p.id}
              href={`/produit/${p.slug}`}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 hover:bg-[var(--color-surface-container-low)] transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-[var(--color-background-soft)] flex-shrink-0 overflow-hidden relative">
                {p.images?.[0] ? (
                  <Image src={p.images[0]} alt={p.name} fill className="object-contain p-1" />
                ) : (
                  <div className="w-full h-full" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-[var(--color-on-surface)] truncate">{p.name}</p>
                <p className="text-xs text-[var(--color-primary)] font-bold">{displayPrice(p)} د.م.</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
