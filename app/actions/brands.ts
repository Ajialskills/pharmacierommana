"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Brand } from "@/types";

export async function getBrands(): Promise<Brand[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("brands")
    .select("*")
    .order("name");
  if (error) throw new Error(error.message);
  return data ?? [];
}

interface BrandPayload {
  name: string;
  slug: string;
  logo_url?: string | null;
}

export async function createBrand(payload: BrandPayload) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("brands").insert(payload);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/marques");
  revalidatePath("/marques");
}

export async function updateBrand(id: string, payload: BrandPayload) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("brands").update(payload).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/marques");
  revalidatePath(`/marques/${payload.slug}`);
}

export async function deleteBrand(id: string) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("brands").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/marques");
}

export async function getFeaturedBrands(): Promise<Brand[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("brands")
    .select("*")
    .eq("is_featured", true)
    .order("name");
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function getBrandBySlug(slug: string): Promise<Brand | null> {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("brands")
    .select("*")
    .eq("slug", slug)
    .single();
  return data ?? null;
}
