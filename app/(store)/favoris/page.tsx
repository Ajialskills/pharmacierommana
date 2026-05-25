"use client";

import Link from "next/link";
import { useWishlist } from "@/components/wishlist/WishlistContext";

export default function FavorisPage() {
  const { ids, count } = useWishlist();

  return (
    <div style={{ maxWidth: "var(--spacing-max-width)" }} className="mx-auto px-[var(--spacing-lg)] py-10">
      <h1 className="text-xl font-bold text-[var(--color-on-surface)] mb-2">Mes favoris</h1>
      <p className="text-sm text-[var(--color-on-surface-variant)] mb-8">{count} produit{count !== 1 ? "s" : ""} sauvegardé{count !== 1 ? "s" : ""}</p>

      {count === 0 ? (
        <div className="text-center py-24">
          <svg className="mx-auto mb-6 opacity-20" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          <p className="text-[var(--color-on-surface-variant)] text-sm mb-6">Vous n&apos;avez pas encore de favoris.</p>
          <Link href="/boutique" className="bg-[var(--color-primary)] text-white px-6 py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity">
            Découvrir la boutique
          </Link>
        </div>
      ) : (
        <div className="bg-white border border-[var(--color-border-subtle)] rounded-2xl p-6">
          <p className="text-sm text-[var(--color-on-surface-variant)]">
            {ids.length} ID{ids.length > 1 ? "s" : ""} sauvegardé{ids.length > 1 ? "s" : ""}. Les favoris sont conservés en mémoire locale — connectez-vous pour les synchroniser entre appareils.
          </p>
        </div>
      )}
    </div>
  );
}
