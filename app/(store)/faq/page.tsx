"use client";

import { useState } from "react";
import Link from "next/link";
import PageHero from "@/components/layout/PageHero";

const FAQS = [
  {
    category: "Commande",
    items: [
      {
        q: "Comment passer une commande ?",
        a: "Ajoutez vos produits au panier depuis la boutique, puis cliquez sur le panier en haut de la page. Renseignez vos coordonnées et votre adresse de livraison, puis validez. Notre équipe vous contacte pour confirmer la disponibilité.",
      },
      {
        q: "Puis-je modifier ou annuler ma commande ?",
        a: "Oui, tant que votre commande n'est pas encore expédiée. Contactez-nous rapidement par WhatsApp (+212 641 33 74 43) ou par téléphone (05 39 71 42 72) en mentionnant votre numéro de commande.",
      },
      {
        q: "Comment suivre ma commande ?",
        a: "Après confirmation de votre commande, notre équipe vous tient informé par téléphone ou WhatsApp. Vous pouvez également consulter l'historique de vos commandes dans votre espace « Mon Compte ».",
      },
      {
        q: "Un produit que je cherche n'est pas disponible, que faire ?",
        a: "Contactez-nous par WhatsApp ou par téléphone. Il est possible que le produit soit en cours de réapprovisionnement ou que nous puissions vous proposer une alternative adaptée.",
      },
    ],
  },
  {
    category: "Paiement",
    items: [
      {
        q: "Quels modes de paiement acceptez-vous ?",
        a: "Nous acceptons uniquement le paiement en espèces à la livraison (Cash on Delivery). Aucun paiement en ligne n'est requis lors de la commande.",
      },
      {
        q: "Dois-je payer à l'avance ?",
        a: "Non. Vous payez uniquement au moment de la réception de votre colis, en remettant le montant exact en espèces au livreur.",
      },
      {
        q: "Les prix affichés sont-ils définitifs ?",
        a: "Oui, les prix affichés sur le site sont en Dirham marocain (DH), toutes taxes comprises. Le prix final de votre commande vous est confirmé avant validation.",
      },
    ],
  },
  {
    category: "Livraison",
    items: [
      {
        q: "Livrez-vous partout au Maroc ?",
        a: "Oui, nous livrons dans tout le Maroc. La livraison est gratuite dès 400 DH sur Tétouan et dès 800 DH pour le reste du Maroc. En dessous de ces seuils, les frais sont de 30 DH pour Tétouan et 50 DH pour les autres villes.",
      },
      {
        q: "Quels sont les délais de livraison ?",
        a: "Pour Tétouan et la région (Martil, Fnideq, M'diq) : 24 à 48 heures. Pour le reste du Maroc : 2 à 4 jours ouvrés. Les délais courent à partir de la confirmation de votre commande.",
      },
      {
        q: "Que se passe-t-il si je suis absent lors de la livraison ?",
        a: "Le livreur vous contactera avant le passage. En cas d'absence, un nouveau créneau sera convenu. Contactez-nous par WhatsApp pour toute coordination.",
      },
    ],
  },
  {
    category: "Produits",
    items: [
      {
        q: "Les produits sont-ils authentiques ?",
        a: "Absolument. Tous nos produits proviennent directement de distributeurs agréés ou de laboratoires officiels. Nous garantissons l'authenticité et la conformité de chaque article.",
      },
      {
        q: "Puis-je demander conseil avant d'acheter ?",
        a: "Oui, notre pharmacien est disponible sur WhatsApp (+212 641 33 74 43) pour vous orienter vers les produits les mieux adaptés à votre situation.",
      },
      {
        q: "Les informations produits remplacent-elles un avis médical ?",
        a: "Non. Les descriptions et informations publiées sur notre site sont données à titre informatif uniquement. Elles ne remplacent pas l'avis d'un médecin ou d'un pharmacien. En cas de doute, consultez un professionnel de santé.",
      },
    ],
  },
  {
    category: "Retours",
    items: [
      {
        q: "Puis-je retourner un produit ?",
        a: "Les retours sont acceptés sous conditions strictes : produit non ouvert, dans son emballage d'origine, signalé dans les 48 heures. Les produits d'hygiène ou de soin ouverts ne peuvent pas être repris pour des raisons sanitaires.",
      },
      {
        q: "Comment procéder à un retour ?",
        a: "Contactez-nous par WhatsApp ou téléphone dans les 48h suivant la réception. Notre équipe évalue votre demande et vous indique la marche à suivre. Consultez notre page Retours pour plus de détails.",
      },
    ],
  },
  {
    category: "Compte",
    items: [
      {
        q: "Dois-je créer un compte pour commander ?",
        a: "Non, vous pouvez commander sans compte. Cependant, créer un compte vous permet de suivre vos commandes, d'enregistrer vos adresses et d'accéder à votre historique d'achats.",
      },
      {
        q: "J'ai oublié mon mot de passe, comment faire ?",
        a: "Sur la page de connexion, cliquez sur « Mot de passe oublié » et entrez votre adresse email. Vous recevrez un lien de réinitialisation.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <>
      <PageHero
        title="Questions fréquentes"
        subtitle="Tout ce que vous devez savoir sur vos commandes, la livraison et nos produits"
        crumbs={[{ label: "FAQ" }]}
      />
      <div style={{ maxWidth: "var(--spacing-max-width)" }} className="mx-auto px-[var(--spacing-lg)] py-10">
        <div className="max-w-2xl mx-auto space-y-8">

          {FAQS.map((section) => (
            <div key={section.category}>
              <h2 className="font-bold text-[var(--color-on-surface)] text-base mb-3 px-1">{section.category}</h2>
              <div className="space-y-2">
                {section.items.map((item) => (
                  <Accordion key={item.q} question={item.q} answer={item.a} />
                ))}
              </div>
            </div>
          ))}

          <div className="bg-[color-mix(in_srgb,var(--color-primary)_6%,transparent)] border border-[color-mix(in_srgb,var(--color-primary)_20%,transparent)] rounded-2xl p-6 text-center">
            <p className="font-semibold text-[var(--color-on-surface)] mb-1">Vous ne trouvez pas votre réponse ?</p>
            <p className="text-sm text-[var(--color-on-surface-variant)] mb-4">Notre équipe répond rapidement par WhatsApp ou téléphone.</p>
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

function Accordion({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white border border-[var(--color-border-subtle)] rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left"
        aria-expanded={open}
      >
        <span className="font-semibold text-sm text-[var(--color-on-surface)]">{question}</span>
        <svg
          className={`flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          style={{ color: "var(--color-primary)" }}
          width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open && (
        <div className="px-6 pb-5 text-sm text-[var(--color-on-surface-variant)] leading-relaxed border-t border-[var(--color-border-subtle)] pt-4">
          {answer}
        </div>
      )}
    </div>
  );
}
