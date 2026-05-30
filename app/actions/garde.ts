"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/supabase/require-admin";

export interface GardeEntry {
  id: string;
  week_start_date: string;
  pdf_url: string;
  uploaded_at: string;
}

export async function getGardeHistory(): Promise<GardeEntry[]> {
  await requireAdmin();
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("pharmacie_de_garde")
    .select("id, week_start_date, pdf_url, uploaded_at")
    .order("week_start_date", { ascending: false })
    .limit(10);
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function createGardeEntry(week_start_date: string, pdf_url: string): Promise<void> {
  await requireAdmin();
  if (!week_start_date || !pdf_url) throw new Error("Date et URL PDF requis.");
  if (!pdf_url.startsWith("https://")) throw new Error("L'URL PDF doit commencer par https://");
  const day = new Date(week_start_date).getDay();
  if (day !== 1) throw new Error("La date de début de semaine doit être un lundi.");
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("pharmacie_de_garde")
    .insert({ week_start_date, pdf_url, uploaded_at: new Date().toISOString() });
  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath("/admin/garde");
}

export async function deleteGardeEntry(id: string): Promise<void> {
  await requireAdmin();
  const supabase = createAdminClient();
  const { error } = await supabase.from("pharmacie_de_garde").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath("/admin/garde");
}
