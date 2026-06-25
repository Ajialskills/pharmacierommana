"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
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
  { labelKey: "nav.home",          href: "/accueil",                slug: null },
  { labelKey: "cat.bebe-et-maman", href: "/boutique/bebe-et-maman", slug: "bebe-et-maman" },
  { labelKey: "cat.visage",        href: "/boutique/visage",        slug: "visage" },
  { labelKey: "cat.corps",         href: "/boutique/corps",         slug: "corps" },
  { labelKey: "cat.cheveux",       href: "/boutique/cheveux",       slug: "cheveux" },
  { labelKey: "cat.hygiene",       href: "/boutique/hygiene",       slug: "hygiene" },
  { labelKey: "cat.sante",         href: "/boutique/sante",         slug: "sante" },
  { labelKey: "cat.solaire",       href: "/boutique/solaire",       slug: "solaire" },
  { labelKey: "cat.homme",         href: "/boutique/homme",         slug: "homme" },
];

interface Props {
  slugToId: Record<string, string>;
  subMap: Record<string, SubCategory[]>;
}

function NavItem({ item, subs, subMap, trFn, trCatFn }: {
  item: NavItem;
  subs: SubCategory[];
  subMap: Record<string, SubCategory[]>;
  trFn: (key: TranslationKey) => string;
  trCatFn: (name: string, slug: string) => string;
}) {
  const [open, setOpen]               = useState(false);
  const [activeSubId, setActiveSubId] = useState<string | null>(null);
  const [flyoutTop, setFlyoutTop]     = useState(0);
  const [flipLeft, setFlipLeft]       = useState(false);

  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const liRef      = useRef<HTMLLIElement>(null);
  const cardRef    = useRef<HTMLDivElement>(null);

  const keepOpen = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => {
      setOpen(false);
      setActiveSubId(null);
    }, 150);
  };

  useEffect(() => {
    if (open && liRef.current) {
      const rect = liRef.current.getBoundingClientRect();
      setFlipLeft(rect.left > window.innerWidth / 2);
    }
  }, [open]);

  const handleSubEnter = (subId: string, rowEl: HTMLElement) => {
    keepOpen();
    const cardRect = cardRef.current?.getBoundingClientRect();
    const rowRect  = rowEl.getBoundingClientRect();
    if (cardRect) setFlyoutTop(rowRect.top - cardRect.top);
    setActiveSubId(subId);
  };

  const activeSub      = activeSubId ? subs.find(s => s.id === activeSubId) : null;
  const flyoutChildren = activeSub ? (subMap[activeSub.id] ?? []) : [];

  return (
    <li
      ref={liRef}
      className="relative"
      onMouseEnter={keepOpen}
      onMouseLeave={scheduleClose}
    >
      <Link
        href={item.href}
        className="flex items-center gap-1 text-xs font-bold tracking-widest uppercase text-white/80 hover:text-white transition-colors py-2"
      >
        {trFn(item.labelKey)}
        {subs.length > 0 && (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5"
            className={`mt-px transition-transform duration-150 ${open ? "rotate-180" : ""}`}>
            <path d="M6 9l6 6 6-6" />
          </svg>
        )}
      </Link>

      {subs.length > 0 && open && (
        <div className={`absolute top-full z-[500] flex items-start gap-1 ${flipLeft ? "right-0 flex-row-reverse" : "left-0"}`}>

          {/* L2 card */}
          <div
            ref={cardRef}
            className="bg-white border border-[var(--color-border-subtle)] rounded-xl shadow-xl py-1.5 min-w-[210px] overflow-hidden"
          >
            {subs.map(sub => {
              const hasCh = (subMap[sub.id] ?? []).length > 0;
              return (
                <div key={sub.id} onMouseEnter={e => handleSubEnter(sub.id, e.currentTarget)}>
                  <Link
                    href={`/boutique/${sub.slug}`}
                    className={`flex items-center justify-between gap-3 px-4 py-2.5 text-sm transition-colors ${
                      activeSubId === sub.id
                        ? "bg-[var(--color-surface-container-low)] text-[var(--color-primary)]"
                        : "text-[var(--color-on-surface-variant)] hover:bg-[var(--color-surface-container-low)] hover:text-[var(--color-primary)]"
                    }`}
                  >
                    {trCatFn(sub.name, sub.slug)}
                    {hasCh && (
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2.5">
                        <path d={flipLeft ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6"} />
                      </svg>
                    )}
                  </Link>
                </div>
              );
            })}
          </div>

          {/* L3 flyout — sibling of L2 card, not clipped by it */}
          {flyoutChildren.length > 0 && (
            <div style={{ marginTop: flyoutTop }}>
              <div className="bg-white border border-[var(--color-border-subtle)] rounded-xl shadow-xl py-1.5 min-w-[210px] overflow-hidden">
                {flyoutChildren.map(child => (
                  <Link
                    key={child.id}
                    href={`/boutique/${child.slug}`}
                    className="block px-4 py-2.5 text-sm text-[var(--color-on-surface-variant)] hover:bg-[var(--color-surface-container-low)] hover:text-[var(--color-primary)] transition-colors"
                  >
                    {trCatFn(child.name, child.slug)}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </li>
  );
}

export default function HeaderCategoryNav({ slugToId, subMap }: Props) {
  const { tr, trCat } = useLanguage();

  return (
    <nav aria-label={tr("nav.categories")} className="hidden md:block bg-[#00696E]">
      <ul className="w-full px-8 flex items-center justify-center gap-8 py-2.5">
        {NAV_ITEMS.map(item => {
          const parentId = item.slug ? slugToId[item.slug] : null;
          const subs     = parentId ? (subMap[parentId] ?? []) : [];
          return (
            <NavItem
              key={item.href}
              item={item}
              subs={subs}
              subMap={subMap}
              trFn={tr}
              trCatFn={trCat}
            />
          );
        })}
      </ul>
    </nav>
  );
}
