"use client";

import { useTransition, useState } from "react";
import { updateOrderStatus } from "@/app/actions/order";

const STATUSES = [
  { value: "awaiting_confirmation", label: "En vérification" },
  { value: "confirmed",   label: "Confirmée" },
  { value: "processing",  label: "En préparation" },
  { value: "shipped",     label: "Expédiée" },
  { value: "delivered",   label: "Livrée" },
  { value: "cancelled",   label: "Annulée" },
];

interface Props {
  orderId: string;
  currentStatus: string;
}

export default function OrderStatusSelect({ orderId, currentStatus }: Props) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState(currentStatus);

  function handleChange(next: string) {
    setStatus(next);
    setError(null);
    startTransition(async () => {
      try {
        await updateOrderStatus(orderId, next);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur");
        setStatus(currentStatus);
      }
    });
  }

  const isAwaitingConfirmation = status === "awaiting_confirmation";

  return (
    <div className="space-y-4">
      {/* Quick actions — shown only when order needs verification */}
      {isAwaitingConfirmation && (
        <div className="flex gap-3">
          <button
            disabled={isPending}
            onClick={() => handleChange("confirmed")}
            className="flex-1 bg-[var(--color-primary)] text-white py-2.5 px-4 rounded-xl text-sm font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            ✓ Confirmer la commande
          </button>
          <button
            disabled={isPending}
            onClick={() => handleChange("cancelled")}
            className="flex-1 border border-red-300 text-red-600 py-2.5 px-4 rounded-xl text-sm font-bold hover:bg-red-50 transition-colors disabled:opacity-50"
          >
            ✕ Annuler
          </button>
        </div>
      )}

      {/* Full status dropdown */}
      <div className="space-y-1">
        <label className="text-xs font-semibold uppercase tracking-wide text-[var(--color-on-surface-variant)]">
          Modifier le statut
        </label>
        <select
          value={status}
          onChange={(e) => handleChange(e.target.value)}
          disabled={isPending}
          className="border border-[var(--color-border-subtle)] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] disabled:opacity-60 w-full"
        >
          {STATUSES.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
      </div>

      {error && <p className="text-xs text-[var(--color-error)]">{error}</p>}
    </div>
  );
}
