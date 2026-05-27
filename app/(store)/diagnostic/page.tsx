import type { Metadata } from "next";
import DiagnosticQuiz from "@/components/diagnostic/DiagnosticQuiz";
import PageHero from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "Diagnostic produit — Pharmacie Rommana",
  description: "Trouvez le produit qu'il vous faut grâce à notre outil de diagnostic personnalisé.",
};

export default function DiagnosticPage() {
  return (
    <>
      <PageHero
        title="Trouvez votre produit"
        subtitle="Répondez à quelques questions et nous vous orientons vers les produits les mieux adaptés"
        crumbs={[{ label: "Diagnostic" }]}
      />
      <div style={{ maxWidth: "var(--spacing-max-width)" }} className="mx-auto px-[var(--spacing-lg)] py-10">
      <div className="max-w-[576px] mx-auto">

        <div className="bg-white border border-[var(--color-border-subtle)] rounded-2xl p-8 shadow-sm">
          <DiagnosticQuiz />
        </div>
      </div>
      </div>
    </>
  );
}
