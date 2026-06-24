"use client";

import Link from "next/link";
import type { Category } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";

const CATEGORY_IMAGES: Record<string, string> = {
  "bebe-et-maman":           "https://images.unsplash.com/photo-1734599397715-f030c6d206a0?w=400&q=80&auto=format&fit=crop",
  "capillaire":              "https://images.unsplash.com/photo-1608571423539-e951b9b3871e?w=400&q=80&auto=format&fit=crop",
  "cheveux":                 "https://images.unsplash.com/photo-1554519515-242161756769?w=400&q=80&auto=format&fit=crop",
  "complements-alimentaires":"https://images.unsplash.com/photo-1622227922682-56c92e523e58?w=400&q=80&auto=format&fit=crop",
  "corps":                   "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&q=80&auto=format&fit=crop",
  "homme":                   "https://images.unsplash.com/photo-1567721971759-12402aedabf0?w=400&q=80&auto=format&fit=crop",
  "sante":                   "https://images.unsplash.com/photo-1707129785947-ddc627a8bab9?w=400&q=80&auto=format&fit=crop",
  "solaire":                 "https://plus.unsplash.com/premium_photo-1682535210542-21dceae4530c?w=400&q=80&auto=format&fit=crop",
  "visage":                  "https://plus.unsplash.com/premium_photo-1679046948896-5f9aa56900e9?w=400&q=80&auto=format&fit=crop",
};

const FALLBACK_IMG = "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=75&auto=format&fit=crop";

interface Props {
  categories: Category[];
}

export default function CategoriesSection({ categories }: Props) {
  const { tr, trCat } = useLanguage();
  const topLevel = categories.filter((c) => !c.parent_id).slice(0, 9);
  if (topLevel.length === 0) return null;

  return (
    <section aria-labelledby="categories-heading" className="pt-10 pb-8">
      <div style={{ maxWidth: "var(--spacing-max-width)" }} className="mx-auto px-[var(--spacing-lg)]">
        <div className="flex flex-col items-center text-center mb-8">
          <h2 id="categories-heading" className="text-4xl font-bold tracking-normal uppercase text-[var(--color-on-background)]">
            {tr("home.categories")}
          </h2>
        </div>
      </div>

        {/* Marquee strip — full width */}
        <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,2%,black_6%,black_94%,transparent_98%,transparent)]">
          <div
            className="flex gap-4 animate-marquee hover:[animation-play-state:paused]"
            style={{ width: "max-content" }}
          >
            {[...topLevel, ...topLevel].map((cat, i) => (
              <Link
                key={`${cat.id}-${i}`}
                href={`/boutique/${cat.slug}`}
                className="group relative overflow-hidden rounded-2xl flex-shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
                style={{ width: "160px", height: "210px" }}
              >
                <img
                  src={CATEGORY_IMAGES[cat.slug] ?? FALLBACK_IMG}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <span className="absolute bottom-0 inset-x-0 p-3 text-white text-xs font-bold uppercase tracking-wide text-center leading-tight">
                  {trCat(cat.name, cat.slug)}
                </span>
              </Link>
            ))}
          </div>
        </div>

      <div style={{ maxWidth: "var(--spacing-max-width)" }} className="mx-auto px-[var(--spacing-lg)]">
        <div className="mt-4 flex justify-end">
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
