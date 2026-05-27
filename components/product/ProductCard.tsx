"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/cart/CartContext";
import { useWishlist } from "@/components/wishlist/WishlistContext";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  showBadge?: boolean;
  className?: string;
  priority?: boolean;
}

export default function ProductCard({ product, showBadge = true, className = "", priority = false }: ProductCardProps) {
  const { add } = useCart();
  const { toggle, has } = useWishlist();
  const inWishlist = has(product.id);

  const discount =
    product.sale_price && product.price > product.sale_price
      ? Math.round(((product.price - product.sale_price) / product.price) * 100)
      : null;

  const displayPrice = product.sale_price ?? product.price;

  return (
    <article className={`bg-white rounded-xl border border-[var(--color-border-subtle)] p-2 group transition-all hover:shadow-xl card-shadow flex flex-col ${className}`}>
      {/* Clickable area: image + name + price */}
      <Link href={`/produit/${product.slug}`} className="flex flex-col flex-1 min-w-0">
        {/* Image */}
        <div className="relative mb-2 aspect-square overflow-hidden rounded-lg bg-[var(--color-background-soft)]">
          {showBadge && discount && (
            <span
              className="absolute top-2 left-2 z-10 text-white font-bold px-2 py-1 rounded text-[10px] uppercase tracking-wide"
              style={{ backgroundColor: "var(--color-tertiary-container)" }}
            >
              -{discount}%
            </span>
          )}

          {product.images[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              priority={priority}
              className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[var(--color-outline)] text-xs">
              Image à venir
            </div>
          )}
        </div>

        {/* Name + price */}
        <h3 className="font-bold text-[var(--color-on-surface)] mb-1 line-clamp-2 text-[11px] leading-snug flex-1">
          {product.name}
        </h3>
        <div className="flex items-baseline gap-1.5 mb-2">
          <span className="text-[var(--color-primary)] font-bold text-[11px]">
            {displayPrice.toFixed(2)} د.م.
          </span>
          {product.sale_price && (
            <span className="text-xs text-[var(--color-on-surface-variant)] line-through">
              {product.price.toFixed(2)} د.م.
            </span>
          )}
        </div>
      </Link>

      {/* Actions — outside the link */}
      <div className="flex gap-1.5 mt-auto">
        <button
          onClick={() => add(product)}
          className="flex-1 py-1 bg-[var(--color-primary)] text-white rounded-md font-bold flex items-center justify-center gap-1 hover:opacity-90 transition-opacity text-[11px]"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          Panier
        </button>
        <button
          onClick={() => toggle(product)}
          aria-label={inWishlist ? "Retirer des favoris" : "Ajouter aux favoris"}
          className="w-8 h-8 flex items-center justify-center rounded-md border border-[var(--color-border-subtle)] hover:bg-[var(--color-background-soft)] transition-colors shrink-0"
          style={{ color: inWishlist ? "var(--color-tertiary-container)" : "var(--color-on-surface-variant)" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill={inWishlist ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>
    </article>
  );
}
