"use client";

import Link from "next/link";
import CartButton from "./CartButton";
import { useLanguage } from "@/contexts/LanguageContext";

export default function HeaderActions() {
  const { tr } = useLanguage();

  return (
    <div className="flex items-center gap-6 flex-shrink-0">
      {/* Phone — large screens */}
      <div className="hidden lg:flex flex-col items-end">
        <span className="text-xs font-semibold text-[var(--color-on-surface-variant)] uppercase tracking-wide">
          {tr("header.need_help")}
        </span>
        <a href="tel:0539714272" dir="ltr" className="font-bold text-[var(--color-primary)] text-sm">
          05 39 71 42 72
        </a>
      </div>

      {/* Icon buttons */}
      <div className="flex items-center gap-7">
        <Link href="/favoris" aria-label={tr("header.wishlist")} className="text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)] transition-colors">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </Link>
        <CartButton />
        <Link href="/mon-compte" aria-label={tr("header.account")} className="text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)] transition-colors">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
