"use client";

import Link from "next/link";
import { useCart } from "./CartContext";

export default function CartDrawer() {
  const { items, remove, update, total, count, isOpen, closeCart } = useCart();

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/30 z-40 backdrop-blur-sm"
        onClick={closeCart}
        aria-hidden="true"
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Panier"
        className="fixed right-0 top-0 h-full w-full max-w-sm bg-white z-50 flex flex-col shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--color-border-subtle)]">
          <h2 className="font-bold text-[var(--color-on-surface)]">
            Panier <span className="text-[var(--color-primary)]">({count})</span>
          </h2>
          <button
            onClick={closeCart}
            aria-label="Fermer le panier"
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[var(--color-background-soft)] transition-colors text-[var(--color-on-surface-variant)]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 && (
            <div className="text-center text-[var(--color-on-surface-variant)] text-sm py-16">
              <svg className="mx-auto mb-4 opacity-30" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              <p>Votre panier est vide</p>
            </div>
          )}
          {items.map((item) => {
            const price = item.product.sale_price ?? item.product.price;
            const image = item.product.images?.[0];
            return (
              <div key={item.product.id} className="flex gap-3">
                <div className="w-16 h-16 rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-background-soft)] flex-shrink-0 overflow-hidden">
                  {image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={image} alt={item.product.name} className="w-full h-full object-contain p-1" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[var(--color-on-surface-variant)] opacity-30">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[var(--color-on-surface)] line-clamp-2 leading-snug">{item.product.name}</p>
                  <p className="text-sm font-bold text-[var(--color-primary)] mt-1">{price} د.م.</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => update(item.product.id, item.quantity - 1)}
                      className="w-6 h-6 rounded-full border border-[var(--color-border-subtle)] flex items-center justify-center text-sm hover:bg-[var(--color-background-soft)] transition-colors"
                    >−</button>
                    <span className="text-sm font-semibold w-4 text-center">{item.quantity}</span>
                    <button
                      onClick={() => update(item.product.id, item.quantity + 1)}
                      className="w-6 h-6 rounded-full border border-[var(--color-border-subtle)] flex items-center justify-center text-sm hover:bg-[var(--color-background-soft)] transition-colors"
                    >+</button>
                    <button
                      onClick={() => remove(item.product.id)}
                      className="ml-auto text-xs text-[var(--color-error)] hover:underline"
                    >Retirer</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-[var(--color-border-subtle)] px-6 py-5 space-y-4">
            <div className="flex justify-between text-sm font-bold text-[var(--color-on-surface)]">
              <span>Total</span>
              <span className="text-[var(--color-primary)]">{total.toFixed(2)} د.م.</span>
            </div>
            <Link
              href="/commande"
              onClick={closeCart}
              className="block w-full bg-[var(--color-primary)] text-white text-center py-3.5 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity"
            >
              Commander
            </Link>
            <Link
              href="/panier"
              onClick={closeCart}
              className="block w-full text-center py-3 rounded-xl font-semibold text-sm border border-[var(--color-border-subtle)] hover:bg-[var(--color-background-soft)] transition-colors text-[var(--color-on-surface)]"
            >
              Voir le panier
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
