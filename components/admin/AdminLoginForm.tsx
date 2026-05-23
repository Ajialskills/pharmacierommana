"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError("Email ou mot de passe incorrect.");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-[var(--color-on-surface)] mb-1.5"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-[var(--color-border-subtle)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
          placeholder="admin@pharmacierommana.ma"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-[var(--color-on-surface)] mb-1.5"
        >
          Mot de passe
        </label>
        <input
          id="password"
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-[var(--color-border-subtle)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
          placeholder="••••••••"
        />
      </div>

      {error && (
        <p role="alert" className="text-sm text-[var(--color-error)] bg-[var(--color-error-container)] px-4 py-3 rounded-xl">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[var(--color-primary)] text-white py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-60"
      >
        {loading ? "Connexion…" : "Se connecter"}
      </button>
    </form>
  );
}
