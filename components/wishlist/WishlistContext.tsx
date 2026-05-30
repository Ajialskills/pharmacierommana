"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";

const WISHLIST_KEY = "pr_wishlist";
import type { Product } from "@/types";

interface WishlistContextValue {
  ids: string[];
  toggle: (product: Product) => void;
  has: (productId: string) => boolean;
  count: number;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(WISHLIST_KEY);
      if (stored) setIds(JSON.parse(stored) as string[]);
    } catch (e) {
      console.warn("[WishlistContext] Failed to read from localStorage", e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(ids));
    } catch (e) {
      console.warn("[WishlistContext] Failed to write to localStorage", e);
    }
  }, [ids]);

  const toggle = useCallback((product: Product) => {
    setIds((prev) =>
      prev.includes(product.id) ? prev.filter((id) => id !== product.id) : [...prev, product.id]
    );
  }, []);

  const has = useCallback((productId: string) => ids.includes(productId), [ids]);

  return (
    <WishlistContext.Provider value={{ ids, toggle, has, count: ids.length }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used inside WishlistProvider");
  return ctx;
}
