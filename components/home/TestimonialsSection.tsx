import type { Testimonial } from "@/types";

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

function StarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--color-warning-amber)" stroke="none">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

const INITIAL_COLORS = [
  { bg: "bg-[color-mix(in_srgb,var(--color-secondary)_15%,transparent)]", text: "text-[var(--color-secondary)]" },
  { bg: "bg-[color-mix(in_srgb,var(--color-primary)_15%,transparent)]", text: "text-[var(--color-primary)]" },
  { bg: "bg-[color-mix(in_srgb,var(--color-tertiary)_15%,transparent)]", text: "text-[var(--color-tertiary)]" },
];

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  if (!testimonials.length) return null;

  return (
    <section aria-labelledby="testimonials-heading" className="py-24 bg-white">
      <div
        style={{ maxWidth: "var(--spacing-max-width)" }}
        className="mx-auto px-[var(--spacing-lg)]"
      >
        <h2
          id="testimonials-heading"
          style={{ fontSize: "var(--text-headline-lg)", fontWeight: "var(--text-headline-lg--font-weight)" }}
          className="text-[var(--color-on-background)] text-center mb-16"
        >
          Nos Fidèles Clients
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[var(--spacing-gutter)]">
          {testimonials.map((t, i) => {
            const color = INITIAL_COLORS[i % INITIAL_COLORS.length];
            const isRtl = t.lang === "ar";

            return (
              <article
                key={t.id}
                className="bg-white p-8 rounded-3xl shadow-sm border border-[var(--color-border-subtle)]"
              >
                {/* Stars */}
                <div className="flex gap-0.5 mb-6" aria-label={`${t.rating} étoiles sur 5`}>
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <StarIcon key={j} />
                  ))}
                </div>

                {/* Quote */}
                <blockquote
                  dir={isRtl ? "rtl" : "ltr"}
                  className="italic text-[var(--color-on-surface-variant)] mb-8 text-base leading-7"
                >
                  &ldquo;{t.body}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4 border-t border-[var(--color-border-subtle)] pt-6">
                  <div
                    className={`w-12 h-12 ${color.bg} ${color.text} rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0`}
                  >
                    {t.author_initials}
                  </div>
                  <div>
                    <p className="font-bold text-[var(--color-on-surface)] text-sm">{t.author_name}</p>
                    <span className="text-xs text-[var(--color-on-surface-variant)]">{t.time_ago}</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
