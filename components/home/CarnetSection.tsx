import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/types";

type ArticlePreview = Pick<Article, "id" | "slug" | "title" | "excerpt" | "cover_image" | "published_at">;

interface CarnetSectionProps {
  articles: ArticlePreview[];
}

export default function CarnetSection({ articles }: CarnetSectionProps) {
  if (!articles.length) return null;

  const [featured, ...rest] = articles as ArticlePreview[];

  return (
    <section aria-labelledby="carnet-heading" className="py-24 bg-[var(--color-surface-container-low)]">
      <div style={{ maxWidth: "var(--spacing-max-width)" }} className="mx-auto px-[var(--spacing-lg)]">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span
              style={{ fontSize: "var(--text-label-caps)", letterSpacing: "var(--text-label-caps--letter-spacing)" }}
              className="block text-[var(--color-primary)] font-semibold uppercase mb-2"
            >
              Le Carnet
            </span>
            <h2
              id="carnet-heading"
              style={{ fontSize: "var(--text-headline-lg)", fontWeight: "var(--text-headline-lg--font-weight)" }}
              className="text-[var(--color-on-background)]"
            >
              Conseils &amp; actualités santé
            </h2>
          </div>
          <Link
            href="/le-carnet"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-primary)] hover:underline"
          >
            Tous les articles
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid lg:grid-cols-5 gap-[var(--spacing-gutter)]">
          {/* Featured article */}
          <Link
            href={`/le-carnet/${featured.slug}`}
            className="lg:col-span-3 group relative overflow-hidden rounded-2xl bg-white border border-[var(--color-border-subtle)] hover:shadow-xl transition-shadow"
          >
            {featured.cover_image ? (
              <div className="aspect-[16/9] overflow-hidden">
                <Image
                  src={featured.cover_image}
                  alt={featured.title}
                  width={800}
                  height={450}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ) : (
              <div className="aspect-[16/9] bg-[color-mix(in_srgb,var(--color-primary)_8%,transparent)]" />
            )}
            <div className="p-6">
              {featured.published_at && (
                <p className="text-xs text-[var(--color-on-surface-variant)] mb-2">
                  {new Date(featured.published_at).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                </p>
              )}
              <h3 className="text-lg font-bold text-[var(--color-on-surface)] leading-snug mb-2 group-hover:text-[var(--color-primary)] transition-colors">
                {featured.title}
              </h3>
              {featured.excerpt && (
                <p className="text-sm text-[var(--color-on-surface-variant)] line-clamp-2 leading-relaxed">
                  {featured.excerpt}
                </p>
              )}
            </div>
          </Link>

          {/* Secondary articles */}
          <div className="lg:col-span-2 flex flex-col gap-[var(--spacing-gutter)]">
            {rest.slice(0, 2).map((article) => (
              <Link
                key={article.id}
                href={`/le-carnet/${article.slug}`}
                className="group flex gap-4 bg-white border border-[var(--color-border-subtle)] rounded-2xl overflow-hidden hover:shadow-md transition-shadow"
              >
                {article.cover_image && (
                  <div className="w-24 flex-shrink-0 overflow-hidden">
                    <Image
                      src={article.cover_image}
                      alt={article.title}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="p-4 min-w-0">
                  {article.published_at && (
                    <p className="text-xs text-[var(--color-on-surface-variant)] mb-1">
                      {new Date(article.published_at).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}
                    </p>
                  )}
                  <h3 className="text-sm font-bold text-[var(--color-on-surface)] leading-snug line-clamp-2 group-hover:text-[var(--color-primary)] transition-colors">
                    {article.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/le-carnet"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-primary)] hover:underline"
          >
            Tous les articles
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
