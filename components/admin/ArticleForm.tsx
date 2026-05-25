"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createArticle, updateArticle } from "@/app/actions/articles";
import type { Article } from "@/types";

interface Props {
  article?: Article;
}

export default function ArticleForm({ article }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const data = new FormData(e.currentTarget);
    startTransition(async () => {
      try {
        if (article) {
          await updateArticle(article.id, data);
        } else {
          await createArticle(data);
        }
        router.push("/admin/carnet");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur");
      }
    });
  }

  const inputCls = "w-full border border-[var(--color-border-subtle)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]";
  const labelCls = "block text-xs font-semibold text-[var(--color-on-surface-variant)] mb-1.5 uppercase tracking-wide";

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
      {error && (
        <p className="text-sm text-[var(--color-error)] bg-[var(--color-error-container)] px-4 py-3 rounded-xl">{error}</p>
      )}

      <section className="bg-white border border-[var(--color-border-subtle)] rounded-2xl p-6 space-y-5">
        <h2 className="font-bold text-[var(--color-on-surface)]">Contenu</h2>
        <div>
          <label className={labelCls}>Titre *</label>
          <input name="title" required defaultValue={article?.title} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Extrait</label>
          <textarea name="excerpt" rows={2} defaultValue={article?.excerpt ?? ""} className={`${inputCls} resize-none`} />
        </div>
        <div>
          <label className={labelCls}>Corps de l&apos;article</label>
          <textarea name="body" rows={12} defaultValue={article?.body ?? ""} className={`${inputCls} resize-y`} />
        </div>
        <div>
          <label className={labelCls}>URL image de couverture</label>
          <input name="cover_image" defaultValue={article?.cover_image ?? ""} className={inputCls} placeholder="https://..." />
        </div>
      </section>

      <section className="bg-white border border-[var(--color-border-subtle)] rounded-2xl p-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="hidden" name="is_published" value="false" />
          <input type="checkbox" name="is_published" value="true" defaultChecked={article?.is_published ?? false} className="w-4 h-4 accent-[var(--color-primary)]" />
          <span className="text-sm font-medium text-[var(--color-on-surface)]">Publié</span>
        </label>
      </section>

      <div className="flex gap-3">
        <button type="submit" disabled={isPending} className="bg-[var(--color-primary)] text-white px-6 py-3 rounded-xl font-bold text-sm hover:opacity-90 disabled:opacity-60 transition-opacity">
          {isPending ? "Enregistrement…" : article ? "Mettre à jour" : "Créer l'article"}
        </button>
        <button type="button" onClick={() => router.back()} className="px-6 py-3 rounded-xl font-semibold text-sm border border-[var(--color-border-subtle)] hover:bg-[var(--color-background-soft)] transition-colors">
          Annuler
        </button>
      </div>
    </form>
  );
}
