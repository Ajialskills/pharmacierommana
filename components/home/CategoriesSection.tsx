"use client";

import Link from "next/link";
import type { Category } from "@/types";
import type React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

function IconBebe() {
  return <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><circle cx="12" cy="5" r="2" /><path d="M8 10c0-2.2 1.8-4 4-4s4 1.8 4 4v2H8v-2z" /><path d="M6 12h12l-1 7H7l-1-7z" /><path d="M9 19v2M15 19v2" /></svg>;
}
function IconCheveux() {
  return <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M12 2c-3 0-5 2-5 5 0 1.5.5 3 1.5 4L7 19h10l-1.5-8C16.5 10 17 8.5 17 7c0-3-2-5-5-5z" /><path d="M9 7c0 0 1 1 3 1s3-1 3-1" /></svg>;
}
function IconCorps() {
  return <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M9 3h6l1 4H8L9 3z" /><rect x="7" y="7" width="10" height="14" rx="2" /><path d="M10 11h4M10 14h4" /></svg>;
}
function IconHomme() {
  return <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><circle cx="12" cy="6" r="3" /><path d="M6 21v-2a6 6 0 0 1 12 0v2" /><path d="M12 9v6M9 12h6" /></svg>;
}
function IconHygiene() {
  return <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M7 4h10v2a5 5 0 0 1-5 5 5 5 0 0 1-5-5V4z" /><path d="M12 11v9" /><path d="M9 17h6" /><path d="M8 4V2M12 4V2M16 4V2" /></svg>;
}
function IconSante() {
  return <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>;
}
function IconSolaire() {
  return <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" /></svg>;
}
function IconVisage() {
  return <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><circle cx="12" cy="12" r="9" /><path d="M9 9.5c0-.3.2-.5.5-.5s.5.2.5.5" /><path d="M14 9.5c0-.3.2-.5.5-.5s.5.2.5.5" /><path d="M8.5 14.5s1 2 3.5 2 3.5-2 3.5-2" /></svg>;
}
function IconDefault() {
  return <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>;
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  "bebe-et-maman": <IconBebe />,
  "cheveux": <IconCheveux />,
  "corps": <IconCorps />,
  "homme": <IconHomme />,
  "hygiene": <IconHygiene />,
  "sante": <IconSante />,
  "solaire": <IconSolaire />,
  "visage": <IconVisage />,
};

interface Props {
  categories: Category[];
}

export default function CategoriesSection({ categories }: Props) {
  const { tr, trCat } = useLanguage();
  const topLevel = categories.filter((c) => !c.parent_id).slice(0, 8);
  if (topLevel.length === 0) return null;

  return (
    <section aria-labelledby="categories-heading" className="pt-10 pb-8">
      <div style={{ maxWidth: "var(--spacing-max-width)" }} className="mx-auto px-[var(--spacing-lg)]">
        <div className="flex flex-col items-center text-center mb-10">
          <h2 id="categories-heading" className="text-4xl font-bold tracking-normal uppercase text-[var(--color-on-background)]">
            {tr("home.categories")}
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-9">
          {topLevel.map((cat) => (
            <Link
              key={cat.id}
              href={`/boutique/${cat.slug}`}
              className="group flex flex-col items-center gap-3 bg-white border border-[var(--color-border-subtle)] rounded-2xl p-4 text-center hover:shadow-md hover:border-[var(--color-primary)] transition-all"
            >
              <span className="text-[var(--color-primary)] group-hover:scale-110 transition-transform">
                {CATEGORY_ICONS[cat.slug] ?? <IconDefault />}
              </span>
              <span className="text-xs font-semibold text-[var(--color-on-surface)] leading-snug group-hover:text-[var(--color-primary)] transition-colors">
                {trCat(cat.name, cat.slug)}
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-3 flex justify-end">
          <Link href="/categories" className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--color-primary)] hover:underline">
            {tr("general.see_all")}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
