import Link from "next/link";
import { getArticles } from "@/app/actions/articles";
import DeleteArticleButton from "./DeleteArticleButton";

export default async function AdminCarnetPage() {
  const articles = await getArticles();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-bold text-[var(--color-on-surface)]">Blog</h1>
          <p className="text-sm text-[var(--color-on-surface-variant)] mt-0.5">{articles.length} article{articles.length !== 1 ? "s" : ""}</p>
        </div>
        <Link href="/admin/carnet/nouveau" className="bg-[var(--color-primary)] text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:opacity-90 transition-opacity">
          + Nouvel article
        </Link>
      </div>

      <div className="bg-white border border-[var(--color-border-subtle)] rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--color-border-subtle)] bg-[var(--color-background-soft)]">
              <th className="text-left px-6 py-3 text-xs font-semibold text-[var(--color-on-surface-variant)] uppercase tracking-wide">Titre</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-[var(--color-on-surface-variant)] uppercase tracking-wide">Statut</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-[var(--color-on-surface-variant)] uppercase tracking-wide">Date</th>
              <th className="px-6 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-border-subtle)]">
            {articles.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-[var(--color-on-surface-variant)] text-sm">
                  Aucun article. <Link href="/admin/carnet/nouveau" className="text-[var(--color-primary)] font-semibold hover:underline">Écrire le premier</Link>
                </td>
              </tr>
            )}
            {articles.map((article) => (
              <tr key={article.id} className="hover:bg-[var(--color-background-soft)]">
                <td className="px-6 py-4">
                  <p className="font-semibold text-[var(--color-on-surface)] line-clamp-1">{article.title}</p>
                  <p className="text-xs text-[var(--color-on-surface-variant)] font-mono mt-0.5">{article.slug}</p>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${article.is_published ? "bg-[color-mix(in_srgb,var(--color-success-green)_15%,transparent)] text-[var(--color-success-green)]" : "bg-[var(--color-surface-container)] text-[var(--color-on-surface-variant)]"}`}>
                    {article.is_published ? "Publié" : "Brouillon"}
                  </span>
                </td>
                <td className="px-6 py-4 text-xs text-[var(--color-on-surface-variant)]">
                  {article.published_at ? new Date(article.published_at).toLocaleDateString("fr-MA") : "—"}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-3 justify-end">
                    <Link href={`/admin/carnet/${article.id}`} className="text-xs font-semibold text-[var(--color-primary)] hover:underline">
                      Modifier
                    </Link>
                    <DeleteArticleButton id={article.id} title={article.title} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
