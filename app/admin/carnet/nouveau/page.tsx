import ArticleForm from "@/components/admin/ArticleForm";

export default function NouvelArticlePage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-xl font-bold text-[var(--color-on-surface)]">Nouvel article</h1>
      </div>
      <ArticleForm />
    </div>
  );
}
