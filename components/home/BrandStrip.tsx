"use client";

import Image from "next/image";
import Link from "next/link";
import type { Brand } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";

interface Props {
  brands: Brand[];
}

export default function BrandStrip({ brands }: Props) {
  const { tr } = useLanguage();
  if (brands.length === 0) return null;

  const items = [...brands, ...brands];

  return (
    <section aria-labelledby="brands-strip-heading" className="py-10 bg-white border-y border-[var(--color-border-subtle)] overflow-hidden">
      <div style={{ maxWidth: "var(--spacing-max-width)" }} className="mx-auto px-[var(--spacing-lg)] mb-6 flex items-center justify-between">
        <h2 id="brands-strip-heading" className="text-xs font-bold tracking-widest uppercase text-[var(--color-on-surface-variant)]">
          {tr("home.brands")}
        </h2>
        <Link href="/marques" className="text-xs font-bold text-[var(--color-primary)] hover:underline flex items-center gap-1">
          {tr("home.brands_all")}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      <div
        className="flex whitespace-nowrap select-none"
        aria-hidden="true"
        onMouseEnter={e => (e.currentTarget.querySelector<HTMLDivElement>('.animate-marquee')!.style.animationPlayState = 'paused')}
        onMouseLeave={e => (e.currentTarget.querySelector<HTMLDivElement>('.animate-marquee')!.style.animationPlayState = 'running')}
      >
        <div className="flex items-center gap-8 animate-marquee">
          {items.map((brand, i) => (
            <Link
              key={`${brand.id}-${i}`}
              href={`/marques/${brand.slug}`}
              tabIndex={i < brands.length ? 0 : -1}
              className="flex items-center justify-center h-16 w-40 shrink-0 px-4 py-2 rounded-xl border border-[var(--color-border-subtle)] bg-white hover:border-[var(--color-primary)] hover:shadow-sm transition-all group"
            >
              {brand.logo_url ? (
                <Image
                  src={brand.logo_url}
                  alt={brand.name}
                  width={120}
                  height={48}
                  className="object-contain max-h-10 w-auto transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <span className="text-sm font-semibold text-[var(--color-on-surface-variant)] group-hover:text-[var(--color-primary)] transition-colors text-center leading-tight">
                  {brand.name}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
