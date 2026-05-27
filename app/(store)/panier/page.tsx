"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/components/cart/CartContext";
import PageHero from "@/components/layout/PageHero";

export default function PanierPage() {
  const { items, remove, update, total, count } = useCart();

  if (items.length === 0) {
    return (
      <div style={{ maxWidth: "var(--spacing-max-width)" }} className="mx-auto px-[var(--spacing-lg)] py-20 text-center">
        <svg className="mx-auto mb-6 opacity-20" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
        <h1 className="text-xl font-bold text-[var(--color-on-surface)] mb-2">Votre panier est vide</h1>
        <p className="text-[var(--color-on-surface-variant)] text-sm mb-8">Découvrez notre boutique pour trouver vos produits.</p>
        <Link href="/boutique" className="bg-[var(--color-primary)] text-white px-6 py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity">
          Aller à la boutique
        </Link>
      </div>
    );
  }

  const FREE_DELIVERY_THRESHOLD = 400;
  const remaining = Math.max(0, FREE_DELIVERY_THRESHOLD - total);

  return (
    <>
      <PageHero
        title="Mon Panier"
        subtitle={`${count} article${count > 1 ? "s" : ""}`}
        crumbs={[{ label: "Panier" }]}
      />
      <div style={{ maxWidth: "var(--spacing-max-width)" }} className="mx-auto px-[var(--spacing-lg)] py-10">

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {remaining > 0 && (
            <div className="bg-[color-mix(in_srgb,var(--color-primary)_8%,transparent)] border border-[color-mix(in_srgb,var(--color-primary)_20%,transparent)] rounded-xl px-4 py-3 text-sm text-[var(--color-primary)]">
              Plus que <strong>{remaining.toFixed(2)} د.م.</strong> pour la livraison gratuite sur Tétouan
            </div>
          )}

          {items.map((item) => {
            const price = item.product.sale_price ?? item.product.price;
            const image = item.product.images?.[0];
            return (
              <div key={item.product.id} className="bg-white border border-[var(--color-border-subtle)] rounded-2xl p-4 flex gap-4">
                <div className="w-20 h-20 rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-background-soft)] flex-shrink-0 overflow-hidden">
                  {image ? (
                    <Image src={image} alt={item.product.name} width={80} height={80} className="w-full h-full object-contain p-1" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center opacity-20">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-[var(--color-on-surface)] text-sm line-clamp-2">{item.product.name}</p>
                  <p className="text-[var(--color-primary)] font-bold text-sm mt-1">{price.toFixed(2)} د.م.</p>
                  <div className="flex items-center gap-3 mt-3">
                    <div className="flex items-center border border-[var(--color-border-subtle)] rounded-lg overflow-hidden">
                      <button onClick={() => update(item.product.id, item.quantity - 1)} className="px-3 py-1.5 hover:bg-[var(--color-background-soft)] text-sm transition-colors">−</button>
                      <span className="px-3 py-1.5 text-sm font-bold">{item.quantity}</span>
                      <button onClick={() => update(item.product.id, item.quantity + 1)} className="px-3 py-1.5 hover:bg-[var(--color-background-soft)] text-sm transition-colors">+</button>
                    </div>
                    <p className="text-sm font-bold text-[var(--color-on-surface)]">{(price * item.quantity).toFixed(2)} د.م.</p>
                    <button onClick={() => remove(item.product.id)} className="ml-auto text-xs text-[var(--color-error)] hover:underline">Retirer</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-[var(--color-border-subtle)] rounded-2xl p-6 sticky top-28 space-y-4">
            <h2 className="font-bold text-[var(--color-on-surface)]">Récapitulatif</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-[var(--color-on-surface-variant)]">
                <span>Sous-total</span>
                <span>{total.toFixed(2)} د.م.</span>
              </div>
              <div className="flex justify-between text-[var(--color-on-surface-variant)]">
                <span>Livraison</span>
                <span>
                  {total >= FREE_DELIVERY_THRESHOLD
                    ? <span className="text-[var(--color-success-green)] font-semibold">Gratuite</span>
                    : "Calculée à la commande"}
                </span>
              </div>
            </div>
            <div className="border-t border-[var(--color-border-subtle)] pt-4 flex justify-between font-bold text-[var(--color-on-surface)]">
              <span>Total</span>
              <span className="text-[var(--color-primary)]">{total.toFixed(2)} د.م.</span>
            </div>
            <Link
              href="/commande"
              className="block w-full bg-[var(--color-primary)] text-white text-center py-3.5 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity"
            >
              Commander
            </Link>
            <Link href="/boutique" className="block w-full text-center text-sm text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)] transition-colors">
              Continuer les achats
            </Link>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
