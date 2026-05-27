import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ — Questions fréquentes — Pharmacie Rommana",
  description: "Réponses à vos questions sur les commandes, la livraison, les retours et les produits de Pharmacie Rommana à Tétouan.",
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
