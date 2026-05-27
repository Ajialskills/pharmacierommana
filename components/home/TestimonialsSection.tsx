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

const HEADER_COLORS = [
  { header: "bg-[var(--color-primary)]", avatar: "bg-white/20 text-white" },
  { header: "bg-[var(--color-secondary)]", avatar: "bg-white/20 text-white" },
  { header: "bg-[var(--color-tertiary)]", avatar: "bg-white/20 text-white" },
];

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  if (!testimonials.length) return null;

  return (
    <section aria-labelledby="testimonials-heading" className="pt-8 pb-24 bg-white">
      <div
        style={{ maxWidth: "var(--spacing-max-width)" }}
        className="mx-auto px-[var(--spacing-lg)]"
      >
        <h2
          id="testimonials-heading"
          style={{ fontSize: "var(--text-headline-lg)", fontWeight: "var(--text-headline-lg--font-weight)" }}
          className="text-[var(--color-on-background)] text-center mb-16"
        >
          NOS CLIENTS FIDÈLES
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[var(--spacing-gutter)] items-stretch">
          {testimonials.map((t, i) => {
            const color = HEADER_COLORS[i % HEADER_COLORS.length];
            const isRtl = t.lang === "ar";

            return (
              <article
                key={t.id}
                className="rounded-3xl shadow-sm overflow-hidden border border-[var(--color-border-subtle)] flex flex-col"
              >
                {/* Colored header strip */}
                <div className={`${color.header} px-8 py-6 flex items-center justify-between gap-4`}>
                  <div>
                    <p className="font-bold text-white text-sm">{t.author_name}</p>
                    <div className="flex gap-0.5 mt-1.5" aria-label={`${t.rating} étoiles sur 5`}>
                      {Array.from({ length: t.rating }).map((_, j) => (
                        <svg key={j} width="14" height="14" viewBox="0 0 24 24" fill="white" stroke="none">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <div className={`w-12 h-12 ${color.avatar} rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0`}>
                    {t.author_initials}
                  </div>
                </div>

                {/* White body */}
                <div className="bg-white px-8 py-7 flex flex-col flex-1">
                  <blockquote
                    dir={isRtl ? "rtl" : "ltr"}
                    className="italic text-[var(--color-on-surface-variant)] text-base leading-7 line-clamp-4 flex-1"
                  >
                    &ldquo;{t.body}&rdquo;
                  </blockquote>
                  <p className="text-xs text-[var(--color-on-surface-variant)] mt-4">{t.time_ago}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
