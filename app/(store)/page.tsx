import { createClient } from "@/lib/supabase/server";
import HeroSection from "@/components/home/HeroSection";
import FeaturesStrip from "@/components/home/FeaturesStrip";
import QuickActionsGrid from "@/components/pharmacy/QuickActionsGrid";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import NewsletterBand from "@/components/home/NewsletterBand";
import ProductCard from "@/components/product/ProductCard";
import type { Product, Testimonial, PharmacieDeGarde } from "@/types";

export const revalidate = 3600;

export default async function HomePage() {
  const supabase = await createClient();

  const [promoRes, bestsellersRes, testimonialsRes, gardeRes] =
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
        .limit(4),
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
    ]);

  const promoProducts: Product[] = promoRes.data ?? [];
  const bestsellers: Product[] = bestsellersRes.data ?? [];
  const testimonials: Testimonial[] = testimonialsRes.data ?? [];
  const deGarde: PharmacieDeGarde | null = gardeRes.data ?? null;

  return (
    <>
      <HeroSection />
      <FeaturesStrip />

      {/* Offres Spéciales */}
      {promoProducts.length > 0 && (
        <section aria-labelledby="promos-heading" className="py-24" id="promotions">
          <div
            style={{ maxWidth: "var(--spacing-max-width)" }}
            className="mx-auto px-[var(--spacing-lg)]"
          >
            <div className="flex items-center justify-between mb-12">
              <div>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[var(--spacing-gutter)]">
              {promoProducts.map((p) => (
                <ProductCard key={p.id} product={p} showBadge />
              ))}
            </div>
          </div>
        </section>
      )}

      <QuickActionsGrid deGarde={deGarde} />

      {/* Meilleures Ventes */}
      {bestsellers.length > 0 && (
        <section aria-labelledby="bestsellers-heading" className="py-24 bg-[var(--color-surface-container-low)]">
          <div
            style={{ maxWidth: "var(--spacing-max-width)" }}
            className="mx-auto px-[var(--spacing-lg)]"
          >
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2
                  id="bestsellers-heading"
                  style={{ fontSize: "var(--text-headline-lg)", fontWeight: "var(--text-headline-lg--font-weight)" }}
                  className="text-[var(--color-on-background)]"
                >
                  Nos Meilleures Ventes
                </h2>
                <p className="text-[var(--color-on-surface-variant)] text-sm mt-1">
                  Les produits les plus plébiscités par nos clients
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[var(--spacing-gutter)]">
              {bestsellers.map((p) => (
                <ProductCard key={p.id} product={p} showBadge={false} />
              ))}
            </div>
          </div>
        </section>
      )}

      <TestimonialsSection testimonials={testimonials} />
      <NewsletterBand />
    </>
  );
}
