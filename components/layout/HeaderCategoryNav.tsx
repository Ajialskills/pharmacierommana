"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import type { TranslationKey } from "@/lib/translations";

interface NavItem {
  labelKey: TranslationKey;
  href: string;
  slug: string | null;
}

interface SubCategory {
  id: string;
  slug: string;
  name: string;
  parent_id: string | null;
}

const NAV_ITEMS: NavItem[] = [
  { labelKey: "nav.home", href: "/", slug: null },
  { labelKey: "cat.bebe-et-maman", href: "/boutique/bebe-et-maman", slug: "bebe-et-maman" },
  { labelKey: "cat.visage", href: "/boutique/visage", slug: "visage" },
  { labelKey: "cat.corps", href: "/boutique/corps", slug: "corps" },
  { labelKey: "cat.cheveux", href: "/boutique/cheveux", slug: "cheveux" },
  { labelKey: "cat.hygiene", href: "/boutique/hygiene", slug: "hygiene" },
  { labelKey: "cat.sante", href: "/boutique/sante", slug: "sante" },
  { labelKey: "cat.solaire", href: "/boutique/solaire", slug: "solaire" },
  { labelKey: "cat.homme", href: "/boutique/homme", slug: "homme" },
];

interface Props {
  slugToId: Record<string, string>;
  subMap: Record<string, SubCategory[]>;
}

export default function HeaderCategoryNav({ slugToId, subMap }: Props) {
  const { tr, trCat } = useLanguage();

  return (
    <nav aria-label={tr("nav.categories")} className="hidden md:block bg-[#00696E]">
      <ul className="w-full px-8 flex items-center justify-center gap-8 py-2.5">
        {NAV_ITEMS.map((item) => {
          const parentId = item.slug ? slugToId[item.slug] : null;
          const subs = parentId ? (subMap[parentId] ?? []) : [];

          return (
            <li key={item.href} className="relative group">
              <Link
                href={item.href}
                className="flex items-center gap-1 text-xs font-bold tracking-widest uppercase text-white/80 hover:text-white transition-colors py-2"
              >
                {tr(item.labelKey)}
                {subs.length > 0 && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="mt-px">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                )}
              </Link>

              {subs.length > 0 && (
                <div className="absolute top-full left-0 pt-1 hidden group-hover:block group-focus-within:block z-50 min-w-[180px]">
                  <div className="bg-white border border-[var(--color-border-subtle)] rounded-xl shadow-lg py-1.5 overflow-hidden">
                    {subs.map((sub) => (
                      <Link
                        key={sub.id}
                        href={`/boutique/${sub.slug}`}
                        className="block px-4 py-2 text-sm text-[var(--color-on-surface-variant)] hover:bg-[var(--color-surface-container-low)] hover:text-[var(--color-primary)] transition-colors"
                      >
                        {trCat(sub.name, sub.slug)}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
