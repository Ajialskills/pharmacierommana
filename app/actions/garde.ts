"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";

export interface GardeEntry {
  id: string;
  week_start_date: string;
  pdf_url: string;
  uploaded_at: string;
}

export async function getGardeHistory(): Promise<GardeEntry[]> {
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
  if (!week_start_date || !pdf_url) throw new Error("Date et URL PDF requis.");
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("pharmacie_de_garde")
    .insert({ week_start_date, pdf_url, uploaded_at: new Date().toISOString() });
  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath("/admin/garde");
}

export async function deleteGardeEntry(id: string): Promise<void> {
  const supabase = createAdminClient();
  const { error } = await supabase.from("pharmacie_de_garde").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath("/admin/garde");
}
