"use client";

import { CartProvider } from "./cart/CartContext";
import CartDrawer from "./cart/CartDrawer";
import { WishlistProvider } from "./wishlist/WishlistContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WishlistProvider>
      <CartProvider>
        {children}
        <CartDrawer />
      </CartProvider>
    </WishlistProvider>
  );
}
