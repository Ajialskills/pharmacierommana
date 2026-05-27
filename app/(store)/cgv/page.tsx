import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "Conditions Générales de Vente — Pharmacie Rommana",
  description: "Conditions générales de vente de Pharmacie Rommana, parapharmacie en ligne à Tétouan.",
};

export default function CGVPage() {
  return (
    <>
      <PageHero
        title="Conditions Générales de Vente"
        subtitle="En vigueur à compter du 1er janvier 2026"
        crumbs={[{ label: "CGV" }]}
      />
      <div style={{ maxWidth: "var(--spacing-max-width)" }} className="mx-auto px-[var(--spacing-lg)] py-10">
        <div className="max-w-2xl mx-auto space-y-5">

          <Block title="1. Vendeur">
            <p>Le site <strong>pharmacierommana.ma</strong> est exploité par <strong>Pharmacie Rommana</strong>, sise au 344 Av Al Hijra, Tétouan, Maroc.</p>
            <p className="mt-1">Tél : 05 39 71 42 72 — WhatsApp : +212 641 33 74 43</p>
          </Block>

          <Block title="2. Objet">
            <p>Les présentes conditions générales de vente (CGV) régissent les achats effectués sur le site pharmacierommana.ma. Toute commande passée implique l&apos;acceptation pleine et entière des présentes CGV.</p>
          </Block>

          <Block title="3. Produits">
            <p>Les produits proposés sont des articles de parapharmacie : soins, hygiène, bien-être, santé, bébé et maternité. Les descriptions, photos et prix affichés sont donnés à titre indicatif et peuvent être mis à jour sans préavis.</p>
            <p className="mt-1">En cas d&apos;indisponibilité d&apos;un article après commande, le client en sera informé dans les meilleurs délais et la commande annulée sans frais.</p>
          </Block>

          <Block title="4. Prix">
            <p>Les prix sont indiqués en Dirham marocain (MAD), toutes taxes comprises. Pharmacie Rommana se réserve le droit de modifier ses prix à tout moment. Les produits sont facturés au tarif en vigueur au moment de la validation de la commande.</p>
          </Block>

          <Block title="5. Commande">
            <p>Le client renseigne ses coordonnées et son adresse de livraison, puis valide son panier. La commande est transmise à la pharmacie, qui vérifie la disponibilité avant confirmation.</p>
            <p className="mt-1">Pharmacie Rommana se réserve le droit de refuser toute commande en cas d&apos;anomalie, d&apos;indisponibilité du produit ou de suspicion de fraude.</p>
          </Block>

          <Block title="6. Paiement">
            <p>Le paiement s&apos;effectue uniquement à la livraison, <strong>en espèces</strong>, à la réception du colis. Aucun paiement en ligne n&apos;est requis au moment de la commande.</p>
            <p className="mt-1">En cas de refus injustifié du colis lors de la livraison, les frais de retour pourront être facturés.</p>
          </Block>

          <Block title="7. Livraison">
            <p>Les livraisons sont effectuées au Maroc uniquement. Les délais et frais de livraison sont détaillés sur la page{" "}
              <Link href="/livraison" className="text-[var(--color-primary)] hover:underline">Livraison</Link>.
            </p>
            <p className="mt-1">Pharmacie Rommana ne saurait être tenue responsable des retards dus à des circonstances indépendantes de sa volonté (conditions météorologiques, grèves, force majeure).</p>
          </Block>

          <Block title="8. Droit de rétractation et retours">
            <p>Conformément à la réglementation en vigueur, le droit de rétractation <strong>ne s&apos;applique pas</strong> aux produits d&apos;hygiène et de soins dont l&apos;emballage a été ouvert ou descellé après la livraison, pour des raisons de protection de la santé.</p>
            <p className="mt-1">Pour les produits non ouverts et dans leur emballage d&apos;origine, les conditions de retour sont détaillées sur la page{" "}
              <Link href="/retours" className="text-[var(--color-primary)] hover:underline">Retours &amp; Échanges</Link>.
            </p>
          </Block>

          <Block title="9. Responsabilité">
            <p>Pharmacie Rommana ne saurait être tenue responsable des dommages indirects liés à l&apos;utilisation des produits vendus. Les informations publiées sur le site sont données à titre informatif et ne remplacent pas l&apos;avis d&apos;un professionnel de santé.</p>
          </Block>

          <Block title="10. Protection des données personnelles">
            <p>Les données collectées lors de la commande (nom, adresse, téléphone, email) sont utilisées exclusivement pour son traitement et sa livraison. Elles ne sont pas cédées à des tiers à des fins commerciales.</p>
            <p className="mt-1">Conformément à la loi marocaine n° 09-08 relative à la protection des personnes physiques à l&apos;égard du traitement des données à caractère personnel, vous disposez d&apos;un droit d&apos;accès, de rectification et de suppression de vos données en contactant la pharmacie.</p>
          </Block>

          <Block title="11. Droit applicable">
            <p>Les présentes CGV sont soumises au droit marocain. En cas de litige non résolu à l&apos;amiable, les tribunaux compétents de Tétouan seront saisis.</p>
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
