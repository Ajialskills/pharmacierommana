import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("articles").select("title, excerpt, cover_image").eq("slug", slug).single();
  const title = data?.title ?? "Le Carnet";
  const description = data?.excerpt ?? undefined;
  return {
    title,
    description,
    openGraph: {
      title: `${title} — Le Carnet — Pharmacie Rommana`,
      description,
      images: data?.cover_image ? [{ url: data.cover_image, width: 1200, height: 630, alt: title }] : undefined,
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: article } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (!article) notFound();

  return (
    <div style={{ maxWidth: "var(--spacing-max-width)" }} className="mx-auto px-[var(--spacing-lg)] py-12">
      <nav className="text-xs text-[var(--color-on-surface-variant)] mb-8 flex items-center gap-1">
        <Link href="/le-carnet" className="hover:text-[var(--color-primary)]">Le Carnet</Link>
        <span>/</span>
        <span className="text-[var(--color-on-surface)] line-clamp-1">{article.title}</span>
      </nav>

      <article className="max-w-2xl mx-auto">
        <header className="mb-8">
          <p className="text-xs text-[var(--color-on-surface-variant)] mb-3">
            {article.published_at ? new Date(article.published_at).toLocaleDateString("fr-MA", { day: "numeric", month: "long", year: "numeric" }) : ""}
          </p>
          <h1 className="text-3xl font-bold text-[var(--color-on-surface)] leading-tight mb-4">{article.title}</h1>
          {article.excerpt && (
            <p className="text-lg text-[var(--color-on-surface-variant)] leading-relaxed">{article.excerpt}</p>
          )}
        </header>

        {article.cover_image && (
          <div className="aspect-video rounded-2xl overflow-hidden mb-8">
            <Image src={article.cover_image} alt={article.title} width={800} height={450} className="w-full h-full object-cover" priority />
          </div>
        )}

        {article.body && (
          <div className="prose prose-sm max-w-none text-[var(--color-on-surface)] leading-relaxed whitespace-pre-wrap">
            {article.body}
          </div>
        )}

        <div className="mt-12 pt-8 border-t border-[var(--color-border-subtle)]">
          <Link href="/le-carnet" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] hover:underline">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Retour au Carnet
          </Link>
        </div>
      </article>
    </div>
  );
}
