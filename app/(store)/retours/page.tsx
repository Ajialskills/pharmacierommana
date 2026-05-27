import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "Retours & Échanges — Pharmacie Rommana",
  description: "Politique de retour et d'échange de Pharmacie Rommana. Retours acceptés sous conditions pour les produits non ouverts.",
};

export default function RetoursPage() {
  return (
    <>
      <PageHero
        title="Retours & Échanges"
        subtitle="Votre satisfaction est notre priorité"
        crumbs={[{ label: "Retours" }]}
      />
      <div style={{ maxWidth: "var(--spacing-max-width)" }} className="mx-auto px-[var(--spacing-lg)] py-10">
        <div className="max-w-2xl mx-auto space-y-5">

          {/* Note importante */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex gap-3">
            <span className="text-xl flex-shrink-0">⚠️</span>
            <div>
              <p className="font-semibold text-amber-900 text-sm mb-1">Produits d&apos;hygiène et de soins</p>
              <p className="text-sm text-amber-800">
                Pour des raisons de santé publique et d&apos;hygiène, les produits dont l&apos;emballage a été ouvert ou descellé <strong>ne sont pas repris ni échangés</strong>. Cette règle s&apos;applique à tous les produits cosmétiques, de soin, d&apos;hygiène intime et de bébé.
              </p>
            </div>
          </div>

          {/* Conditions de retour */}
          <div className="bg-white border border-[var(--color-border-subtle)] rounded-2xl p-6 space-y-4">
            <h2 className="font-bold text-[var(--color-on-surface)]">Conditions de retour</h2>
            <p className="text-sm text-[var(--color-on-surface-variant)]">Un retour ou échange peut être accepté uniquement si :</p>
            <ul className="space-y-2">
              {[
                "Le produit est dans son emballage d'origine, intact et non ouvert",
                "Le retour est signalé dans les 48 heures suivant la réception",
                "Le produit n'a pas été utilisé",
                "Le produit ne figure pas dans la liste des exclusions ci-dessous",
              ].map((item) => (
                <li key={item} className="flex gap-2 text-sm text-[var(--color-on-surface-variant)]">
                  <span className="text-[var(--color-primary)] font-bold flex-shrink-0">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Exclusions */}
          <div className="bg-white border border-[var(--color-border-subtle)] rounded-2xl p-6 space-y-4">
            <h2 className="font-bold text-[var(--color-on-surface)]">Produits non repris</h2>
            <ul className="space-y-2">
              {[
                "Produits cosmétiques et de soin ouverts ou descellés",
                "Produits d'hygiène intime",
                "Produits pour bébé (biberons, sucettes, tétines) une fois déballés",
                "Médicaments et compléments alimentaires entamés",
                "Produits thermosensibles",
                "Produits en promotion ou soldés",
              ].map((item) => (
                <li key={item} className="flex gap-2 text-sm text-[var(--color-on-surface-variant)]">
                  <span className="text-red-400 font-bold flex-shrink-0">✗</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Procédure */}
          <div className="bg-white border border-[var(--color-border-subtle)] rounded-2xl p-6 space-y-4">
            <h2 className="font-bold text-[var(--color-on-surface)]">Comment faire un retour ?</h2>
            <ol className="space-y-3">
              {[
                { n: "1", t: "Contactez-nous", d: "Dans les 48h suivant la réception, signalez le problème par WhatsApp (+212 641 33 74 43) ou par téléphone (05 39 71 42 72)." },
                { n: "2", t: "Validation du retour", d: "Notre équipe évalue votre demande et vous indique si le retour est accepté." },
                { n: "3", t: "Renvoi du produit", d: "Si le retour est validé, nous convenons ensemble des modalités de renvoi ou de récupération du produit." },
                { n: "4", t: "Remboursement ou échange", d: "Après réception et vérification du produit, nous procédons au remboursement ou à l'échange selon votre préférence." },
              ].map((step) => (
                <li key={step.n} className="flex gap-4">
                  <span className="w-7 h-7 rounded-full bg-[color-mix(in_srgb,var(--color-primary)_12%,transparent)] text-[var(--color-primary)] font-bold text-sm flex items-center justify-center flex-shrink-0">
                    {step.n}
                  </span>
                  <div>
                    <p className="font-semibold text-sm text-[var(--color-on-surface)]">{step.t}</p>
                    <p className="text-sm text-[var(--color-on-surface-variant)]">{step.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Remboursements */}
          <div className="bg-white border border-[var(--color-border-subtle)] rounded-2xl p-6">
            <h2 className="font-bold text-[var(--color-on-surface)] mb-3">Remboursements</h2>
            <p className="text-sm text-[var(--color-on-surface-variant)]">
              Étant donné que le paiement s&apos;effectue à la livraison en espèces, les remboursements sont réalisés en espèces ou par transfert selon accord mutuel. Les frais de livraison initiaux ne sont pas remboursés sauf en cas d&apos;erreur de notre part.
            </p>
          </div>

          {/* CTA */}
          <div className="text-center pt-2">
            <p className="text-sm text-[var(--color-on-surface-variant)] mb-4">Un problème avec votre commande ? Contactez-nous directement.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a
                href="https://wa.me/212641337443"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                WhatsApp
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-[var(--color-border-subtle)] text-[var(--color-on-surface)] px-5 py-2.5 rounded-xl text-sm font-semibold hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
              >
                Nous contacter
              </Link>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
