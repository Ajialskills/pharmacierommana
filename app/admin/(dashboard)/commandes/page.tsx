import Link from "next/link";
import { getOrders } from "@/app/actions/order";

const STATUS_LABELS: Record<string, string> = {
  pending: "En attente",
  confirmed: "Confirmée",
  processing: "En préparation",
  shipped: "Expédiée",
  delivered: "Livrée",
  cancelled: "Annulée",
};

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  confirmed: "bg-blue-100 text-blue-700",
  processing: "bg-purple-100 text-purple-700",
  shipped: "bg-indigo-100 text-indigo-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

export default async function AdminCommandesPage() {
  const orders = await getOrders();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-bold text-[var(--color-on-surface)]">Commandes</h1>
          <p className="text-sm text-[var(--color-on-surface-variant)] mt-0.5">{orders.length} commande{orders.length !== 1 ? "s" : ""}</p>
        </div>
      </div>

      <div className="bg-white border border-[var(--color-border-subtle)] rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--color-border-subtle)] bg-[var(--color-background-soft)]">
              <th className="text-left px-6 py-3 text-xs font-semibold text-[var(--color-on-surface-variant)] uppercase tracking-wide">Commande</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-[var(--color-on-surface-variant)] uppercase tracking-wide">Client</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-[var(--color-on-surface-variant)] uppercase tracking-wide">Total</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-[var(--color-on-surface-variant)] uppercase tracking-wide">Statut</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-[var(--color-on-surface-variant)] uppercase tracking-wide">Date</th>
              <th className="px-6 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-border-subtle)]">
            {orders.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-[var(--color-on-surface-variant)] text-sm">
                  Aucune commande pour l&apos;instant.
                </td>
              </tr>
            )}
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-[var(--color-background-soft)]">
                <td className="px-6 py-4 font-mono text-xs font-semibold text-[var(--color-on-surface)]">{order.order_number}</td>
                <td className="px-6 py-4">
                  <p className="font-semibold text-[var(--color-on-surface)]">{order.customer_name}</p>
                  <p className="text-xs text-[var(--color-on-surface-variant)]">{order.shipping_city}</p>
                </td>
                <td className="px-6 py-4 font-bold text-[var(--color-primary)]">{Number(order.total).toFixed(2)} د.م.</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[order.status] ?? "bg-gray-100 text-gray-700"}`}>
                    {STATUS_LABELS[order.status] ?? order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-xs text-[var(--color-on-surface-variant)]">
                  {new Date(order.created_at).toLocaleDateString("fr-MA")}
                </td>
                <td className="px-6 py-4">
                  <Link href={`/admin/commandes/${order.id}`} className="text-xs font-semibold text-[var(--color-primary)] hover:underline">
                    Détail
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
