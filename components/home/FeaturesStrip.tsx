"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function FeaturesStrip() {
  const { tr } = useLanguage();

  return (
    <section aria-label={tr("features.delivery_title")} className="pb-6 -mt-6 bg-[var(--color-surface-container-low)]">
      <div
        style={{ maxWidth: "var(--spacing-max-width)" }}
        className="mx-auto px-[var(--spacing-lg)] grid md:grid-cols-2 gap-[var(--spacing-gutter)]"
      >
        {/* Livraison Gratuite */}
        <div className="relative overflow-hidden h-28 rounded-2xl flex items-center justify-between gap-8 px-10 bg-[var(--color-secondary)]">
          <div className="absolute inset-0 bg-black/10 pointer-events-none" />
          <div className="relative z-10 text-white">
            <span
              style={{ fontSize: "var(--text-label-caps)", letterSpacing: "var(--text-label-caps--letter-spacing)" }}
              className="block font-semibold uppercase opacity-70 mb-1"
            >
              {tr("features.delivery_label")}
            </span>
            <h3
              style={{ fontSize: "var(--text-headline-lg)", lineHeight: "var(--text-headline-lg--line-height)", fontWeight: "var(--text-headline-lg--font-weight)" }}
            >
              {tr("features.delivery_title")}
            </h3>
          </div>
          <span className="relative z-10 inline-block bg-white/15 text-white px-4 py-2 rounded-lg font-semibold text-sm flex-shrink-0 text-center leading-snug">
            {tr("features.delivery_badge")}<br />
            <span className="opacity-80 text-xs font-normal">{tr("features.delivery_sub")}</span>
          </span>
        </div>

        {/* Paiement à la livraison */}
        <div className="relative overflow-hidden h-28 rounded-2xl flex items-center justify-between gap-8 px-10 bg-[var(--color-primary)]">
          <div className="absolute inset-0 bg-black/10 pointer-events-none" />
          <div className="relative z-10 text-white">
            <span
              style={{ fontSize: "var(--text-label-caps)", letterSpacing: "var(--text-label-caps--letter-spacing)" }}
              className="block font-semibold uppercase opacity-70 mb-1"
            >
              {tr("features.payment_label")}
            </span>
            <h3
              style={{ fontSize: "var(--text-headline-lg)", lineHeight: "var(--text-headline-lg--line-height)", fontWeight: "var(--text-headline-lg--font-weight)" }}
            >
              {tr("features.payment_title")}
            </h3>
          </div>
          <span className="relative z-10 inline-block bg-white/15 text-white px-4 py-2 rounded-lg font-semibold text-sm flex-shrink-0 text-center leading-snug">
            {tr("features.payment_badge")}<br />
            <span className="opacity-80 text-xs font-normal">{tr("features.payment_sub")}</span>
          </span>
        </div>
      </div>
    </section>
  );
}
