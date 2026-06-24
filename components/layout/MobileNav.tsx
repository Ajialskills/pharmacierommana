"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";

export default function MobileNav() {
  const pathname = usePathname();
  const { tr } = useLanguage();

  const ITEMS = [
    {
      label: tr("nav.home"),
      href: "/accueil",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
    },
    {
      label: tr("nav.boutique"),
      href: "/boutique",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      ),
    },
    {
      label: tr("header.cart"),
      href: "/panier",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
      ),
    },
    {
      label: tr("auth.my_account"),
      href: "/mon-compte",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
  ];

  return (
    <nav
      aria-label="Navigation mobile"
      className="fixed bottom-0 left-0 right-0 z-[100] md:hidden bg-white border-t border-[var(--color-border-subtle)] safe-area-pb"
    >
      <ul className="flex items-center justify-around px-2 py-2">
        {ITEMS.map((item) => {
          const active = pathname === item.href;
          return (
            <li key={item.href} className="flex-1">
              <Link
                href={item.href}
                className={`flex flex-col items-center gap-1 py-2 px-1 rounded-xl transition-colors ${
                  active
                    ? "text-[var(--color-primary)]"
                    : "text-[var(--color-on-surface-variant)]"
                }`}
              >
                {item.icon}
                <span
                  style={{ fontSize: "10px", letterSpacing: "0.02em" }}
                  className="font-semibold"
                >
                  {item.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
