"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function LanguageToggle() {
  const { lang } = useLanguage();

  return (
    <Link
      href="/?choisir"
      aria-label="Changer de langue / تغيير اللغة"
      title="Changer de langue / تغيير اللغة"
      className="flex items-center gap-1.5 rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-background-soft)] px-3 py-1.5 text-xs font-bold text-[var(--color-on-surface-variant)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-all select-none"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
      {lang === "fr" ? "FR" : "ع"}
    </Link>
  );
}
