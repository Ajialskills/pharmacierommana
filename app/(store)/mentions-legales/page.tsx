import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "Mentions Légales — Pharmacie Rommana",
  description: "Mentions légales de Pharmacie Rommana, parapharmacie en ligne à Tétouan, Maroc.",
};

export default function MentionsLegalesPage() {
  return (
    <>
      <PageHero
        title="Mentions Légales"
        subtitle="Informations légales relatives au site pharmacierommana.ma"
        crumbs={[{ label: "Mentions légales" }]}
      />
      <div style={{ maxWidth: "var(--spacing-max-width)" }} className="mx-auto px-[var(--spacing-lg)] py-10">
        <div className="max-w-2xl mx-auto space-y-5">

          <Block title="Éditeur du site">
            <Row label="Raison sociale" value="Pharmacie Rommana" />
            <Row label="Adresse" value="344 Av Al Hijra, Tétouan, Maroc" />
            <Row label="Téléphone" value="05 39 71 42 72" />
            <Row label="WhatsApp" value="+212 641 33 74 43" />
            <Row label="Email" value="contact@pharmacierommana.ma" />
            <Row label="RC" value="[à compléter]" />
            <Row label="ICE" value="[à compléter]" />
            <Row label="Patente" value="[à compléter]" />
          </Block>

          <Block title="Directeur de la publication">
            <p>Le directeur de la publication est le pharmacien titulaire de Pharmacie Rommana.</p>
          </Block>

          <Block title="Hébergement">
            <Row label="Hébergeur" value="Vercel Inc." />
            <Row label="Adresse" value="340 Pine Street, Suite 701, San Francisco, CA 94104, États-Unis" />
            <Row label="Site" value="vercel.com" />
          </Block>

          <Block title="Propriété intellectuelle">
            <p>L&apos;ensemble du contenu de ce site (textes, images, logo, mise en page) est la propriété exclusive de Pharmacie Rommana. Toute reproduction, même partielle, est interdite sans autorisation préalable écrite.</p>
          </Block>

          <Block title="Données personnelles">
            <p>Les données personnelles collectées sur ce site sont traitées conformément à la loi marocaine n° 09-08 du 18 février 2009 relative à la protection des personnes physiques à l&apos;égard du traitement des données à caractère personnel.</p>
            <p className="mt-2">Vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;opposition et de suppression de vos données. Pour exercer ces droits, contactez-nous par téléphone au 05 39 71 42 72 ou par WhatsApp au +212 641 33 74 43.</p>
          </Block>

          <Block title="Cookies">
            <p>Ce site utilise des cookies techniques indispensables à son bon fonctionnement (panier, session). Aucun cookie publicitaire ou de tracking tiers n&apos;est utilisé.</p>
          </Block>

          <Block title="Limitation de responsabilité">
            <p>Pharmacie Rommana s&apos;efforce de fournir des informations exactes et à jour sur ce site. Toutefois, elle ne saurait être tenue responsable des erreurs ou omissions, ni des dommages résultant de l&apos;utilisation du site. Les informations santé publiées ne se substituent pas à un avis médical ou pharmaceutique.</p>
          </Block>

          <p className="text-xs text-[var(--color-on-surface-variant)] pt-2">
            Dernière mise à jour : janvier 2026
          </p>
        </div>
      </div>
    </>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-[var(--color-border-subtle)] rounded-2xl p-6">
      <h2 className="font-bold text-[var(--color-on-surface)] mb-3">{title}</h2>
      <div className="text-sm text-[var(--color-on-surface-variant)] leading-relaxed">
        {children}
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2 py-1 border-b border-[var(--color-border-subtle)] last:border-0">
      <span className="font-semibold text-[var(--color-on-surface)] w-32 flex-shrink-0">{label}</span>
      <span>{value}</span>
    </div>
  );
}
