import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Notre Histoire — Pharmacie Rommana",
  description: "Découvrez l'histoire de Pharmacie Rommana, parapharmacie de confiance à Tétouan depuis des années.",
};

export default function NotreHistoirePage() {
  return (
    <div style={{ maxWidth: "var(--spacing-max-width)" }} className="mx-auto px-[var(--spacing-lg)] py-12">
      <div className="max-w-2xl mx-auto">
        <nav className="text-xs text-[var(--color-on-surface-variant)] mb-8">
          <Link href="/" className="hover:text-[var(--color-primary)]">Accueil</Link>
          <span className="mx-1">/</span>
          <span>Notre Histoire</span>
        </nav>

        <h1 className="text-3xl font-bold text-[var(--color-on-surface)] mb-4">Notre Histoire</h1>
        <p className="text-[var(--color-on-surface-variant)] mb-12 leading-relaxed">
          Pharmacie Rommana — une histoire de confiance, d&apos;expertise et de proximité.
        </p>

        {/* TODO: Real "Notre Histoire" copy from client */}
        <div className="space-y-8 text-[var(--color-on-surface)]">
          <div className="bg-[var(--color-surface-container-low)] rounded-2xl p-8 border border-dashed border-[var(--color-border-subtle)]">
            <p className="text-sm text-[var(--color-on-surface-variant)] italic text-center">
              Ce contenu sera fourni par l&apos;équipe de Pharmacie Rommana.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mt-16 grid sm:grid-cols-3 gap-6">
          {[
            {
              icon: "🏥",
              title: "Expertise pharmaceutique",
              body: "Une équipe qualifiée à votre service pour vous conseiller sur vos besoins en santé et parapharmacie.",
            },
            {
              icon: "🚚",
              title: "Livraison rapide",
              body: "Livraison gratuite dès 400 DH sur Tétouan et dès 800 DH partout au Maroc.",
            },
            {
              icon: "💬",
              title: "Conseil personnalisé",
              body: "Notre pharmacien est disponible sur WhatsApp pour répondre à toutes vos questions.",
            },
          ].map((v) => (
            <div key={v.title} className="bg-white border border-[var(--color-border-subtle)] rounded-2xl p-6 text-center">
              <span className="text-3xl mb-3 block" aria-hidden>{v.icon}</span>
              <h3 className="font-bold text-sm text-[var(--color-on-surface)] mb-2">{v.title}</h3>
              <p className="text-xs text-[var(--color-on-surface-variant)] leading-relaxed">{v.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col sm:flex-row gap-4">
          <Link
            href="/boutique"
            className="flex-1 bg-[var(--color-primary)] text-white px-6 py-3 rounded-xl font-bold text-center hover:opacity-90 transition-opacity text-sm"
          >
            Découvrir nos produits
          </Link>
          <Link
            href="/contact"
            className="flex-1 border border-[var(--color-border-subtle)] px-6 py-3 rounded-xl font-bold text-center text-[var(--color-on-surface)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors text-sm"
          >
            Nous contacter
          </Link>
        </div>
      </div>
    </div>
  );
}
