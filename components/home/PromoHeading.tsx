"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export function PromoMarquee() {
  const { tr } = useLanguage();
  return (
    <div className="overflow-hidden bg-[#035F63] py-2.5 select-none">
      <div className="flex whitespace-nowrap animate-marquee">
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i} className="inline-flex items-center gap-6 px-10 text-white text-sm font-semibold tracking-wide">
            {tr("home.promotions_marquee_a")}
            <span className="opacity-60">✦</span>
            {tr("home.promotions_marquee_b")}
            <span className="opacity-60">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function PromoSectionHeading() {
  const { tr } = useLanguage();
  return (
    <div className="flex flex-col items-center text-center mb-12">
      <h2
        id="promos-heading"
        style={{ fontSize: "var(--text-headline-lg)", fontWeight: "var(--text-headline-lg--font-weight)" }}
        className="text-[var(--color-on-background)]"
      >
        {tr("home.promotions")}
      </h2>
      <p className="text-[var(--color-on-surface-variant)] text-sm mt-1">
        {tr("home.promotions_sub")}
      </p>
    </div>
  );
}

export function PromoBleedLabel() {
  const { tr } = useLanguage();
  return (
    <div className="absolute bottom-6 left-6 text-white">
      <span className="text-xs font-semibold uppercase tracking-widest opacity-80">{tr("home.promotions")}</span>
      <p className="text-2xl font-bold mt-1">{tr("home.promotions_up_to")}</p>
    </div>
  );
}
