import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "Livraison — Pharmacie Rommana",
  description: "Livraison rapide dans tout le Maroc. Gratuite dès 400 DH sur Tétouan et dès 800 DH ailleurs. Paiement à la livraison.",
};

export default function LivraisonPage() {
  return (
    <>
      <PageHero
        title="Livraison"
        subtitle="Livraison rapide partout au Maroc, avec paiement à la réception"
        crumbs={[{ label: "Livraison" }]}
      />
      <div style={{ maxWidth: "var(--spacing-max-width)" }} className="mx-auto px-[var(--spacing-lg)] py-10">
        <div className="max-w-2xl mx-auto space-y-5">

          {/* Frais */}
          <div className="bg-white border border-[var(--color-border-subtle)] rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-[var(--color-border-subtle)]">
              <h2 className="font-bold text-[var(--color-on-surface)]">Frais de livraison</h2>
            </div>
            <div className="divide-y divide-[var(--color-border-subtle)]">
              <Zone
                name="Tétouan"
                cities="Tétouan, Martil, Fnideq, M'diq"
                free="Gratuite dès 400 DH"
                fee="30 DH en dessous de 400 DH"
                icon="📍"
              />
              <Zone
                name="Reste du Maroc"
                cities="Rabat, Casablanca, Fès, Tanger, Marrakech, et toutes les villes"
                free="Gratuite dès 800 DH"
                fee="50 DH en dessous de 800 DH"
                icon="🇲🇦"
              />
            </div>
          </div>

          {/* Délais */}
          <div className="bg-white border border-[var(--color-border-subtle)] rounded-2xl p-6 space-y-4">
            <h2 className="font-bold text-[var(--color-on-surface)]">Délais de livraison</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              <DelayCard zone="Tétouan et région" delay="24 à 48 h" note="Livraison locale rapide" />
              <DelayCard zone="Reste du Maroc" delay="2 à 4 jours ouvrés" note="Selon votre ville" />
            </div>
            <p className="text-sm text-[var(--color-on-surface-variant)]">
              Les délais courent à partir de la <strong>confirmation de votre commande</strong> par notre équipe. Commandes passées le weekend ou jours fériés traitées le prochain jour ouvré.
            </p>
          </div>

          {/* Processus */}
          <div className="bg-white border border-[var(--color-border-subtle)] rounded-2xl p-6 space-y-4">
            <h2 className="font-bold text-[var(--color-on-surface)]">Comment ça fonctionne ?</h2>
            <ol className="space-y-3">
              {[
                { n: "1", t: "Vous passez commande", d: "Remplissez vos coordonnées et validez votre panier." },
                { n: "2", t: "Nous vérifions votre commande", d: "Notre équipe contrôle la disponibilité des produits et vous contacte en cas de besoin." },
                { n: "3", t: "Préparation & expédition", d: "Votre colis est préparé avec soin et expédié vers votre adresse." },
                { n: "4", t: "Réception & paiement", d: "Vous payez en espèces directement au livreur à la réception." },
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

          {/* Paiement */}
          <div className="bg-[color-mix(in_srgb,var(--color-primary)_6%,transparent)] border border-[color-mix(in_srgb,var(--color-primary)_20%,transparent)] rounded-2xl p-6">
            <h2 className="font-bold text-[var(--color-on-surface)] mb-2">Paiement à la livraison</h2>
            <p className="text-sm text-[var(--color-on-surface-variant)]">
              Nous pratiquons exclusivement le <strong>paiement en espèces à la livraison</strong>. Aucune information bancaire ne vous est demandée. Commandez en toute confiance.
            </p>
          </div>

          {/* CTA */}
          <div className="text-center pt-2">
            <p className="text-sm text-[var(--color-on-surface-variant)] mb-4">Une question sur votre livraison ?</p>
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

function Zone({ name, cities, free, fee, icon }: {
  name: string; cities: string; free: string; fee: string; icon: string;
}) {
  return (
    <div className="p-5 flex gap-4">
      <span className="text-2xl flex-shrink-0">{icon}</span>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-[var(--color-on-surface)] mb-1">{name}</p>
        <p className="text-xs text-[var(--color-on-surface-variant)] mb-2">{cities}</p>
        <div className="flex flex-wrap gap-2">
          <span className="inline-block text-xs bg-[color-mix(in_srgb,var(--color-success-green)_12%,transparent)] text-[var(--color-success-green)] font-semibold px-3 py-1 rounded-full">
            ✓ {free}
          </span>
          <span className="inline-block text-xs bg-[var(--color-surface-container-low)] text-[var(--color-on-surface-variant)] px-3 py-1 rounded-full">
            {fee}
          </span>
        </div>
      </div>
    </div>
  );
}

function DelayCard({ zone, delay, note }: { zone: string; delay: string; note: string }) {
  return (
    <div className="bg-[var(--color-surface-container-low)] rounded-xl p-4">
      <p className="text-xs text-[var(--color-on-surface-variant)] mb-1">{zone}</p>
      <p className="font-bold text-[var(--color-primary)] text-lg">{delay}</p>
      <p className="text-xs text-[var(--color-on-surface-variant)] mt-0.5">{note}</p>
    </div>
  );
}
