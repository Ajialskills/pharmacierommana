"use client";

import { CartProvider } from "./cart/CartContext";
import CartDrawer from "./cart/CartDrawer";
import { WishlistProvider } from "./wishlist/WishlistContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import type { Lang } from "@/lib/translations";

export default function Providers({ children, initialLang }: { children: React.ReactNode; initialLang?: Lang }) {
  return (
    <LanguageProvider initialLang={initialLang}>
      <WishlistProvider>
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </WishlistProvider>
    </LanguageProvider>
  );
}
