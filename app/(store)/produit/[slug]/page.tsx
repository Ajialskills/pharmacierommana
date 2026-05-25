import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import type { Product } from "@/types";
import ProductGallery from "./ProductGallery";
import ProductActions from "./ProductActions";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("products")
    .select("name, meta_title, meta_description, images")
    .eq("slug", slug)
    .single();
  const title = data?.meta_title ?? data?.name ?? "Produit";
  const description = data?.meta_description ?? undefined;
  const image = (data?.images as string[] | null)?.[0];
  return {
    title,
    description,
    openGraph: {
      title: `${title} — Pharmacie Rommana`,
      description,
      images: image ? [{ url: image, width: 800, height: 800, alt: title }] : undefined,
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: product } = await supabase
    .from("products")
    .select("*, categories(name, slug), brands(name, slug)")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (!product) notFound();

  const p = product as Product & { categories?: { name: string; slug: string }; brands?: { name: string; slug: string } };

  const discount =
    p.sale_price && p.price > p.sale_price
      ? Math.round(((p.price - p.sale_price) / p.price) * 100)
      : null;

  return (
    <div style={{ maxWidth: "var(--spacing-max-width)" }} className="mx-auto px-[var(--spacing-lg)] py-10">
      {/* Breadcrumb */}
      <nav className="text-xs text-[var(--color-on-surface-variant)] mb-8 flex items-center gap-1">
        <a href="/" className="hover:text-[var(--color-primary)]">Accueil</a>
        <span>/</span>
        <a href="/boutique" className="hover:text-[var(--color-primary)]">Boutique</a>
        {p.categories && (
          <>
            <span>/</span>
            <a href={`/boutique/${p.categories.slug}`} className="hover:text-[var(--color-primary)]">{p.categories.name}</a>
          </>
        )}
        <span>/</span>
        <span className="text-[var(--color-on-surface)] font-medium line-clamp-1">{p.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
        {/* Gallery */}
        <ProductGallery images={p.images ?? []} name={p.name} />

        {/* Info */}
        <div className="flex flex-col gap-6">
          {p.brands && (
            <a href={`/marques/${p.brands.slug}`} className="text-xs font-bold uppercase tracking-widest text-[var(--color-secondary)] hover:underline">
              {p.brands.name}
            </a>
          )}

          <h1 className="text-2xl font-bold text-[var(--color-on-surface)] leading-snug">{p.name}</h1>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-bold text-[var(--color-primary)]">
              {(p.sale_price ?? p.price).toFixed(2)} د.م.
            </span>
            {p.sale_price && (
              <span className="text-base text-[var(--color-on-surface-variant)] line-through">
                {p.price.toFixed(2)} د.م.
              </span>
            )}
            {discount && (
              <span
                className="text-xs font-bold text-white px-2 py-1 rounded"
                style={{ backgroundColor: "var(--color-tertiary-container)" }}
              >
                -{discount}%
              </span>
            )}
          </div>

          {/* Description */}
          {p.description && (
            <p className="text-sm text-[var(--color-on-surface-variant)] leading-relaxed">{p.description}</p>
          )}

          {/* Actions */}
          <ProductActions product={p} />

          {/* Delivery info */}
          <div className="border-t border-[var(--color-border-subtle)] pt-5 space-y-2">
            <div className="flex items-center gap-2 text-xs text-[var(--color-on-surface-variant)]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              Livraison gratuite dès 400 DH sur Tétouan
            </div>
            <div className="flex items-center gap-2 text-xs text-[var(--color-on-surface-variant)]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              Paiement à la livraison disponible
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
