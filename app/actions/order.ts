"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/supabase/require-admin";
import { computeShippingCost } from "@/lib/shipping";

export interface CreateOrderInput {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: string;
  shipping_city: string;
  payment_method: "cod" | "cmi";
  items: { product_id: string; quantity: number; unit_price: number; product_name: string }[];
  subtotal: number;
  shipping_cost: number;
  total_amount: number;
  notes?: string;
}

export async function createOrder(input: CreateOrderInput): Promise<{ id: string; order_number: string }> {
  if (input.items.length === 0) throw new Error("Commande vide");

  const phone = input.customer_phone.trim();
  if (phone.replace(/[\s+\-]/g, "").length < 10) {
    throw new Error("Numéro de téléphone invalide");
  }

  // Cap string fields
  const notes = (input.notes ?? "").slice(0, 500) || null;
  const shipping_address = input.shipping_address.slice(0, 300);

  const supabase = createAdminClient();

  // Recompute totals server-side from DB prices
  const productIds = input.items.map((item) => item.product_id);
  const { data: dbProducts, error: productsError } = await supabase
    .from("products")
    .select("id, price, sale_price")
    .in("id", productIds);

  if (productsError || !dbProducts) throw new Error("Erreur lors du chargement des produits");

  const priceMap = new Map(dbProducts.map((p) => [p.id, p]));

  const enrichedItems = input.items.map((item) => {
    const product = priceMap.get(item.product_id);
    if (!product) throw new Error("Produit introuvable");
    const unit_price = product.sale_price ?? product.price;
    return { ...item, unit_price };
  });

  const subtotal = enrichedItems.reduce((sum, item) => sum + item.unit_price * item.quantity, 0);

  const shipping_cost = computeShippingCost(subtotal, input.shipping_city);
  const total_amount = subtotal + shipping_cost;

  const order_number = `PR-${crypto.randomUUID().split("-")[0].toUpperCase()}`;

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      order_number,
      status: "awaiting_confirmation",
      payment_method: input.payment_method,
      payment_status: input.payment_method === "cod" ? "pending" : "awaiting",
      customer_name: input.customer_name,
      customer_email: input.customer_email,
      customer_phone: input.customer_phone,
      shipping_address,
      subtotal,
      shipping_cost,
      total: total_amount,
      notes,
    })
    .select("id, order_number")
    .single();

  if (orderError || !order) throw new Error("Erreur lors de la création de la commande");

  const orderItems = enrichedItems.map((item) => ({
    order_id: order.id,
    product_id: item.product_id,
    quantity: item.quantity,
    unit_price: item.unit_price,
    product_name: item.product_name,
  }));

  const { error: itemsError } = await supabase.from("order_items").insert(orderItems);
  if (itemsError) {
    await supabase.from("orders").delete().eq("id", order.id);
    throw new Error("Erreur lors de la création des articles de commande");
  }

  revalidatePath("/admin/commandes");

  return { id: order.id, order_number: order.order_number };
}

export async function getOrders() {
  await requireAdmin();
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function getOrderById(id: string) {
  await requireAdmin();
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("orders")
    .select("*, order_items(*)")
    .eq("id", id)
    .single();
  if (error) throw new Error(error.message);
  return data;
}

const VALID_STATUSES = [
  "awaiting_confirmation",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
] as const;

export async function updateOrderStatus(id: string, status: string) {
  await requireAdmin();
  if (!(VALID_STATUSES as readonly string[]).includes(status)) {
    throw new Error(`Statut invalide: ${status}`);
  }
  const supabase = createAdminClient();
  const { error } = await supabase.from("orders").update({ status }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/commandes");
  revalidatePath(`/admin/commandes/${id}`);
}

export interface UserOrder {
  id: string;
  order_number: string;
  status: string;
  payment_method: string;
  total: number;
  created_at: string;
}

export async function getUserOrders(): Promise<UserOrder[]> {
  const serverClient = await createClient();
  const { data: { user }, error: authError } = await serverClient.auth.getUser();
  if (authError || !user?.email) return [];

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("orders")
    .select("id, order_number, status, payment_method, total, created_at")
    .eq("customer_email", user.email)
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
}
