"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireAdmin } from "@/lib/supabase/require-admin";
import type { Product } from "@/types";

function slugify(str: string) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function createProduct(formData: FormData) {
  await requireAdmin();
  const supabase = createAdminClient();

  const name = formData.get("name") as string;
  if (!name?.trim()) throw new Error("Nom du produit requis");

  const price = parseFloat(formData.get("price") as string);
  if (isNaN(price) || price < 0) throw new Error("Prix invalide");

  const salePriceRaw = formData.get("sale_price") as string;
  const sale_price = salePriceRaw ? parseFloat(salePriceRaw) : null;
  if (sale_price !== null && (isNaN(sale_price) || sale_price < 0)) throw new Error("Prix promotionnel invalide");

  let images: unknown[] = [];
  try {
    images = JSON.parse((formData.get("images") as string) || "[]");
  } catch {
    images = [];
  }

  const payload = {
    slug: slugify(name),
    name,
    brand_id: (formData.get("brand_id") as string) || null,
    category_id: (formData.get("category_id") as string) || null,
    description: (formData.get("description") as string) || null,
    price,
    sale_price,
    stock: parseInt(formData.get("stock") as string) || 0,
    images,
    featured_promo: formData.get("featured_promo") === "true",
    featured_bestseller: formData.get("featured_bestseller") === "true",
    is_published: formData.get("is_published") !== "false",
    meta_title: (formData.get("meta_title") as string) || null,
    meta_description: (formData.get("meta_description") as string) || null,
  };

  const { error } = await supabase.from("products").insert(payload);
  if (error) { console.error(error); throw new Error("Erreur lors de la création"); }

  revalidatePath("/admin/produits");
  revalidatePath("/boutique");
  revalidatePath("/");
}

export async function updateProduct(id: string, formData: FormData) {
  await requireAdmin();
  const supabase = createAdminClient();

  const name = formData.get("name") as string;
  if (!name?.trim()) throw new Error("Nom du produit requis");

  const price = parseFloat(formData.get("price") as string);
  if (isNaN(price) || price < 0) throw new Error("Prix invalide");

  const salePriceRaw = formData.get("sale_price") as string;
  const sale_price = salePriceRaw ? parseFloat(salePriceRaw) : null;
  if (sale_price !== null && (isNaN(sale_price) || sale_price < 0)) throw new Error("Prix promotionnel invalide");

  let images: unknown[] = [];
  try {
    images = JSON.parse((formData.get("images") as string) || "[]");
  } catch {
    images = [];
  }

  const payload = {
    name,
    brand_id: (formData.get("brand_id") as string) || null,
    category_id: (formData.get("category_id") as string) || null,
    description: (formData.get("description") as string) || null,
    price,
    sale_price,
    stock: parseInt(formData.get("stock") as string) || 0,
    images,
    featured_promo: formData.get("featured_promo") === "true",
    featured_bestseller: formData.get("featured_bestseller") === "true",
    is_published: formData.get("is_published") !== "false",
    meta_title: (formData.get("meta_title") as string) || null,
    meta_description: (formData.get("meta_description") as string) || null,
  };

  const { error } = await supabase.from("products").update(payload).eq("id", id);
  if (error) { console.error(error); throw new Error("Erreur lors de la mise à jour"); }

  const { data: updated } = await supabase.from("products").select("slug").eq("id", id).single();
  revalidatePath("/admin/produits");
  if (updated?.slug) revalidatePath(`/produit/${updated.slug}`);
  revalidatePath("/");
}

export async function deleteProduct(id: string) {
  await requireAdmin();
  const supabase = createAdminClient();
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) { console.error(error); throw new Error("Erreur lors de la suppression"); }
  revalidatePath("/admin/produits");
  revalidatePath("/");
}

export async function getProductById(id: string): Promise<Product | null> {
  await requireAdmin();
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();
  if (error) return null;
  return data as Product;
}

export async function getProducts(): Promise<Product[]> {
  await requireAdmin();
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("products")
    .select("*, categories(name), brands(name)")
    .order("created_at", { ascending: false });
  if (error) { console.error(error); throw new Error("Erreur lors du chargement"); }
  return (data as unknown as Product[]) ?? [];
}

export async function getPublishedProducts(): Promise<Product[]> {
  const { createClient } = await import("@/lib/supabase/server");
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*, categories(name), brands(name)")
    .eq("is_published", true)
    .order("created_at", { ascending: false });
  if (error) { console.error(error); throw new Error("Erreur lors du chargement"); }
  return (data as unknown as Product[]) ?? [];
}
