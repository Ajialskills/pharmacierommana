import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPublishedArticles } from "@/app/actions/articles";
import PageHero from "@/components/layout/PageHero";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pharmacierommana.ma";

export const metadata: Metadata = {
  title: "Blog — Conseils santé et bien-être",
  description: "Articles et conseils santé, hygiène et bien-être par Pharmacie Rommana à Tétouan. Guides pratiques pour prendre soin de vous et de votre famille.",
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: "Blog — Pharmacie Rommana",
    description: "Conseils santé et bien-être par vos pharmaciens à Tétouan.",
    url: `${SITE_URL}/blog`,
  },
};

export default async function BlogPage() {
  const articles = await getPublishedArticles();

  return (
    <>
      <PageHero
        title="Blog"
        subtitle="Conseils, actualités et guides santé de Pharmacie Rommana"
        crumbs={[{ label: "Blog" }]}
      />
      <div style={{ maxWidth: "var(--spacing-max-width)" }} className="mx-auto px-[var(--spacing-lg)] py-10">

      {articles.length === 0 ? (
        <div className="text-center py-24 text-[var(--color-on-surface-variant)]">
          <p>Aucun article publié pour l&apos;instant. Revenez bientôt !</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <article key={article.id} className="bg-white border border-[var(--color-border-subtle)] rounded-2xl overflow-hidden hover:shadow-lg transition-shadow group">
              {article.cover_image && (
                <div className="aspect-video overflow-hidden">
                  <Image
                    src={article.cover_image}
                    alt={article.title}
                    width={600}
                    height={338}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              <div className="p-6">
                <p className="text-xs text-[var(--color-on-surface-variant)] mb-2">
                  {article.published_at ? new Date(article.published_at).toLocaleDateString("fr-MA", { day: "numeric", month: "long", year: "numeric" }) : ""}
                </p>
                <h2 className="font-bold text-[var(--color-on-surface)] mb-2 line-clamp-2 leading-snug">
                  <Link href={`/blog/${article.slug}`} className="hover:text-[var(--color-primary)] transition-colors">
                    {article.title}
                  </Link>
                </h2>
                {article.excerpt && (
                  <p className="text-sm text-[var(--color-on-surface-variant)] line-clamp-3 leading-relaxed">{article.excerpt}</p>
                )}
                <Link href={`/blog/${article.slug}`} className="inline-flex items-center gap-1 mt-4 text-xs font-bold text-[var(--color-primary)] hover:underline">
                  Lire l&apos;article
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
      </div>
    </>
  );
}
