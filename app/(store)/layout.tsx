import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import Providers from "@/components/Providers";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pharmacierommana.ma";

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: {
    default: "Pharmacie Rommana — Parapharmacie en ligne à Tétouan",
    template: "%s — Pharmacie Rommana",
  },
  description:
    "Pharmacie Rommana, basée à Tétouan, est une parapharmacie en ligne spécialisée dans les produits de soin, d'hygiène et de bien-être. Nous proposons des produits de qualité avec une livraison rapide.",
  openGraph: {
    siteName: "Pharmacie Rommana",
    type: "website",
    locale: "fr_MA",
    images: [{ url: "/og-default.png", width: 1200, height: 630, alt: "Pharmacie Rommana" }],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: { index: true, follow: true },
};

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <Header />
      <main id="main-content" className="flex-1 pb-16 md:pb-0">{children}</main>
      <Footer />
      <MobileNav />
    </Providers>
  );
}
