import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Pharmacie Rommana — Parapharmacie en ligne à Tétouan",
  description: "Pharmacie Rommana, basée à Tétouan, est une parapharmacie en ligne spécialisée dans les produits de soin, d'hygiène et de bien-être. Livraison gratuite dès 400 DH sur Tétouan.",
  openGraph: {
    title: "Pharmacie Rommana — Parapharmacie en ligne à Tétouan",
    description: "Produits de parapharmacie de qualité. Livraison rapide partout au Maroc.",
  },
};
import HeroSection from "@/components/home/HeroSection";
import FeaturesStrip from "@/components/home/FeaturesStrip";
import CategoriesSection from "@/components/home/CategoriesSection";
import BestSellersSection from "@/components/home/BestSellersSection";
import BrandsWall from "@/components/home/BrandsWall";
import QuickActionsGrid from "@/components/pharmacy/QuickActionsGrid";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CarnetSection from "@/components/home/CarnetSection";
import NewsletterBand from "@/components/home/NewsletterBand";
import ProductCard from "@/components/product/ProductCard";
import type { Product, Testimonial, PharmacieDeGarde, Category, Brand, Article } from "@/types";

export const revalidate = 3600;

export default async function HomePage() {
  const supabase = await createClient();

  const [promoRes, bestsellersRes, testimonialsRes, gardeRes, categoriesRes, allCategoriesRes, brandsRes, articlesRes] =
    await Promise.all([
      supabase
        .from("products")
        .select("*")
        .eq("featured_promo", true)
        .eq("is_published", true)
        .limit(5),
      supabase
        .from("products")
        .select("*")
        .eq("featured_bestseller", true)
        .eq("is_published", true)
        .limit(20),
      supabase
        .from("testimonials")
        .select("*")
        .eq("is_published", true)
        .order("sort_order"),
      supabase
        .from("pharmacie_de_garde")
        .select("*")
        .order("week_start_date", { ascending: false })
        .limit(1)
        .maybeSingle(),
      supabase
        .from("categories")
        .select("*")
        .is("parent_id", null)
        .order("sort_order")
        .limit(8),
      supabase
        .from("categories")
        .select("*")
        .order("sort_order"),
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
        .limit(3),
    ]);

  const promoProducts: Product[] = promoRes.data ?? [];
  const bestsellers: Product[] = bestsellersRes.data ?? [];
  const testimonials: Testimonial[] = testimonialsRes.data ?? [];
  const deGarde: PharmacieDeGarde | null = gardeRes.data ?? null;
  const categories: Category[] = categoriesRes.data ?? [];
  const allCategories: Category[] = allCategoriesRes.data ?? [];
  const featuredBrands: Brand[] = brandsRes.data ?? [];
  const recentArticles = (articlesRes.data ?? []) as Pick<Article, "id" | "slug" | "title" | "excerpt" | "cover_image" | "published_at">[];

  const catById = new Map(allCategories.map((c) => [c.id, c]));
  const topLevelId = (categoryId: string | null): string | null => {
    if (!categoryId) return null;
    const cat = catById.get(categoryId);
    if (!cat) return null;
    return cat.parent_id ?? cat.id;
  };
  const filterCategoriesMap = new Map<string, { id: string; name: string; productIds: string[] }>();
  for (const p of bestsellers) {
    const tlId = topLevelId(p.category_id);
    if (!tlId) continue;
    const tlCat = catById.get(tlId);
    if (!tlCat) continue;
    if (!filterCategoriesMap.has(tlId)) {
      filterCategoriesMap.set(tlId, { id: tlId, name: tlCat.name, productIds: [] });
    }
    filterCategoriesMap.get(tlId)!.productIds.push(p.id);
  }
  const filterCategories = Array.from(filterCategoriesMap.values());

  return (
    <>
      <HeroSection />
      <QuickActionsGrid deGarde={deGarde} />
      <CategoriesSection categories={categories} />

      <BestSellersSection products={bestsellers} filterCategories={filterCategories} />

      <FeaturesStrip />

      {/* Offres Spéciales */}
      {promoProducts.length > 0 && (
        <>
          {/* Marquee strip */}
          <div className="overflow-hidden bg-[#035F63] py-2.5 select-none">
            <div className="flex whitespace-nowrap animate-marquee">
              {Array.from({ length: 8 }).map((_, i) => (
                <span key={i} className="inline-flex items-center gap-6 px-10 text-white text-sm font-semibold tracking-wide">
                  Profitez de nos offres spéciales
                  <span className="opacity-60">✦</span>
                  Réductions allant jusqu&apos;à 30&nbsp;%
                  <span className="opacity-60">✦</span>
                </span>
              ))}
            </div>
          </div>

          <section aria-labelledby="promos-heading" className="pt-10 pb-6" id="promotions">
            {/* Heading — padded */}
            <div
              style={{ maxWidth: "var(--spacing-max-width)" }}
              className="mx-auto px-[var(--spacing-lg)]"
            >
              <div className="flex flex-col items-center text-center mb-12">
                <h2
                  id="promos-heading"
                  style={{ fontSize: "var(--text-headline-lg)", fontWeight: "var(--text-headline-lg--font-weight)" }}
                  className="text-[var(--color-on-background)]"
                >
                  Offres Spéciales
                </h2>
                <p className="text-[var(--color-on-surface-variant)] text-sm mt-1">
                  Profitez de nos réductions exclusives du moment
                </p>
              </div>
            </div>

            {/* Grid — left image bleeds to viewport edge, right column respects container */}
            <div className="w-full grid grid-cols-1 lg:grid-cols-2">
                {/* Left — true full-bleed from left viewport edge */}
                <div className="w-full aspect-[4/3] overflow-hidden relative">
                  <img
                    src="https://plus.unsplash.com/premium_photo-1661636339522-ccc9f6ef94b7?w=1080&q=80&auto=format&fit=crop"
                    alt="Maman appliquant de la crème sur son bébé"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <span className="text-xs font-semibold uppercase tracking-widest opacity-80">Promotions</span>
                    <p className="text-2xl font-bold mt-1">Jusqu&apos;à −30&nbsp;%</p>
                  </div>
                </div>

                {/* Right — 2×2 grid, padded to align with rest of page */}
                <div
                  style={{ paddingLeft: "var(--spacing-gutter)", paddingRight: "var(--spacing-lg)" }}
                  className="aspect-[4/3]">
                  <div className="w-full h-full grid grid-cols-2 grid-rows-2 gap-1 rounded-2xl overflow-hidden border border-[var(--color-border-subtle)]">
                    {promoProducts.slice(0, 4).map((p) => (
                      <ProductCard key={p.id} product={p} showBadge className="h-full rounded-2xl" />
                    ))}
                  </div>
                </div>
            </div>
          </section>
        </>
      )}

      <BrandsWall brands={featuredBrands} />
      <CarnetSection articles={recentArticles} />
      <TestimonialsSection testimonials={testimonials} />
      <NewsletterBand />
    </>
  );
}
