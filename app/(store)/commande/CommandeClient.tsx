"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/cart/CartContext";
import { createOrder } from "@/app/actions/order";

const CITIES = ["Tétouan", "Martil", "Fnideq", "M'diq", "Chefchaouen", "Autre"];
const FREE_DELIVERY_TETOUAN = 400;
const FREE_DELIVERY_OTHER = 800;
const DELIVERY_FEE_TETOUAN = 30;
const DELIVERY_FEE_OTHER = 50;

export default function CommandeClient() {
  const router = useRouter();
  const { items, total, clear } = useCart();
  const [step, setStep] = useState<"address" | "payment" | "confirm">("address");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "cmi">("cod");

  const [form, setForm] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    shipping_address: "",
    shipping_city: "Tétouan",
    notes: "",
  });

  if (items.length === 0) {
    return (
      <div className="text-center py-24">
        <p className="text-[var(--color-on-surface-variant)] text-sm mb-4">Votre panier est vide.</p>
        <a href="/boutique" className="text-[var(--color-primary)] font-semibold hover:underline">← Retourner à la boutique</a>
      </div>
    );
  }

  const isTetouan = form.shipping_city === "Tétouan";
  const freeThreshold = isTetouan ? FREE_DELIVERY_TETOUAN : FREE_DELIVERY_OTHER;
  const shippingCost = total >= freeThreshold ? 0 : (isTetouan ? DELIVERY_FEE_TETOUAN : DELIVERY_FEE_OTHER);
  const orderTotal = total + shippingCost;

  function set(key: keyof typeof form, val: string) {
    setForm((f) => ({ ...f, [key]: val }));
  }

  function addressComplete() {
    return form.customer_name && form.customer_email && form.customer_phone && form.shipping_address && form.shipping_city;
  }

  async function handleSubmit() {
    setSubmitting(true);
    setError(null);
    try {
      const { order_number } = await createOrder({
        customer_name: form.customer_name,
        customer_email: form.customer_email,
        customer_phone: form.customer_phone,
        shipping_address: form.shipping_address,
        shipping_city: form.shipping_city,
        payment_method: paymentMethod,
        notes: form.notes,
        items: items.map((i) => ({
          product_id: i.product.id,
          quantity: i.quantity,
          unit_price: i.product.sale_price ?? i.product.price,
          product_name: i.product.name,
        })),
        subtotal: total,
        shipping_cost: shippingCost,
        total_amount: orderTotal,
      });
      clear();
      router.push(`/commande/succes?order=${order_number}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors de la commande");
      setSubmitting(false);
    }
  }

  const inputCls = "w-full border border-[var(--color-border-subtle)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] bg-white";
  const labelCls = "block text-xs font-semibold text-[var(--color-on-surface-variant)] mb-1.5 uppercase tracking-wide";

  return (
    <div className="grid lg:grid-cols-5 gap-8">
      {/* Left — form */}
      <div className="lg:col-span-3 space-y-6">
        {error && (
          <p className="text-sm text-[var(--color-error)] bg-[var(--color-error-container)] px-4 py-3 rounded-xl">{error}</p>
        )}

        {/* Address */}
        <section className="bg-white border border-[var(--color-border-subtle)] rounded-2xl p-6 space-y-5">
          <h2 className="font-bold text-[var(--color-on-surface)]">Coordonnées & livraison</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className={labelCls}>Nom complet *</label>
              <input className={inputCls} value={form.customer_name} onChange={(e) => set("customer_name", e.target.value)} required />
            </div>
            <div>
              <label className={labelCls}>Email</label>
              <input type="email" className={inputCls} value={form.customer_email} onChange={(e) => set("customer_email", e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Téléphone *</label>
              <input type="tel" className={inputCls} value={form.customer_phone} onChange={(e) => set("customer_phone", e.target.value)} required />
            </div>
            <div className="col-span-2">
              <label className={labelCls}>Adresse de livraison *</label>
              <input className={inputCls} value={form.shipping_address} onChange={(e) => set("shipping_address", e.target.value)} required />
            </div>
            <div>
              <label className={labelCls}>Ville *</label>
              <select className={inputCls} value={form.shipping_city} onChange={(e) => set("shipping_city", e.target.value)}>
                {CITIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>Notes (optionnel)</label>
              <input className={inputCls} value={form.notes} onChange={(e) => set("notes", e.target.value)} placeholder="Instructions particulières..." />
            </div>
          </div>
        </section>

        {/* Payment */}
        <section className="bg-white border border-[var(--color-border-subtle)] rounded-2xl p-6 space-y-4">
          <h2 className="font-bold text-[var(--color-on-surface)]">Mode de paiement</h2>
          {[
            { value: "cod", label: "Paiement à la livraison", desc: "Payez en cash lors de la réception" },
            { value: "cmi", label: "Carte bancaire (CMI)", desc: "Paiement sécurisé par carte" },
          ].map((opt) => (
            <label
              key={opt.value}
              className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors ${paymentMethod === opt.value ? "border-[var(--color-primary)] bg-[color-mix(in_srgb,var(--color-primary)_5%,transparent)]" : "border-[var(--color-border-subtle)] hover:border-[var(--color-primary)]"}`}
            >
              <input
                type="radio"
                name="payment"
                value={opt.value}
                checked={paymentMethod === opt.value as "cod" | "cmi"}
                onChange={() => setPaymentMethod(opt.value as "cod" | "cmi")}
                className="mt-0.5 accent-[var(--color-primary)]"
              />
              <div>
                <p className="font-semibold text-sm text-[var(--color-on-surface)]">{opt.label}</p>
                <p className="text-xs text-[var(--color-on-surface-variant)] mt-0.5">{opt.desc}</p>
              </div>
            </label>
          ))}
        </section>

        <button
          onClick={handleSubmit}
          disabled={submitting || !addressComplete()}
          className="w-full bg-[var(--color-primary)] text-white py-4 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? "Traitement en cours…" : "Confirmer la commande"}
        </button>
      </div>

      {/* Right — order summary */}
      <div className="lg:col-span-2">
        <div className="bg-white border border-[var(--color-border-subtle)] rounded-2xl p-6 sticky top-28 space-y-4">
          <h2 className="font-bold text-[var(--color-on-surface)]">Votre commande</h2>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {items.map((item) => (
              <div key={item.product.id} className="flex justify-between text-sm">
                <span className="text-[var(--color-on-surface)] line-clamp-1 flex-1 mr-2">{item.product.name} <span className="text-[var(--color-on-surface-variant)]">×{item.quantity}</span></span>
                <span className="font-semibold text-[var(--color-on-surface)] flex-shrink-0">
                  {((item.product.sale_price ?? item.product.price) * item.quantity).toFixed(2)} د.م.
                </span>
              </div>
            ))}
          </div>
          <div className="border-t border-[var(--color-border-subtle)] pt-4 space-y-2 text-sm">
            <div className="flex justify-between text-[var(--color-on-surface-variant)]">
              <span>Sous-total</span>
              <span>{total.toFixed(2)} د.م.</span>
            </div>
            <div className="flex justify-between text-[var(--color-on-surface-variant)]">
              <span>Livraison</span>
              <span>
                {shippingCost === 0
                  ? <span className="text-[var(--color-success-green)] font-semibold">Gratuite</span>
                  : `${shippingCost} د.م.`}
              </span>
            </div>
          </div>
          <div className="border-t border-[var(--color-border-subtle)] pt-4 flex justify-between font-bold text-[var(--color-on-surface)]">
            <span>Total</span>
            <span className="text-[var(--color-primary)] text-lg">{orderTotal.toFixed(2)} د.م.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
