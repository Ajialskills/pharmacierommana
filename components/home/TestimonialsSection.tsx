"use client";

import type { Testimonial } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

const AVATAR_COLORS = ["bg-[#4285F4]", "bg-[#34A853]", "bg-[#EA4335]"];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} / 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < rating ? "#FBBC04" : "#E0E0E0"} stroke="none" aria-hidden="true">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

function GoogleG() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const { tr } = useLanguage();
  if (!testimonials.length) return null;

  return (
    <section aria-labelledby="testimonials-heading" className="pt-10 pb-16 bg-[var(--color-background-soft)]">
      <div style={{ maxWidth: "var(--spacing-max-width)" }} className="mx-auto px-[var(--spacing-lg)]">
        <div className="flex flex-col items-start mb-8">
          <div className="flex items-center gap-2 mb-2">
            <GoogleG />
            <span className="text-sm font-semibold text-[var(--color-on-surface-variant)]">{tr("home.reviews_badge")}</span>
          </div>
          <h2
            id="testimonials-heading"
            style={{ fontSize: "var(--text-headline-lg)", fontWeight: "var(--text-headline-lg--font-weight)" }}
            className="text-[var(--color-on-background)] text-center w-full"
          >
            {tr("home.reviews")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => {
            const isRtl = t.lang === "ar";
            const initial = t.author_name.charAt(0).toUpperCase();
            return (
              <article key={t.id} className="bg-white rounded-2xl border border-[var(--color-border-subtle)] p-6 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                  {t.avatar_url ? (
                    <img
                      src={t.avatar_url}
                      alt={t.author_name}
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-full object-cover flex-shrink-0 ring-1 ring-[var(--color-border-subtle)]"
                    />
                  ) : (
                    <div className={`w-10 h-10 rounded-full ${AVATAR_COLORS[i % AVATAR_COLORS.length]} flex items-center justify-center text-white font-bold text-base flex-shrink-0`} aria-hidden="true">
                      {initial}
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="font-semibold text-[var(--color-on-surface)] text-sm truncate">{t.author_name}</p>
                    <p className="text-xs text-[var(--color-on-surface-variant)]">{t.time_ago}</p>
                  </div>
                  <GoogleG />
                </div>
                <StarRating rating={t.rating} />
                <blockquote dir={isRtl ? "rtl" : "ltr"} className="text-sm text-[var(--color-on-surface-variant)] leading-relaxed line-clamp-5 flex-1">
                  {t.body}
                </blockquote>
              </article>
            );
          })}
        </div>

        <div className="flex justify-center mt-8">
          <a
            href="https://www.google.com/maps/place/صيدلية+الرمانة/@35.567009,-5.393409,17z"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] border border-[var(--color-primary)] px-5 py-2.5 rounded-full hover:bg-[var(--color-primary)] hover:text-white transition-colors"
          >
            {tr("home.reviews_cta")}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
