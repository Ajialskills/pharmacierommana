"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useWishlist } from "@/components/wishlist/WishlistContext";
import { createClient } from "@/lib/supabase/client";
import ProductCard from "@/components/product/ProductCard";
import PageHero from "@/components/layout/PageHero";
import type { Product } from "@/types";

export default function FavorisPage() {
  const { ids, count } = useWishlist();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (ids.length === 0) {
      setProducts([]);
      return;
    }
    setLoading(true);
    const supabase = createClient();
    supabase
      .from("products")
      .select("*")
      .in("id", ids)
      .eq("is_published", true)
      .then(({ data }) => {
        setProducts((data as Product[]) ?? []);
        setLoading(false);
      });
  }, [ids]);

  return (
    <>
      <PageHero
        title="Mes Favoris"
        subtitle={`${count} produit${count !== 1 ? "s" : ""} sauvegardé${count !== 1 ? "s" : ""}`}
        crumbs={[{ label: "Favoris" }]}
      />
      <div style={{ maxWidth: "var(--spacing-max-width)" }} className="mx-auto px-[var(--spacing-lg)] py-10">

      {count === 0 ? (
        <div className="text-center py-24">
          <svg className="mx-auto mb-6 opacity-20" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          <p className="text-[var(--color-on-surface-variant)] text-sm mb-6">Vous n&apos;avez pas encore de favoris.</p>
          <Link href="/boutique" className="bg-[var(--color-primary)] text-white px-6 py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity">
            Découvrir la boutique
          </Link>
        </div>
      ) : loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {ids.map((id) => (
            <div key={id} className="rounded-2xl bg-[var(--color-surface-variant)] animate-pulse aspect-[3/4]" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
      </div>
    </>
  );
}
