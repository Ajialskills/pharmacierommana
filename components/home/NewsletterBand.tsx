"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function NewsletterBand() {
  const [submitted, setSubmitted] = useState(false);
  const { tr } = useLanguage();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
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
            {tr("footer.newsletter")}
          </h2>
          <p className="opacity-80 text-sm">
            {tr("footer.newsletter_sub")}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex w-full gap-3"
          aria-label={tr("footer.newsletter")}
        >
          <label htmlFor="newsletter-email" className="sr-only">{tr("footer.newsletter_placeholder")}</label>
          <input
            id="newsletter-email"
            type="email"
            name="email"
            placeholder={tr("footer.newsletter_placeholder")}
            required
            disabled={submitted}
            className="flex-1 min-w-0 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/60 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/40 text-sm disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={submitted}
            className="bg-white text-[var(--color-primary)] px-6 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity text-sm whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitted ? tr("footer.newsletter_done") : tr("footer.newsletter_btn")}
          </button>
        </form>
      </div>
    </section>
  );
}
