import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import MonCompteClient from "./MonCompteClient";
import { getUserOrders } from "@/app/actions/order";
import PageHero from "@/components/layout/PageHero";

export default async function MonComptePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/connexion");

  const orders = await getUserOrders();
  const name = (user.user_metadata?.full_name as string) || user.email || "Mon compte";

  return (
    <>
      <PageHero
        title="Mon Compte"
        subtitle={name}
        crumbs={[{ label: "Mon compte" }]}
      />
      <div style={{ maxWidth: "var(--spacing-max-width)" }} className="mx-auto px-[var(--spacing-lg)] py-10">
        <MonCompteClient user={user} orders={orders} />
      </div>
    </>
  );
}
