"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireAdmin } from "@/lib/supabase/require-admin";
import type { Article } from "@/types";

function slugify(str: string) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function getArticles(): Promise<Article[]> {
  await requireAdmin();
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .order("published_at", { ascending: false });
  if (error) { console.error(error); throw new Error("Erreur lors du chargement"); }
  return data ?? [];
}

export async function getArticleById(id: string): Promise<Article | null> {
  await requireAdmin();
  const supabase = createAdminClient();
  const { data, error } = await supabase.from("articles").select("*").eq("id", id).single();
  if (error) {
    if (error.code === "PGRST116") return null;
    throw new Error(error.message);
  }
  return data;
}

export async function getPublishedArticles(): Promise<Article[]> {
  const { createClient } = await import("@/lib/supabase/server");
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("is_published", true)
    .order("published_at", { ascending: false });
  if (error) { console.error(error); throw new Error("Erreur lors du chargement"); }
  return data ?? [];
}

export async function createArticle(formData: FormData) {
  await requireAdmin();
  const supabase = createAdminClient();
  const title = formData.get("title") as string;
  const { error } = await supabase.from("articles").insert({
    slug: slugify(title),
    title,
    excerpt: (formData.get("excerpt") as string) || null,
    body: (formData.get("body") as string) || null,
    cover_image: (formData.get("cover_image") as string) || null,
    is_published: formData.get("is_published") === "true",
    published_at: formData.get("is_published") === "true" ? new Date().toISOString() : null,
  });
  if (error) { console.error(error); throw new Error("Erreur lors de la création"); }
  revalidatePath("/admin/carnet");
  revalidatePath("/blog");
}

export async function updateArticle(id: string, formData: FormData) {
  await requireAdmin();
  const supabase = createAdminClient();
  const title = formData.get("title") as string;

  const { data: existing } = await supabase.from("articles").select("slug").eq("id", id).single();

  const { error } = await supabase.from("articles").update({
    title,
    excerpt: (formData.get("excerpt") as string) || null,
    body: (formData.get("body") as string) || null,
    cover_image: (formData.get("cover_image") as string) || null,
    is_published: formData.get("is_published") === "true",
    updated_at: new Date().toISOString(),
  }).eq("id", id);
  if (error) { console.error(error); throw new Error("Erreur lors de la mise à jour"); }
  revalidatePath("/admin/carnet");
  revalidatePath("/blog");
  if (existing?.slug) revalidatePath(`/blog/${existing.slug}`);
}

export async function deleteArticle(id: string) {
  await requireAdmin();
  const supabase = createAdminClient();
  const { error } = await supabase.from("articles").delete().eq("id", id);
  if (error) { console.error(error); throw new Error("Erreur lors de la suppression"); }
  revalidatePath("/admin/carnet");
  revalidatePath("/blog");
}
