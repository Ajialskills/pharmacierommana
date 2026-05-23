"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Brand } from "@/types";

function slugify(str: string) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function getBrands(): Promise<Brand[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("brands")
    .select("*")
    .order("name");
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function createBrand(formData: FormData) {
  const supabase = createAdminClient();
  const name = formData.get("name") as string;

  const { error } = await supabase.from("brands").insert({
    slug: slugify(name),
    name,
    logo_url: (formData.get("logo_url") as string) || null,
    description: (formData.get("description") as string) || null,
    is_featured: formData.get("is_featured") === "true",
  });

  if (error) throw new Error(error.message);
  revalidatePath("/admin/marques");
  revalidatePath("/marques");
}

export async function updateBrand(id: string, formData: FormData) {
  const supabase = createAdminClient();
  const name = formData.get("name") as string;

  const { error } = await supabase
    .from("brands")
    .update({
      name,
      logo_url: (formData.get("logo_url") as string) || null,
      description: (formData.get("description") as string) || null,
      is_featured: formData.get("is_featured") === "true",
    })
    .eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/admin/marques");
}

export async function deleteBrand(id: string) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("brands").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/marques");
}
