import Image from "next/image";
import Link from "next/link";
import type { Brand } from "@/types";

interface Props {
  brands: Brand[];
}

export default function BrandsWall({ brands }: Props) {
  if (brands.length === 0) return null;

  return (
    <section aria-labelledby="brands-heading" className="py-16 bg-[var(--color-surface-container-low)]">
      <div style={{ maxWidth: "var(--spacing-max-width)" }} className="mx-auto px-[var(--spacing-lg)]">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 id="brands-heading" className="text-2xl font-bold text-[var(--color-on-background)]">
              Nos marques
            </h2>
            <p className="text-sm text-[var(--color-on-surface-variant)] mt-1">
              Des marques de confiance sélectionnées par notre équipe
            </p>
          </div>
          <Link
            href="/marques"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-[var(--color-primary)] hover:underline"
          >
            Toutes les marques
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
          {brands.map((brand) => (
            <Link
              key={brand.id}
              href={`/marques/${brand.slug}`}
              className="group flex items-center gap-2.5 bg-white border border-[var(--color-border-subtle)] rounded-xl px-4 py-2.5 hover:shadow-sm hover:border-[var(--color-primary)] transition-all"
            >
              {brand.logo_url ? (
                <Image
                  src={brand.logo_url}
                  alt={brand.name}
                  width={24}
                  height={24}
                  className="w-6 h-6 object-contain"
                />
              ) : (
                <span className="w-6 h-6 rounded flex items-center justify-center bg-[color-mix(in_srgb,var(--color-primary)_10%,transparent)] text-[var(--color-primary)] font-bold text-xs">
                  {brand.name.charAt(0)}
                </span>
              )}
              <span className="text-sm font-semibold text-[var(--color-on-surface)] group-hover:text-[var(--color-primary)] transition-colors">
                {brand.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
