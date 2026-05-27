"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireAdmin } from "@/lib/supabase/require-admin";
import type { Brand } from "@/types";

export async function getBrands(): Promise<Brand[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("brands")
    .select("*")
    .order("name");
  if (error) { console.error(error); throw new Error("Erreur lors du chargement"); }
  return data ?? [];
}

interface BrandPayload {
  name: string;
  slug: string;
  logo_url?: string | null;
}

export async function createBrand(payload: BrandPayload) {
  await requireAdmin();
  const supabase = createAdminClient();
  const { error } = await supabase.from("brands").insert(payload);
  if (error) { console.error(error); throw new Error("Erreur lors de la création"); }
  revalidatePath("/admin/marques");
  revalidatePath("/marques");
}

export async function updateBrand(id: string, payload: BrandPayload) {
  await requireAdmin();
  const supabase = createAdminClient();
  const { error } = await supabase.from("brands").update(payload).eq("id", id);
  if (error) { console.error(error); throw new Error("Erreur lors de la mise à jour"); }
  revalidatePath("/admin/marques");
  revalidatePath("/marques");
  revalidatePath(`/marques/${payload.slug}`);
}

export async function deleteBrand(id: string) {
  await requireAdmin();
  const supabase = createAdminClient();
  const { error } = await supabase.from("brands").delete().eq("id", id);
  if (error) { console.error(error); throw new Error("Erreur lors de la suppression"); }
  revalidatePath("/admin/marques");
}

export async function getFeaturedBrands(): Promise<Brand[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("brands")
    .select("*")
    .eq("is_featured", true)
    .order("name");
  if (error) { console.error(error); throw new Error("Erreur lors du chargement"); }
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
