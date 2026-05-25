import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Retours & Échanges — Pharmacie Rommana",
  description: "Politique de retour et d'échange de Pharmacie Rommana.",
};

export default function RetoursPage() {
  return (
    <div style={{ maxWidth: "var(--spacing-max-width)" }} className="mx-auto px-[var(--spacing-lg)] py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-[var(--color-on-surface)] mb-2">Retours &amp; Échanges</h1>
        <p className="text-sm text-[var(--color-on-surface-variant)] mb-10">
          Votre satisfaction est notre priorité.
        </p>

        <div className="space-y-6">
          <div className="bg-white border border-[var(--color-border-subtle)] rounded-2xl p-6 space-y-4">
            <h2 className="font-bold text-[var(--color-on-surface)]">Conditions de retour</h2>
            {/* TODO: Real return policy from client */}
            <div className="bg-[var(--color-surface-container-low)] rounded-xl p-4 border border-dashed border-[var(--color-border-subtle)]">
              <p className="text-sm text-[var(--color-on-surface-variant)] italic">
                La politique de retour sera précisée par Pharmacie Rommana.
              </p>
            </div>
          </div>

          <div className="bg-white border border-[var(--color-border-subtle)] rounded-2xl p-6">
            <h2 className="font-bold text-[var(--color-on-surface)] mb-3">Demander un retour</h2>
            <p className="text-sm text-[var(--color-on-surface-variant)] mb-4">
              Pour toute demande de retour ou d&apos;échange, contactez-nous directement.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://wa.me/212641337443"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[var(--color-secondary)] text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity"
              >
                WhatsApp
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 border border-[var(--color-border-subtle)] px-5 py-2.5 rounded-xl font-bold text-sm text-[var(--color-on-surface)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
              >
                Page Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
