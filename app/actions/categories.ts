"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireAdmin } from "@/lib/supabase/require-admin";
import type { Category } from "@/types";

function slugify(str: string) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function getCategories(): Promise<Category[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order");
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function createCategory(formData: FormData) {
  await requireAdmin();
  const supabase = createAdminClient();
  const name = formData.get("name") as string;

  const { error } = await supabase.from("categories").insert({
    slug: slugify(name),
    name,
    parent_id: (formData.get("parent_id") as string) || null,
    description: (formData.get("description") as string) || null,
    sort_order: parseInt(formData.get("sort_order") as string) || 0,
  });

  if (error) throw new Error(error.message);
  revalidatePath("/admin/categories");
  revalidatePath("/boutique");
}

export async function updateCategory(id: string, formData: FormData) {
  await requireAdmin();
  const supabase = createAdminClient();
  const name = formData.get("name") as string;

  const { error } = await supabase
    .from("categories")
    .update({
      name,
      parent_id: (formData.get("parent_id") as string) || null,
      description: (formData.get("description") as string) || null,
      sort_order: parseInt(formData.get("sort_order") as string) || 0,
    })
    .eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/admin/categories");
}

export async function deleteCategory(id: string) {
  await requireAdmin();
  const supabase = createAdminClient();
  const { error } = await supabase.from("categories").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/categories");
}
