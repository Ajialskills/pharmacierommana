import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import FaqAccordions from "@/components/faq/FaqAccordions";
import { FAQS } from "@/components/faq/faq-data";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pharmacierommana.ma";

export const metadata: Metadata = {
  title: "FAQ — Questions fréquentes | Pharmacie Rommana Tétouan",
  description:
    "Toutes les réponses à vos questions sur les commandes, la livraison, le paiement et les conseils santé de Pharmacie Rommana, parapharmacie en ligne à Tétouan, Maroc.",
  alternates: { canonical: `${SITE_URL}/faq` },
  openGraph: {
    title: "FAQ — Pharmacie Rommana | Parapharmacie Tétouan",
    description:
      "Commandes, livraison au Maroc, paiement à la livraison, conseils santé : retrouvez toutes les réponses sur Pharmacie Rommana.",
    url: `${SITE_URL}/faq`,
    type: "website",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.flatMap((section) =>
    section.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    }))
  ),
};

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <PageHero
        title="Questions fréquentes"
        subtitle="Commandes, livraison, paiement et conseils santé — tout ce que vous devez savoir"
        crumbs={[{ label: "FAQ" }]}
      />
      <div style={{ maxWidth: "var(--spacing-max-width)" }} className="mx-auto px-[var(--spacing-lg)] py-10">
        <FaqAccordions />
      </div>
    </>
  );
}
