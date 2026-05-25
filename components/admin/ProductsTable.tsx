"use client";

import { useTransition, useState } from "react";
import Link from "next/link";
import { deleteProduct } from "@/app/actions/products";
import type { Product, Category, Brand } from "@/types";

interface Props {
  products: (Product & { categories?: { name: string }; brands?: { name: string } })[];
  categories: Category[];
  brands: Brand[];
}

export default function ProductsTable({ products }: Props) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleDelete(id: string, name: string) {
    if (!confirm(`Supprimer « ${name} » ?`)) return;
    startTransition(async () => {
      try {
        await deleteProduct(id);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur");
      }
    });
  }

  return (
    <div>
      {error && (
        <p className="text-sm text-[var(--color-error)] bg-[var(--color-error-container)] px-4 py-3 rounded-xl mb-6">
          {error}
        </p>
      )}
      <div className="bg-white border border-[var(--color-border-subtle)] rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--color-border-subtle)] bg-[var(--color-background-soft)]">
              <th className="text-left px-6 py-3 text-xs font-semibold text-[var(--color-on-surface-variant)] uppercase tracking-wide">Produit</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-[var(--color-on-surface-variant)] uppercase tracking-wide">Prix</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-[var(--color-on-surface-variant)] uppercase tracking-wide">Stock</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-[var(--color-on-surface-variant)] uppercase tracking-wide">Statut</th>
              <th className="px-6 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-border-subtle)]">
            {products.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-[var(--color-on-surface-variant)] text-sm">
                  Aucun produit. <Link href="/admin/produits/nouveau" className="text-[var(--color-primary)] font-semibold hover:underline">Ajouter le premier</Link>
                </td>
              </tr>
            )}
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-[var(--color-background-soft)]">
                <td className="px-6 py-4">
                  <p className="font-semibold text-[var(--color-on-surface)] line-clamp-1">{p.name}</p>
                  <p className="text-xs text-[var(--color-on-surface-variant)] font-mono mt-0.5">{p.slug}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="font-semibold text-[var(--color-primary)]">{p.sale_price ?? p.price} د.م.</p>
                  {p.sale_price && (
                    <p className="text-xs text-[var(--color-on-surface-variant)] line-through">{p.price} د.م.</p>
                  )}
                </td>
                <td className="px-6 py-4">
                  <span className={`font-semibold ${p.stock === 0 ? "text-[var(--color-error)]" : p.stock < 10 ? "text-[var(--color-warning-amber)]" : "text-[var(--color-success-green)]"}`}>
                    {p.stock}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${p.is_published ? "bg-[color-mix(in_srgb,var(--color-success-green)_15%,transparent)] text-[var(--color-success-green)]" : "bg-[var(--color-surface-container)] text-[var(--color-on-surface-variant)]"}`}>
                    {p.is_published ? "Publié" : "Brouillon"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-3 justify-end">
                    <Link href={`/admin/produits/${p.id}`} className="text-xs font-semibold text-[var(--color-primary)] hover:underline">
                      Modifier
                    </Link>
                    <button
                      onClick={() => handleDelete(p.id, p.name)}
                      disabled={isPending}
                      className="text-xs font-semibold text-[var(--color-error)] hover:underline disabled:opacity-50"
                    >
                      Supprimer
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
