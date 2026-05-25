import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Livraison — Pharmacie Rommana",
  description: "Informations sur la livraison : délais, zones et tarifs.",
};

export default function LivraisonPage() {
  return (
    <div style={{ maxWidth: "var(--spacing-max-width)" }} className="mx-auto px-[var(--spacing-lg)] py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-[var(--color-on-surface)] mb-2">Livraison</h1>
        <p className="text-sm text-[var(--color-on-surface-variant)] mb-10">
          Tout ce que vous devez savoir sur la livraison de vos commandes.
        </p>

        <div className="space-y-6">
          <div className="bg-[color-mix(in_srgb,var(--color-primary)_6%,transparent)] border border-[color-mix(in_srgb,var(--color-primary)_20%,transparent)] rounded-2xl p-6">
            <h2 className="font-bold text-[var(--color-on-surface)] mb-3 flex items-center gap-2">
              <span aria-hidden>🚚</span> Livraison Gratuite
            </h2>
            <ul className="space-y-2 text-sm text-[var(--color-on-surface-variant)]">
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-primary)] font-bold flex-shrink-0">•</span>
                <span>Dès <strong className="text-[var(--color-on-surface)]">400 DH</strong> d&apos;achat sur <strong className="text-[var(--color-on-surface)]">Tétouan</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-primary)] font-bold flex-shrink-0">•</span>
                <span>Dès <strong className="text-[var(--color-on-surface)]">800 DH</strong> d&apos;achat sur <strong className="text-[var(--color-on-surface)]">tout le Maroc</strong></span>
              </li>
            </ul>
          </div>

          <div className="bg-white border border-[var(--color-border-subtle)] rounded-2xl p-6 space-y-4">
            <h2 className="font-bold text-[var(--color-on-surface)]">Tarifs de livraison</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--color-border-subtle)]">
                    <th className="text-left py-2 text-[var(--color-on-surface-variant)] font-semibold">Zone</th>
                    <th className="text-right py-2 text-[var(--color-on-surface-variant)] font-semibold">Tarif</th>
                    <th className="text-right py-2 text-[var(--color-on-surface-variant)] font-semibold">Gratuit dès</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-border-subtle)]">
                  <tr>
                    <td className="py-3 text-[var(--color-on-surface)]">Tétouan</td>
                    <td className="py-3 text-right text-[var(--color-on-surface)]">30 DH</td>
                    <td className="py-3 text-right text-[var(--color-primary)] font-semibold">400 DH</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-[var(--color-on-surface)]">Reste du Maroc</td>
                    <td className="py-3 text-right text-[var(--color-on-surface)]">50 DH</td>
                    <td className="py-3 text-right text-[var(--color-primary)] font-semibold">800 DH</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white border border-[var(--color-border-subtle)] rounded-2xl p-6 space-y-4">
            <h2 className="font-bold text-[var(--color-on-surface)]">Délais de livraison</h2>
            {/* TODO: Real delivery timeframes from client */}
            <div className="bg-[var(--color-surface-container-low)] rounded-xl p-4 border border-dashed border-[var(--color-border-subtle)]">
              <p className="text-sm text-[var(--color-on-surface-variant)] italic">
                Les délais exacts seront précisés par Pharmacie Rommana.
              </p>
            </div>
          </div>

          <div className="bg-white border border-[var(--color-border-subtle)] rounded-2xl p-6">
            <h2 className="font-bold text-[var(--color-on-surface)] mb-3">Une question sur votre livraison ?</h2>
            <p className="text-sm text-[var(--color-on-surface-variant)] mb-4">
              Notre équipe est disponible sur WhatsApp pour vous renseigner.
            </p>
            <a
              href="https://wa.me/212641337443"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[var(--color-secondary)] text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity"
            >
              Nous contacter sur WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
