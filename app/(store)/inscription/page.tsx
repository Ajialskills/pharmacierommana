"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import PageHero from "@/components/layout/PageHero";
import { useLanguage } from "@/contexts/LanguageContext";

export default function InscriptionPage() {
  const router = useRouter();
  const { tr } = useLanguage();
  const [form, setForm] = useState({ email: "", password: "", confirm: "", full_name: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  function set(key: keyof typeof form, val: string) {
    setForm((f) => ({ ...f, [key]: val }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.password !== form.confirm) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
    if (form.password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { error: authError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: { full_name: form.full_name },
      },
    });
    if (authError) {
      setError(authError.message);
      setLoading(false);
    } else {
      setSuccess(true);
    }
  }

  const inputCls = "w-full border border-[var(--color-border-subtle)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]";
  const labelCls = "block text-xs font-semibold text-[var(--color-on-surface-variant)] mb-1.5 uppercase tracking-wide";

  if (success) {
    return (
      <div style={{ maxWidth: "var(--spacing-max-width)" }} className="mx-auto px-[var(--spacing-lg)] py-16">
        <div className="max-w-[384px] mx-auto text-center">
          <div className="w-16 h-16 rounded-full bg-[color-mix(in_srgb,var(--color-success-green)_15%,transparent)] flex items-center justify-center mx-auto mb-6">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: "var(--color-success-green)" }}><polyline points="20 6 9 17 4 12" /></svg>
          </div>
          <h2 className="text-xl font-bold text-[var(--color-on-surface)] mb-2">Vérifiez votre email</h2>
          <p className="text-sm text-[var(--color-on-surface-variant)] mb-6">
            Un lien de confirmation a été envoyé à <strong>{form.email}</strong>. Cliquez dessus pour activer votre compte.
          </p>
          <Link href="/connexion" className="text-[var(--color-primary)] font-semibold text-sm hover:underline">
            {tr("auth.sign_in")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <PageHero
        title={tr("auth.create_account")}
        subtitle="Rejoignez Pharmacie Rommana pour suivre vos commandes et gérer vos favoris"
        crumbs={[{ label: tr("auth.register") }]}
      />
      <div style={{ maxWidth: "var(--spacing-max-width)" }} className="mx-auto px-[var(--spacing-lg)] py-10">
      <div className="max-w-[384px] mx-auto">
        <p className="text-sm text-center text-[var(--color-on-surface-variant)] mb-8">
          {tr("auth.have_account")}{" "}
          <Link href="/connexion" className="text-[var(--color-primary)] font-semibold hover:underline">{tr("auth.sign_in")}</Link>
        </p>

        <form onSubmit={handleSubmit} className="bg-white border border-[var(--color-border-subtle)] rounded-2xl p-8 space-y-5">
          {error && (
            <p className="text-sm text-[var(--color-error)] bg-[var(--color-error-container)] px-4 py-3 rounded-xl">{error}</p>
          )}
          <div>
            <label htmlFor="reg-name" className={labelCls}>{tr("auth.full_name")}</label>
            <input id="reg-name" required value={form.full_name} onChange={(e) => set("full_name", e.target.value)} className={inputCls} autoComplete="name" />
          </div>
          <div>
            <label htmlFor="reg-email" className={labelCls}>{tr("auth.email")}</label>
            <input id="reg-email" type="email" required value={form.email} onChange={(e) => set("email", e.target.value)} className={inputCls} autoComplete="email" />
          </div>
          <div>
            <label htmlFor="reg-password" className={labelCls}>{tr("auth.password")}</label>
            <input id="reg-password" type="password" required value={form.password} onChange={(e) => set("password", e.target.value)} className={inputCls} autoComplete="new-password" />
          </div>
          <div>
            <label htmlFor="reg-confirm" className={labelCls}>{tr("auth.confirm_password")}</label>
            <input id="reg-confirm" type="password" required value={form.confirm} onChange={(e) => set("confirm", e.target.value)} className={inputCls} autoComplete="new-password" />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[var(--color-primary)] text-white py-3.5 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-60"
          >
            {loading ? "Création…" : tr("auth.create_account")}
          </button>
        </form>
      </div>
      </div>
    </>
  );
}
