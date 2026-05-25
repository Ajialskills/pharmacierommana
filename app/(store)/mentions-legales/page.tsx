import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions Légales — Pharmacie Rommana",
};

export default function MentionsLegalesPage() {
  return (
    <div style={{ maxWidth: "var(--spacing-max-width)" }} className="mx-auto px-[var(--spacing-lg)] py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-[var(--color-on-surface)] mb-2">Mentions Légales</h1>
        <p className="text-sm text-[var(--color-on-surface-variant)] mb-10">
          Conformément aux dispositions légales en vigueur
        </p>

        <div className="space-y-8 text-sm">
          <section>
            <h2 className="font-bold text-[var(--color-on-surface)] mb-3">Éditeur du site</h2>
            <div className="bg-white border border-[var(--color-border-subtle)] rounded-xl p-5 space-y-1.5 text-[var(--color-on-surface-variant)]">
              <p><strong className="text-[var(--color-on-surface)]">Pharmacie Rommana</strong></p>
              <p>344 Av Al Hijra, Tétouan, Maroc</p>
              <p>Téléphone : <a href="tel:0539714272" className="text-[var(--color-primary)] hover:underline">05 39 71 42 72</a></p>
              <p>WhatsApp : <a href="https://wa.me/212641337443" className="text-[var(--color-primary)] hover:underline">+212 641 33 74 43</a></p>
              {/* TODO: Add RC, ICE, patente from client */}
            </div>
          </section>

          <section>
            <h2 className="font-bold text-[var(--color-on-surface)] mb-3">Hébergement</h2>
            <div className="bg-white border border-[var(--color-border-subtle)] rounded-xl p-5 text-[var(--color-on-surface-variant)]">
              <p><strong className="text-[var(--color-on-surface)]">Vercel Inc.</strong></p>
              <p>440 N Barranca Ave #4133, Covina, CA 91723, USA</p>
            </div>
          </section>

          <section>
            <h2 className="font-bold text-[var(--color-on-surface)] mb-3">Propriété intellectuelle</h2>
            <p className="text-[var(--color-on-surface-variant)] leading-relaxed">
              L&apos;ensemble du contenu du site (textes, images, logos, graphismes) est la propriété exclusive de Pharmacie Rommana ou de ses partenaires. Toute reproduction, même partielle, est strictement interdite sans autorisation préalable.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-[var(--color-on-surface)] mb-3">Données personnelles</h2>
            {/* TODO: Complete RGPD/privacy section with client */}
            <p className="text-[var(--color-on-surface-variant)] leading-relaxed">
              Les données personnelles collectées sur ce site sont utilisées uniquement pour le traitement des commandes et la relation client. Elles ne sont jamais vendues à des tiers.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-[var(--color-on-surface)] mb-3">Cookies</h2>
            <p className="text-[var(--color-on-surface-variant)] leading-relaxed">
              Ce site utilise des cookies techniques nécessaires à son bon fonctionnement. Aucun cookie publicitaire ou de tracking n&apos;est utilisé.
            </p>
          </section>
        </div>

        <div className="mt-10 p-4 bg-[var(--color-surface-container-low)] rounded-xl border border-dashed border-[var(--color-border-subtle)]">
          <p className="text-xs text-[var(--color-on-surface-variant)] italic">
            Ces mentions doivent être complétées avec les informations légales officielles (RC, ICE, etc.) avant publication.
          </p>
        </div>
      </div>
    </div>
  );
}
