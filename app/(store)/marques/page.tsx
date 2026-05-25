import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getBrands } from "@/app/actions/brands";

export const metadata: Metadata = {
  title: "Marques — Pharmacie Rommana",
  description: "Découvrez toutes les marques disponibles chez Pharmacie Rommana.",
};

export default async function MarquesPage() {
  const brands = await getBrands();

  return (
    <div style={{ maxWidth: "var(--spacing-max-width)" }} className="mx-auto px-[var(--spacing-lg)] py-12">
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-[var(--color-on-surface)]">Nos Marques</h1>
        <p className="text-sm text-[var(--color-on-surface-variant)] mt-1">
          {brands.length} marque{brands.length !== 1 ? "s" : ""} disponibles
        </p>
      </div>

      {brands.length === 0 ? (
        <div className="text-center py-24 text-[var(--color-on-surface-variant)]">
          <p>Aucune marque pour l&apos;instant.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {brands.map((brand) => (
            <Link
              key={brand.id}
              href={`/marques/${brand.slug}`}
              className="group flex flex-col items-center gap-3 bg-white border border-[var(--color-border-subtle)] rounded-2xl p-5 hover:shadow-md hover:border-[var(--color-primary)] transition-all"
            >
              <div className="w-16 h-16 flex items-center justify-center rounded-xl overflow-hidden bg-[var(--color-surface-container-low)]">
                {brand.logo_url ? (
                  <Image
                    src={brand.logo_url}
                    alt={brand.name}
                    width={64}
                    height={64}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <span className="text-xl font-bold text-[var(--color-primary)]">
                    {brand.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <span className="text-xs font-semibold text-[var(--color-on-surface)] text-center leading-snug group-hover:text-[var(--color-primary)] transition-colors">
                {brand.name}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
