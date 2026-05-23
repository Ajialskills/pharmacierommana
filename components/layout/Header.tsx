"use client";

import Image from "next/image";
import Link from "next/link";

const NAV_CATEGORIES = [
  { label: "Accueil", href: "/" },
  { label: "Bébé", href: "/boutique/bebe-et-maman" },
  { label: "Visage", href: "/boutique/visage" },
  { label: "Corps", href: "/boutique/corps" },
  { label: "Cheveux", href: "/boutique/cheveux" },
  { label: "Santé", href: "/boutique/sante" },
  { label: "Homme", href: "/boutique/homme" },
  { label: "Solaire", href: "/boutique/solaire" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-[100] bg-white border-b border-[var(--color-border-subtle)] shadow-sm">
      {/* Main bar */}
      <div
        style={{ maxWidth: "var(--spacing-max-width)" }}
        className="mx-auto px-[var(--spacing-lg)] h-20 flex items-center justify-between gap-[var(--spacing-gutter)]"
      >
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/Logo Rommana.png"
            alt="Pharmacie Rommana"
            width={160}
            height={64}
            className="h-12 md:h-16 w-auto object-contain"
            priority
          />
        </Link>

        {/* Search — desktop */}
        <div className="hidden md:flex flex-grow max-w-xl relative">
          <input
            type="text"
            placeholder="Rechercher des produits..."
            className="w-full bg-[var(--color-background-soft)] border border-[var(--color-border-subtle)] rounded-full px-6 py-2.5 text-[var(--color-on-surface)] placeholder:text-[var(--color-outline)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all text-sm"
          />
          <button
            aria-label="Rechercher"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-primary)]"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
          </button>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-6">
          {/* Phone — large screens */}
          <div className="hidden lg:flex flex-col items-end">
            <span
              style={{ fontSize: "var(--text-label-caps)", letterSpacing: "var(--text-label-caps--letter-spacing)" }}
              className="font-semibold text-[var(--color-on-surface-variant)] uppercase"
            >
              Besoin d&apos;aide ?
            </span>
            <a
              href="tel:0539714272"
              className="font-bold text-[var(--color-primary)] text-sm"
            >
              05 39 71 42 72
            </a>
          </div>

          {/* Icon buttons */}
          <div className="flex items-center gap-4">
            <Link
              href="/favoris"
              aria-label="Favoris"
              className="text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)] transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </Link>
            <Link
              href="/panier"
              aria-label="Panier"
              className="relative text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)] transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
            </Link>
            <Link
              href="/mon-compte"
              aria-label="Mon compte"
              className="text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)] transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Category nav — desktop */}
      <nav aria-label="Catégories" className="hidden md:block bg-white border-t border-[var(--color-border-subtle)]">
        <ul
          style={{ maxWidth: "var(--spacing-max-width)" }}
          className="mx-auto px-[var(--spacing-lg)] flex items-center justify-center gap-8 py-3"
        >
          {NAV_CATEGORIES.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-sm font-medium text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)] transition-colors py-1"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
