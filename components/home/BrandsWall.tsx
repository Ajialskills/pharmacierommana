import Image from "next/image";
import Link from "next/link";
import type { Brand } from "@/types";

interface Props {
  brands: Brand[];
}

export default function BrandsWall({ brands }: Props) {
  if (brands.length === 0) return null;

  return (
    <section aria-labelledby="brands-heading" className="pb-8 bg-[var(--color-surface-container-low)]">
      <div style={{ maxWidth: "var(--spacing-max-width)" }} className="mx-auto px-[var(--spacing-lg)]">
        <div className="flex flex-col items-center text-center mb-10">
          <h2 id="brands-heading" className="text-4xl font-bold text-[var(--color-on-background)] uppercase tracking-wide">
            Nos marques
          </h2>
          <p className="text-base text-[var(--color-on-surface-variant)] mt-2">
            Des marques de confiance sélectionnées par notre équipe
          </p>
          <Link
            href="/marques"
            className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[var(--color-primary)] hover:underline"
          >
            Toutes les marques
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      <div className="w-full px-[var(--spacing-lg)]">
        <div className="flex gap-4 justify-between">
          {brands.slice(0, 10).map((brand) => (
            <Link
              key={brand.id}
              href={`/marques/${brand.slug}`}
              className="group relative flex flex-col items-center justify-center gap-5 py-10 flex-1 bg-white border border-[var(--color-border-subtle)] rounded-2xl shadow-sm hover:shadow-md hover:border-[var(--color-primary)] transition-all min-w-0 overflow-hidden"
            >
              {brand.logo_url && (
                <Image
                  src={brand.logo_url}
                  alt={brand.name}
                  width={128}
                  height={128}
                  className="relative z-10 w-32 h-32 object-contain grayscale group-hover:grayscale-0 transition-all"
                />
              )}
              <span
                className="relative z-10 text-2xl text-center text-[var(--color-on-surface-variant)] group-hover:text-[var(--color-primary)] transition-colors leading-tight"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontStyle: "italic" }}
              >
                {brand.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
