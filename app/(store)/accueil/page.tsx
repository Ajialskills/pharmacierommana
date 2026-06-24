import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { getT } from "@/lib/server-translations";

export const metadata: Metadata = {
  title: "Pharmacie Rommana — Parapharmacie en ligne à Tétouan",
  description: "Pharmacie Rommana, basée à Tétouan, est une parapharmacie en ligne spécialisée dans les produits de soin, d'hygiène et de bien-être. Livraison gratuite dès 400 DH sur Tétouan.",
  openGraph: {
    title: "Pharmacie Rommana — Parapharmacie en ligne à Tétouan",
    description: "Produits de parapharmacie de qualité. Livraison rapide partout au Maroc.",
  },
};
import HeroSection from "@/components/home/HeroSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import BrandStrip from "@/components/home/BrandStrip";
import PharmacyServicesCards from "@/components/pharmacy/PharmacyServicesCards";
import QuickActionsGrid from "@/components/pharmacy/QuickActionsGrid";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CarnetSection from "@/components/home/CarnetSection";
import NewsletterBand from "@/components/home/NewsletterBand";
import ProductCard from "@/components/product/ProductCard";
import Link from "next/link";
import type { Product, Testimonial, Category, Brand, Article } from "@/types";

export const revalidate = 3600;

export default async function HomePage() {
  const supabase = await createClient();
  const t = await getT();

  const [promoRes, testimonialsRes, categoriesRes, brandsRes, articlesRes, gardeRes] =
    await Promise.all([
      supabase
        .from("products")
        .select("*")
        .eq("is_published", true)
        .eq("featured_promo", true)
        .not("images", "eq", "{}")
        .order("name"),
      supabase
        .from("testimonials")
        .select("*")
        .eq("is_published", true)
        .order("sort_order"),
      supabase
        .from("categories")
        .select("*")
        .is("parent_id", null)
        .order("sort_order")
        .limit(9),
      supabase
        .from("brands")
        .select("*")
        .eq("is_featured", true)
        .order("name")
        .limit(16),
      supabase
        .from("articles")
        .select("id, slug, title, excerpt, cover_image, published_at")
        .eq("is_published", true)
        .order("published_at", { ascending: false })
        .limit(9),
      supabase
        .from("pharmacie_de_garde")
        .select("pdf_url")
        .order("week_start_date", { ascending: false })
        .limit(1)
        .maybeSingle(),
    ]);

  const promoProducts: Product[] = promoRes.data ?? [];
  const testimonials: Testimonial[] = testimonialsRes.data ?? [];
  const categories: Category[] = categoriesRes.data ?? [];
  const featuredBrands: Brand[] = brandsRes.data ?? [];
  const recentArticles = (articlesRes.data ?? []) as Pick<Article, "id" | "slug" | "title" | "excerpt" | "cover_image" | "published_at">[];
  const gardeUrl = gardeRes.data?.pdf_url ?? null;

  return (
    <>
      <HeroSection />
      <QuickActionsGrid />
      <CategoriesSection categories={categories} />

      {promoProducts.length > 0 && (
        <section aria-labelledby="promos-heading" className="py-12 bg-[var(--color-surface-container-low)]">
          <div style={{ maxWidth: "var(--spacing-max-width)" }} className="mx-auto px-[var(--spacing-lg)]">
            <div className="flex flex-col items-center text-center mb-8">
              <h2
                id="promos-heading"
                className="text-4xl font-bold uppercase tracking-normal text-[var(--color-on-background)]"
              >
                {t("home.promotions")}
              </h2>
              <Link
                href="/boutique?promo=true"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--color-primary)] hover:underline mt-3"
              >
                {t("product.view_all")}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-[var(--spacing-gutter)]">
              {promoProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} showBadge priority={i === 0} />
              ))}
            </div>
          </div>
        </section>
      )}


      <PharmacyServicesCards gardeUrl={gardeUrl} />
      <BrandStrip brands={featuredBrands} />
      <CarnetSection articles={recentArticles} />
      <TestimonialsSection testimonials={testimonials} />
      <NewsletterBand />
    </>
  );
}
