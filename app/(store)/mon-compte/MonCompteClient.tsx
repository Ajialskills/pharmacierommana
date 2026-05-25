"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import type { UserOrder } from "@/app/actions/order";

type Tab = "overview" | "orders" | "profile" | "security";

interface Props {
  user: User;
  orders: UserOrder[];
}

const TABS: { id: Tab; label: string }[] = [
  { id: "overview", label: "Aperçu" },
  { id: "orders", label: "Commandes" },
  { id: "profile", label: "Profil" },
  { id: "security", label: "Sécurité" },
];

export default function MonCompteClient({ user, orders }: Props) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("overview");
  const [loading, setLoading] = useState(false);

  async function handleSignOut() {
    setLoading(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  const initials = (user.user_metadata?.full_name as string)
    ?.split(" ")
    .map((n: string) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() ?? user.email?.[0]?.toUpperCase() ?? "?";

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white font-bold text-lg">
            {initials}
          </div>
          <div>
            <p className="font-bold text-[var(--color-on-surface)]">{(user.user_metadata?.full_name as string) ?? "Mon compte"}</p>
            <p className="text-sm text-[var(--color-on-surface-variant)]">{user.email}</p>
          </div>
        </div>
        <button
          onClick={handleSignOut}
          disabled={loading}
          className="text-sm font-semibold text-[var(--color-on-surface-variant)] hover:text-[var(--color-error)] transition-colors disabled:opacity-50"
        >
          Se déconnecter
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-[var(--color-border-subtle)] mb-8">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors ${
              tab === t.id
                ? "border-[var(--color-primary)] text-[var(--color-primary)]"
                : "border-transparent text-[var(--color-on-surface-variant)] hover:text-[var(--color-on-surface)]"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {tab === "overview" && (
        <div className="grid sm:grid-cols-2 gap-4">
          <button
            onClick={() => setTab("orders")}
            className="bg-white border border-[var(--color-border-subtle)] rounded-2xl p-6 text-left hover:shadow-md transition-shadow"
          >
            <p className="text-xs font-semibold text-[var(--color-on-surface-variant)] uppercase tracking-wide mb-1">Commandes</p>
            <p className="text-2xl font-bold text-[var(--color-primary)]">{orders.length}</p>
          </button>
          <div className="bg-white border border-[var(--color-border-subtle)] rounded-2xl p-6">
            <p className="text-xs font-semibold text-[var(--color-on-surface-variant)] uppercase tracking-wide mb-1">Membre depuis</p>
            <p className="text-sm font-semibold text-[var(--color-on-surface)]">
              {new Date(user.created_at).toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}
            </p>
          </div>
          {orders.length > 0 && (
            <div className="sm:col-span-2 bg-white border border-[var(--color-border-subtle)] rounded-2xl p-6">
              <p className="text-xs font-semibold text-[var(--color-on-surface-variant)] uppercase tracking-wide mb-4">Dernière commande</p>
              <OrderRow order={orders[0]} />
            </div>
          )}
        </div>
      )}

      {tab === "orders" && (
        <div className="space-y-3">
          {orders.length === 0 ? (
            <div className="bg-white border border-[var(--color-border-subtle)] rounded-2xl p-10 text-center">
              <p className="text-sm text-[var(--color-on-surface-variant)]">
                Vous n&apos;avez pas encore passé de commande.
              </p>
            </div>
          ) : (
            orders.map((order) => (
              <div key={order.id} className="bg-white border border-[var(--color-border-subtle)] rounded-2xl p-5">
                <OrderRow order={order} />
              </div>
            ))
          )}
        </div>
      )}

      {tab === "profile" && (
        <div className="bg-white border border-[var(--color-border-subtle)] rounded-2xl p-6 space-y-4 max-w-md">
          <h2 className="font-bold text-[var(--color-on-surface)]">Informations personnelles</h2>
          <div>
            <p className="text-xs font-semibold text-[var(--color-on-surface-variant)] uppercase tracking-wide mb-1">Email</p>
            <p className="text-sm text-[var(--color-on-surface)]">{user.email}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-[var(--color-on-surface-variant)] uppercase tracking-wide mb-1">Nom</p>
            <p className="text-sm text-[var(--color-on-surface)]">{(user.user_metadata?.full_name as string) ?? "—"}</p>
          </div>
          <a
            href="https://wa.me/212641337443"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] hover:underline"
          >
            Modifier via WhatsApp →
          </a>
        </div>
      )}

      {tab === "security" && (
        <ChangePasswordForm />
      )}
    </div>
  );
}

const STATUS_LABELS: Record<string, string> = {
  pending: "En attente",
  confirmed: "Confirmée",
  shipped: "Expédiée",
  delivered: "Livrée",
  cancelled: "Annulée",
};

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

function OrderRow({ order }: { order: UserOrder }) {
  const colorCls = STATUS_COLORS[order.status] ?? "bg-gray-100 text-gray-700";
  const label = STATUS_LABELS[order.status] ?? order.status;
  return (
    <div className="flex items-center justify-between gap-4 flex-wrap">
      <div>
        <p className="font-bold text-sm text-[var(--color-on-surface)]">{order.order_number}</p>
        <p className="text-xs text-[var(--color-on-surface-variant)] mt-0.5">
          {new Date(order.created_at).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${colorCls}`}>{label}</span>
        <p className="font-bold text-[var(--color-on-surface)] text-sm whitespace-nowrap">{order.total_amount.toFixed(2)} DH</p>
      </div>
    </div>
  );
}

function ChangePasswordForm() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirm) { setError("Les mots de passe ne correspondent pas."); return; }
    if (password.length < 8) { setError("Minimum 8 caractères."); return; }
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { error: err } = await supabase.auth.updateUser({ password });
    if (err) { setError(err.message); } else { setSuccess(true); setPassword(""); setConfirm(""); }
    setLoading(false);
  }

  const inputCls = "w-full border border-[var(--color-border-subtle)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]";

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-[var(--color-border-subtle)] rounded-2xl p-6 space-y-4 max-w-md">
      <h2 className="font-bold text-[var(--color-on-surface)]">Changer le mot de passe</h2>
      {error && <p className="text-sm text-[var(--color-error)]">{error}</p>}
      {success && <p className="text-sm text-[var(--color-success-green)]">Mot de passe mis à jour.</p>}
      <div>
        <label className="block text-xs font-semibold text-[var(--color-on-surface-variant)] mb-1.5 uppercase tracking-wide">Nouveau mot de passe</label>
        <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className={inputCls} />
      </div>
      <div>
        <label className="block text-xs font-semibold text-[var(--color-on-surface-variant)] mb-1.5 uppercase tracking-wide">Confirmer</label>
        <input type="password" required value={confirm} onChange={(e) => setConfirm(e.target.value)} className={inputCls} />
      </div>
      <button type="submit" disabled={loading} className="bg-[var(--color-primary)] text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:opacity-90 disabled:opacity-60 transition-opacity">
        {loading ? "Mise à jour…" : "Mettre à jour"}
      </button>
    </form>
  );
}
