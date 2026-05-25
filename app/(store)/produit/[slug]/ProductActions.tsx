"use client";

import { useState } from "react";
import { useCart } from "@/components/cart/CartContext";
import { useWishlist } from "@/components/wishlist/WishlistContext";
import type { Product } from "@/types";

interface Props {
  product: Product;
}

export default function ProductActions({ product }: Props) {
  const { add } = useCart();
  const { toggle, has } = useWishlist();
  const [qty, setQty] = useState(1);
  const inWishlist = has(product.id);
  const outOfStock = product.stock == null || product.stock <= 0;

  return (
    <div className="space-y-4">
      {/* Qty selector */}
      {!outOfStock && (
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-[var(--color-on-surface-variant)]">Qté :</span>
          <div className="flex items-center border border-[var(--color-border-subtle)] rounded-xl overflow-hidden">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="px-4 py-2.5 text-[var(--color-on-surface-variant)] hover:bg-[var(--color-background-soft)] transition-colors"
            >−</button>
            <span className="px-4 py-2.5 text-sm font-bold text-[var(--color-on-surface)]">{qty}</span>
            <button
              onClick={() => setQty((q) => Math.min(product.stock ?? q, q + 1))}
              className="px-4 py-2.5 text-[var(--color-on-surface-variant)] hover:bg-[var(--color-background-soft)] transition-colors"
            >+</button>
          </div>
          <span className="text-xs text-[var(--color-on-surface-variant)]">{product.stock} en stock</span>
        </div>
      )}

      {/* CTA buttons */}
      <div className="flex gap-3">
        <button
          disabled={outOfStock}
          onClick={() => add(product, qty)}
          className="flex-1 bg-[var(--color-primary)] text-white py-3.5 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          {outOfStock ? "Rupture de stock" : "Ajouter au panier"}
        </button>
        <button
          onClick={() => toggle(product)}
          aria-label={inWishlist ? "Retirer des favoris" : "Ajouter aux favoris"}
          className="w-12 h-12 rounded-xl border-2 flex items-center justify-center transition-colors"
          style={{
            borderColor: inWishlist ? "var(--color-tertiary-container)" : "var(--color-border-subtle)",
            color: inWishlist ? "var(--color-tertiary-container)" : "var(--color-on-surface-variant)",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill={inWishlist ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      {/* WhatsApp advice */}
      <a
        href="https://wa.me/212641337443"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-sm text-[var(--color-secondary)] font-semibold hover:underline"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
        Conseil pharmacien via WhatsApp
      </a>
    </div>
  );
}
