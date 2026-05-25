"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
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
  const supabase = createAdminClient();

  const name = formData.get("name") as string;
  const price = parseFloat(formData.get("price") as string);
  const sale_price = formData.get("sale_price")
    ? parseFloat(formData.get("sale_price") as string)
    : null;

  const payload = {
    slug: slugify(name),
    name,
    brand_id: (formData.get("brand_id") as string) || null,
    category_id: (formData.get("category_id") as string) || null,
    description: (formData.get("description") as string) || null,
    price,
    sale_price,
    stock: parseInt(formData.get("stock") as string) || 0,
    images: JSON.parse((formData.get("images") as string) || "[]"),
    featured_promo: formData.get("featured_promo") === "true",
    featured_bestseller: formData.get("featured_bestseller") === "true",
    is_published: formData.get("is_published") !== "false",
    meta_title: (formData.get("meta_title") as string) || null,
    meta_description: (formData.get("meta_description") as string) || null,
  };

  const { error } = await supabase.from("products").insert(payload);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/produits");
  revalidatePath("/boutique");
  revalidatePath("/");
}

export async function updateProduct(id: string, formData: FormData) {
  const supabase = createAdminClient();

  const name = formData.get("name") as string;
  const price = parseFloat(formData.get("price") as string);
  const sale_price = formData.get("sale_price")
    ? parseFloat(formData.get("sale_price") as string)
    : null;

  const payload = {
    name,
    brand_id: (formData.get("brand_id") as string) || null,
    category_id: (formData.get("category_id") as string) || null,
    description: (formData.get("description") as string) || null,
    price,
    sale_price,
    stock: parseInt(formData.get("stock") as string) || 0,
    images: JSON.parse((formData.get("images") as string) || "[]"),
    featured_promo: formData.get("featured_promo") === "true",
    featured_bestseller: formData.get("featured_bestseller") === "true",
    is_published: formData.get("is_published") !== "false",
    meta_title: (formData.get("meta_title") as string) || null,
    meta_description: (formData.get("meta_description") as string) || null,
  };

  const { error } = await supabase.from("products").update(payload).eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/produits");
  revalidatePath(`/produit/${formData.get("slug")}`);
  revalidatePath("/");
}

export async function deleteProduct(id: string) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/produits");
  revalidatePath("/");
}

export async function getProductById(id: string): Promise<Product | null> {
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
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("products")
    .select("*, categories(name), brands(name)")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data as unknown as Product[]) ?? [];
}
