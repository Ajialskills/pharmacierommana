import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import MonCompteClient from "./MonCompteClient";

export default async function MonComptePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/connexion");

  return (
    <div style={{ maxWidth: "var(--spacing-max-width)" }} className="mx-auto px-[var(--spacing-lg)] py-10">
      <MonCompteClient user={user} />
    </div>
  );
}
