"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/supabase/require-admin";

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
  const supabase = createAdminClient();

  const order_number = `PR-${Date.now().toString(36).toUpperCase()}`;

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      order_number,
      status: "pending",
      payment_method: input.payment_method,
      payment_status: input.payment_method === "cod" ? "pending" : "awaiting",
      customer_name: input.customer_name,
      customer_email: input.customer_email,
      customer_phone: input.customer_phone,
      shipping_address: input.shipping_address,
      shipping_city: input.shipping_city,
      subtotal: input.subtotal,
      shipping_cost: input.shipping_cost,
      total_amount: input.total_amount,
      notes: input.notes ?? null,
    })
    .select("id, order_number")
    .single();

  if (orderError || !order) throw new Error(orderError?.message ?? "Erreur création commande");

  const orderItems = input.items.map((item) => ({
    order_id: order.id,
    product_id: item.product_id,
    quantity: item.quantity,
    unit_price: item.unit_price,
    product_name: item.product_name,
  }));

  const { error: itemsError } = await supabase.from("order_items").insert(orderItems);
  if (itemsError) throw new Error(itemsError.message);

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
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("orders")
    .select("*, order_items(*)")
    .eq("id", id)
    .single();
  if (error) return null;
  return data;
}

export async function updateOrderStatus(id: string, status: string) {
  await requireAdmin();
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
  total_amount: number;
  created_at: string;
}

export async function getUserOrdersByEmail(email: string): Promise<UserOrder[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("orders")
    .select("id, order_number, status, payment_method, total_amount, created_at")
    .eq("customer_email", email)
    .order("created_at", { ascending: false });
  if (error) return [];
  return data ?? [];
}
