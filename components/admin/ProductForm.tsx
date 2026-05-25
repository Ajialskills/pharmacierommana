"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createProduct, updateProduct } from "@/app/actions/products";
import { uploadToCloudinary } from "@/lib/cloudinary";
import type { Product, Category, Brand } from "@/types";

interface Props {
  product?: Product;
  categories: Category[];
  brands: Brand[];
}

export default function ProductForm({ product, categories, brands }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>(product?.images ?? []);
  const [uploading, setUploading] = useState(false);

  const topLevel = categories.filter((c) => !c.parent_id);
  const subCategories = categories.filter((c) => !!c.parent_id);

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const { url } = await uploadToCloudinary(file);
      setImages((prev) => [...prev, url]);
    } catch {
      setError("Échec de l'upload image.");
    } finally {
      setUploading(false);
    }
  }

  function removeImage(url: string) {
    setImages((prev) => prev.filter((u) => u !== url));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const data = new FormData(form);
    data.set("images", JSON.stringify(images));

    startTransition(async () => {
      try {
        if (product) {
          data.set("slug", product.slug);
          await updateProduct(product.id, data);
        } else {
          await createProduct(data);
        }
        router.push("/admin/produits");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
      {error && (
        <p className="text-sm text-[var(--color-error)] bg-[var(--color-error-container)] px-4 py-3 rounded-xl">
          {error}
        </p>
      )}

      {/* Basic info */}
      <section className="bg-white border border-[var(--color-border-subtle)] rounded-2xl p-6 space-y-5">
        <h2 className="font-bold text-[var(--color-on-surface)]">Informations générales</h2>
        <div>
          <label className="block text-xs font-semibold text-[var(--color-on-surface-variant)] mb-1.5 uppercase tracking-wide">Nom *</label>
          <input name="name" required defaultValue={product?.name} className="w-full border border-[var(--color-border-subtle)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[var(--color-on-surface-variant)] mb-1.5 uppercase tracking-wide">Description</label>
          <textarea name="description" rows={4} defaultValue={product?.description ?? ""} className="w-full border border-[var(--color-border-subtle)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] resize-none" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[var(--color-on-surface-variant)] mb-1.5 uppercase tracking-wide">Marque</label>
            <select name="brand_id" defaultValue={product?.brand_id ?? ""} className="w-full border border-[var(--color-border-subtle)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]">
              <option value="">— Sans marque —</option>
              {brands.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-[var(--color-on-surface-variant)] mb-1.5 uppercase tracking-wide">Catégorie</label>
            <select name="category_id" defaultValue={product?.category_id ?? ""} className="w-full border border-[var(--color-border-subtle)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]">
              <option value="">— Sans catégorie —</option>
              <optgroup label="Catégories principales">
                {topLevel.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </optgroup>
              <optgroup label="Sous-catégories">
                {subCategories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </optgroup>
            </select>
          </div>
        </div>
      </section>

      {/* Pricing & stock */}
      <section className="bg-white border border-[var(--color-border-subtle)] rounded-2xl p-6 space-y-5">
        <h2 className="font-bold text-[var(--color-on-surface)]">Prix & stock</h2>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[var(--color-on-surface-variant)] mb-1.5 uppercase tracking-wide">Prix normal (MAD) *</label>
            <input name="price" type="number" step="0.01" min="0" required defaultValue={product?.price} className="w-full border border-[var(--color-border-subtle)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[var(--color-on-surface-variant)] mb-1.5 uppercase tracking-wide">Prix soldé (MAD)</label>
            <input name="sale_price" type="number" step="0.01" min="0" defaultValue={product?.sale_price ?? ""} className="w-full border border-[var(--color-border-subtle)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[var(--color-on-surface-variant)] mb-1.5 uppercase tracking-wide">Stock</label>
            <input name="stock" type="number" min="0" defaultValue={product?.stock ?? 0} className="w-full border border-[var(--color-border-subtle)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]" />
          </div>
        </div>
      </section>

      {/* Images */}
      <section className="bg-white border border-[var(--color-border-subtle)] rounded-2xl p-6 space-y-4">
        <h2 className="font-bold text-[var(--color-on-surface)]">Images</h2>
        <div className="flex flex-wrap gap-3">
          {images.map((url) => (
            <div key={url} className="relative w-24 h-24 rounded-xl overflow-hidden border border-[var(--color-border-subtle)] group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="" className="w-full h-full object-contain p-2 bg-[var(--color-background-soft)]" />
              <button
                type="button"
                onClick={() => removeImage(url)}
                className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold"
              >
                Supprimer
              </button>
            </div>
          ))}
          <label className="w-24 h-24 rounded-xl border-2 border-dashed border-[var(--color-border-subtle)] flex flex-col items-center justify-center cursor-pointer hover:border-[var(--color-primary)] transition-colors text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            <span className="text-xs mt-1">{uploading ? "…" : "Upload"}</span>
            <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
          </label>
        </div>
      </section>

      {/* Flags & SEO */}
      <section className="bg-white border border-[var(--color-border-subtle)] rounded-2xl p-6 space-y-5">
        <h2 className="font-bold text-[var(--color-on-surface)]">Mise en avant & SEO</h2>
        <div className="flex flex-wrap gap-6">
          {[
            { name: "is_published", label: "Publié", default: product?.is_published ?? true },
            { name: "featured_promo", label: "Offre spéciale", default: product?.featured_promo ?? false },
            { name: "featured_bestseller", label: "Meilleure vente", default: product?.featured_bestseller ?? false },
          ].map((f) => (
            <label key={f.name} className="flex items-center gap-2 cursor-pointer">
              <input type="hidden" name={f.name} value="false" />
              <input type="checkbox" name={f.name} value="true" defaultChecked={f.default} className="w-4 h-4 accent-[var(--color-primary)]" />
              <span className="text-sm font-medium text-[var(--color-on-surface)]">{f.label}</span>
            </label>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[var(--color-on-surface-variant)] mb-1.5 uppercase tracking-wide">Meta titre</label>
            <input name="meta_title" defaultValue={product?.meta_title ?? ""} className="w-full border border-[var(--color-border-subtle)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[var(--color-on-surface-variant)] mb-1.5 uppercase tracking-wide">Meta description</label>
            <textarea name="meta_description" rows={2} defaultValue={product?.meta_description ?? ""} className="w-full border border-[var(--color-border-subtle)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] resize-none" />
          </div>
        </div>
      </section>

      <div className="flex gap-3">
        <button type="submit" disabled={isPending || uploading} className="bg-[var(--color-primary)] text-white px-6 py-3 rounded-xl font-bold text-sm hover:opacity-90 disabled:opacity-60 transition-opacity">
          {isPending ? "Enregistrement…" : product ? "Mettre à jour" : "Créer le produit"}
        </button>
        <button type="button" onClick={() => router.back()} className="px-6 py-3 rounded-xl font-semibold text-sm border border-[var(--color-border-subtle)] hover:bg-[var(--color-background-soft)] transition-colors">
          Annuler
        </button>
      </div>
    </form>
  );
}
