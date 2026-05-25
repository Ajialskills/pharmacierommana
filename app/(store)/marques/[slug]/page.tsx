import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getBrandBySlug } from "@/app/actions/brands";
import { createClient } from "@/lib/supabase/server";
import ProductCard from "@/components/product/ProductCard";
import type { Product } from "@/types";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const brand = await getBrandBySlug(slug);
  if (!brand) return { title: "Marque introuvable" };
  return {
    title: `${brand.name} — Pharmacie Rommana`,
    description: brand.description ?? `Produits ${brand.name} disponibles chez Pharmacie Rommana.`,
  };
}

export default async function BrandPage({ params }: PageProps) {
  const { slug } = await params;
  const brand = await getBrandBySlug(slug);
  if (!brand) notFound();

  const supabase = await createClient();
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("brand_id", brand.id)
    .eq("is_published", true)
    .order("name");

  const brandProducts: Product[] = products ?? [];

  return (
    <div style={{ maxWidth: "var(--spacing-max-width)" }} className="mx-auto px-[var(--spacing-lg)] py-12">
      <nav className="text-xs text-[var(--color-on-surface-variant)] mb-8 flex items-center gap-1">
        <Link href="/marques" className="hover:text-[var(--color-primary)]">Marques</Link>
        <span>/</span>
        <span className="text-[var(--color-on-surface)]">{brand.name}</span>
      </nav>

      <div className="flex items-center gap-5 mb-10">
        {brand.logo_url ? (
          <div className="w-16 h-16 rounded-xl overflow-hidden border border-[var(--color-border-subtle)] bg-white p-2 flex-shrink-0">
            <Image src={brand.logo_url} alt={brand.name} width={64} height={64} className="w-full h-full object-contain" />
          </div>
        ) : (
          <div className="w-16 h-16 rounded-xl bg-[color-mix(in_srgb,var(--color-primary)_10%,transparent)] flex items-center justify-center flex-shrink-0">
            <span className="text-2xl font-bold text-[var(--color-primary)]">{brand.name.charAt(0)}</span>
          </div>
        )}
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-on-surface)]">{brand.name}</h1>
          {brand.description && (
            <p className="text-sm text-[var(--color-on-surface-variant)] mt-1">{brand.description}</p>
          )}
          <p className="text-xs text-[var(--color-on-surface-variant)] mt-1">
            {brandProducts.length} produit{brandProducts.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {brandProducts.length === 0 ? (
        <div className="text-center py-24 text-[var(--color-on-surface-variant)] border border-dashed border-[var(--color-border-subtle)] rounded-2xl">
          <p className="font-medium">Aucun produit disponible pour cette marque.</p>
          <Link href="/boutique" className="inline-block mt-4 text-sm font-semibold text-[var(--color-primary)] hover:underline">
            Voir toute la boutique
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {brandProducts.map((p) => (
            <ProductCard key={p.id} product={p} showBadge />
          ))}
        </div>
      )}
    </div>
  );
}
