import { notFound } from "next/navigation";
import Link from "next/link";
import { getOrderById } from "@/app/actions/order";
import OrderStatusSelect from "./OrderStatusSelect";

interface Props {
  params: Promise<{ id: string }>;
}

const PAYMENT_LABELS: Record<string, string> = {
  cod: "Paiement à la livraison",
  cmi: "Carte bancaire (CMI)",
};

export default async function CommandeDetailPage({ params }: Props) {
  const { id } = await params;
  const order = await getOrderById(id);
  if (!order) notFound();

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/commandes" className="text-sm text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)]">
          ← Retour
        </Link>
        <div>
          <h1 className="text-xl font-bold text-[var(--color-on-surface)] font-mono">{order.order_number}</h1>
          <p className="text-xs text-[var(--color-on-surface-variant)] mt-0.5">{new Date(order.created_at).toLocaleString("fr-MA")}</p>
        </div>
      </div>

      {/* Status */}
      <section className="bg-white border border-[var(--color-border-subtle)] rounded-2xl p-6">
        <h2 className="font-bold text-[var(--color-on-surface)] mb-4">Statut de la commande</h2>
        <OrderStatusSelect orderId={order.id} currentStatus={order.status} />
      </section>

      {/* Customer */}
      <section className="bg-white border border-[var(--color-border-subtle)] rounded-2xl p-6">
        <h2 className="font-bold text-[var(--color-on-surface)] mb-4">Client</h2>
        <div className="space-y-1 text-sm text-[var(--color-on-surface-variant)]">
          <p className="font-semibold text-[var(--color-on-surface)]">{order.customer_name}</p>
          {order.customer_email && <p>{order.customer_email}</p>}
          <p>{order.customer_phone}</p>
          <p className="pt-2">{order.shipping_address}</p>
          <p>{order.shipping_city}</p>
        </div>
      </section>

      {/* Items */}
      <section className="bg-white border border-[var(--color-border-subtle)] rounded-2xl p-6">
        <h2 className="font-bold text-[var(--color-on-surface)] mb-4">Articles commandés</h2>
        <div className="space-y-3">
          {order.order_items?.map((item: { id: string; product_name: string; quantity: number; unit_price: number }) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span className="text-[var(--color-on-surface)]">{item.product_name} <span className="text-[var(--color-on-surface-variant)]">×{item.quantity}</span></span>
              <span className="font-semibold">{(item.unit_price * item.quantity).toFixed(2)} د.م.</span>
            </div>
          ))}
        </div>
        <div className="border-t border-[var(--color-border-subtle)] mt-4 pt-4 space-y-1 text-sm">
          <div className="flex justify-between text-[var(--color-on-surface-variant)]">
            <span>Sous-total</span>
            <span>{Number(order.subtotal).toFixed(2)} د.م.</span>
          </div>
          <div className="flex justify-between text-[var(--color-on-surface-variant)]">
            <span>Livraison</span>
            <span>{Number(order.shipping_cost) === 0 ? "Gratuite" : `${Number(order.shipping_cost).toFixed(2)} د.م.`}</span>
          </div>
          <div className="flex justify-between font-bold text-[var(--color-on-surface)] text-base pt-1">
            <span>Total</span>
            <span className="text-[var(--color-primary)]">{Number(order.total).toFixed(2)} د.م.</span>
          </div>
        </div>
      </section>

      {/* Payment */}
      <section className="bg-white border border-[var(--color-border-subtle)] rounded-2xl p-6">
        <h2 className="font-bold text-[var(--color-on-surface)] mb-3">Paiement</h2>
        <p className="text-sm text-[var(--color-on-surface-variant)]">{PAYMENT_LABELS[order.payment_method] ?? order.payment_method}</p>
        {order.notes && (
          <div className="mt-3 pt-3 border-t border-[var(--color-border-subtle)]">
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-on-surface-variant)] mb-1">Notes</p>
            <p className="text-sm text-[var(--color-on-surface)]">{order.notes}</p>
          </div>
        )}
      </section>
    </div>
  );
}
