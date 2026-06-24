"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import PageHero from "@/components/layout/PageHero";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ConnexionPage() {
  const router = useRouter();
  const { tr } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    if (authError) {
      setError("Email ou mot de passe incorrect.");
      setLoading(false);
    } else {
      setLoading(false);
      router.push("/mon-compte");
      router.refresh();
    }
  }

  const inputCls = "w-full border border-[var(--color-border-subtle)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]";

  return (
    <>
      <PageHero
        title={tr("auth.login")}
        subtitle="Accédez à votre compte Pharmacie Rommana"
        crumbs={[{ label: tr("auth.login") }]}
      />
      <div style={{ maxWidth: "var(--spacing-max-width)" }} className="mx-auto px-[var(--spacing-lg)] py-10">
      <div className="max-w-[384px] mx-auto">
        <p className="text-sm text-center text-[var(--color-on-surface-variant)] mb-8">
          {tr("auth.no_account")}{" "}
          <Link href="/inscription" className="text-[var(--color-primary)] font-semibold hover:underline">{tr("auth.register")}</Link>
        </p>

        <form onSubmit={handleSubmit} className="bg-white border border-[var(--color-border-subtle)] rounded-2xl p-8 space-y-5">
          {error && (
            <p className="text-sm text-[var(--color-error)] bg-[var(--color-error-container)] px-4 py-3 rounded-xl">{error}</p>
          )}
          <div>
            <label htmlFor="login-email" className="block text-xs font-semibold text-[var(--color-on-surface-variant)] mb-1.5 uppercase tracking-wide">{tr("auth.email")}</label>
            <input id="login-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} autoComplete="email" />
          </div>
          <div>
            <label htmlFor="login-password" className="block text-xs font-semibold text-[var(--color-on-surface-variant)] mb-1.5 uppercase tracking-wide">{tr("auth.password")}</label>
            <input id="login-password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className={inputCls} autoComplete="current-password" />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[var(--color-primary)] text-white py-3.5 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-60"
          >
            {loading ? "Connexion…" : tr("auth.sign_in")}
          </button>
        </form>
      </div>
      </div>
    </>
  );
}
