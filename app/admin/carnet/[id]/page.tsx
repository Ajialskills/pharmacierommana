import { notFound } from "next/navigation";
import { getArticleById } from "@/app/actions/articles";
import ArticleForm from "@/components/admin/ArticleForm";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditArticlePage({ params }: Props) {
  const { id } = await params;
  const article = await getArticleById(id);
  if (!article) notFound();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-xl font-bold text-[var(--color-on-surface)]">Modifier l&apos;article</h1>
        <p className="text-sm text-[var(--color-on-surface-variant)] font-mono mt-0.5">{article.slug}</p>
      </div>
      <ArticleForm article={article} />
    </div>
  );
}
