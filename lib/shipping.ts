export const FREE_DELIVERY_TETOUAN = 400;
export const FREE_DELIVERY_NATIONAL = 800;
export const DELIVERY_FEE_TETOUAN = 30;
export const DELIVERY_FEE_OTHER = 50;

export function computeShippingCost(subtotal: number, city: string): number {
  const cityNorm = city.toLowerCase().trim();
  if (subtotal >= FREE_DELIVERY_NATIONAL) return 0;
  if (cityNorm === "tétouan" && subtotal >= FREE_DELIVERY_TETOUAN) return 0;
  if (cityNorm === "tétouan") return DELIVERY_FEE_TETOUAN;
  return DELIVERY_FEE_OTHER;
}
