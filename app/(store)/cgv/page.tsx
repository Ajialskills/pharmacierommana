import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions Générales de Vente — Pharmacie Rommana",
};

const SECTIONS = [
  {
    title: "1. Objet",
    body: "Les présentes Conditions Générales de Vente régissent les relations contractuelles entre Pharmacie Rommana et ses clients dans le cadre de la vente en ligne de produits parapharmaceutiques.",
  },
  {
    title: "2. Produits",
    body: "Les produits proposés à la vente sont décrits et présentés avec la plus grande exactitude possible. En cas d'erreur ou d'omission, la responsabilité de Pharmacie Rommana ne saurait être engagée.",
  },
  {
    title: "3. Prix",
    body: "Les prix sont indiqués en Dirhams Marocains (MAD), toutes taxes comprises. Pharmacie Rommana se réserve le droit de modifier ses prix à tout moment.",
  },
  {
    title: "4. Commande",
    body: "Toute commande passée sur le site vaut acceptation des présentes CGV. La commande est confirmée par l'envoi d'un e-mail de confirmation.",
  },
  {
    title: "5. Paiement",
    body: "Le paiement s'effectue par paiement à la livraison (cash) ou par carte bancaire via le système CMI. Les données bancaires sont sécurisées.",
  },
  {
    title: "6. Livraison",
    body: "Les délais et conditions de livraison sont précisés dans la page Livraison. Pharmacie Rommana ne saurait être tenue responsable des retards causés par le transporteur.",
  },
  {
    title: "7. Droit de rétractation",
    body: "Conformément à la réglementation en vigueur, le client dispose d'un délai pour retourner les produits non ouverts. Les produits d'hygiène et de santé ne peuvent être repris s'ils ont été descellés.",
  },
  {
    title: "8. Données personnelles",
    body: "Les données collectées sont utilisées uniquement pour le traitement des commandes. Elles ne sont jamais cédées à des tiers sans consentement.",
  },
  {
    title: "9. Litiges",
    body: "En cas de litige, les parties s'engagent à rechercher une solution amiable. À défaut, le tribunal compétent sera celui du siège de Pharmacie Rommana à Tétouan.",
  },
];

export default function CgvPage() {
  return (
    <div style={{ maxWidth: "var(--spacing-max-width)" }} className="mx-auto px-[var(--spacing-lg)] py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-[var(--color-on-surface)] mb-2">
          Conditions Générales de Vente
        </h1>
        <p className="text-sm text-[var(--color-on-surface-variant)] mb-10">
          Dernière mise à jour : à préciser
        </p>

        <div className="space-y-8">
          {SECTIONS.map((section) => (
            <div key={section.title}>
              <h2 className="font-bold text-[var(--color-on-surface)] mb-2">{section.title}</h2>
              {/* TODO: Replace with client-approved legal copy */}
              <p className="text-sm text-[var(--color-on-surface-variant)] leading-relaxed">
                {section.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 p-4 bg-[var(--color-surface-container-low)] rounded-xl border border-dashed border-[var(--color-border-subtle)]">
          <p className="text-xs text-[var(--color-on-surface-variant)] italic">
            Ces CGV sont fournies à titre indicatif et doivent être validées par un conseil juridique avant publication.
          </p>
        </div>
      </div>
    </div>
  );
}
