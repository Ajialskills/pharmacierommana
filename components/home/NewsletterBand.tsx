"use client";

import { useState } from "react";

export default function NewsletterBand() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: wire to Resend or a newsletter provider when credentials are available
    setSubmitted(true);
  }

  return (
    <section
      aria-labelledby="newsletter-heading"
      className="py-[var(--spacing-xl)] bg-[var(--color-primary)]"
    >
      <div
        style={{ maxWidth: "var(--spacing-max-width)" }}
        className="mx-auto px-[var(--spacing-lg)] flex flex-col md:flex-row items-center gap-16 text-white"
      >
        <div className="text-left shrink-0">
          <h2
            id="newsletter-heading"
            style={{ fontSize: "var(--text-headline-md)", fontWeight: "var(--text-headline-md--font-weight)" }}
            className="mb-1"
          >
            Restez informé de nos offres
          </h2>
          <p className="opacity-80 text-sm">
            Inscrivez-vous pour recevoir les dernières nouveautés santé.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex w-full gap-3"
          aria-label="Formulaire newsletter"
        >
          <label htmlFor="newsletter-email" className="sr-only">Adresse email</label>
          <input
            id="newsletter-email"
            type="email"
            name="email"
            placeholder="Votre email"
            required
            disabled={submitted}
            className="flex-1 min-w-0 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/60 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/40 text-sm disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={submitted}
            title={submitted ? "Bientôt disponible" : undefined}
            className="bg-white text-[var(--color-primary)] px-6 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity text-sm whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitted ? "Bientôt disponible" : "S’inscrire"}
          </button>
        </form>
      </div>
    </section>
  );
}
