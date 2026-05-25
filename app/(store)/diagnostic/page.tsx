import type { Metadata } from "next";
import DiagnosticQuiz from "@/components/diagnostic/DiagnosticQuiz";

export const metadata: Metadata = {
  title: "Diagnostic produit — Pharmacie Rommana",
  description: "Trouvez le produit qu'il vous faut grâce à notre outil de diagnostic personnalisé.",
};

export default function DiagnosticPage() {
  return (
    <div style={{ maxWidth: "var(--spacing-max-width)" }} className="mx-auto px-[var(--spacing-lg)] py-12">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block bg-[color-mix(in_srgb,var(--color-primary)_10%,transparent)] text-[var(--color-primary)] font-semibold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Outil de diagnostic
          </span>
          <h1 className="text-2xl font-bold text-[var(--color-on-surface)] mb-2">
            Trouvez le produit qu&apos;il vous faut
          </h1>
          <p className="text-sm text-[var(--color-on-surface-variant)] leading-relaxed">
            Répondez à quelques questions et nous vous orientons vers les produits
            les mieux adaptés à vos besoins.
          </p>
        </div>

        <div className="bg-white border border-[var(--color-border-subtle)] rounded-2xl p-8 shadow-sm">
          <DiagnosticQuiz />
        </div>
      </div>
    </div>
  );
}
