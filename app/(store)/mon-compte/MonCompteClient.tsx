"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

type Tab = "overview" | "orders" | "profile" | "security";

interface Props {
  user: User;
}

const TABS: { id: Tab; label: string }[] = [
  { id: "overview", label: "Aperçu" },
  { id: "orders", label: "Commandes" },
  { id: "profile", label: "Profil" },
  { id: "security", label: "Sécurité" },
];

export default function MonCompteClient({ user }: Props) {
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
          {[
            { label: "Commandes", value: "—", href: () => setTab("orders") },
            { label: "Favoris", value: "—", href: null },
          ].map((card) => (
            <button
              key={card.label}
              onClick={card.href ?? undefined}
              className="bg-white border border-[var(--color-border-subtle)] rounded-2xl p-6 text-left hover:shadow-md transition-shadow"
            >
              <p className="text-xs font-semibold text-[var(--color-on-surface-variant)] uppercase tracking-wide mb-1">{card.label}</p>
              <p className="text-2xl font-bold text-[var(--color-primary)]">{card.value}</p>
            </button>
          ))}
        </div>
      )}

      {tab === "orders" && (
        <div className="bg-white border border-[var(--color-border-subtle)] rounded-2xl p-8 text-center">
          <p className="text-sm text-[var(--color-on-surface-variant)]">
            L&apos;historique de vos commandes apparaîtra ici une fois que vous aurez passé une commande avec ce compte.
          </p>
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
          <p className="text-xs text-[var(--color-on-surface-variant)]">Pour modifier vos informations, contactez-nous sur WhatsApp.</p>
        </div>
      )}

      {tab === "security" && (
        <ChangePasswordForm />
      )}
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
