import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";

async function getStats() {
  const supabase = createAdminClient();
  const [products, orders, brands, categories] = await Promise.all([
    supabase.from("products").select("id", { count: "exact", head: true }),
    supabase.from("orders").select("id, total, status", { count: "exact" }),
    supabase.from("brands").select("id", { count: "exact", head: true }),
    supabase.from("categories").select("id", { count: "exact", head: true }),
  ]);

  const pendingOrders = orders.data?.filter((o) => o.status === "pending").length ?? 0;
  const revenue = orders.data?.reduce((sum, o) => sum + (o.total ?? 0), 0) ?? 0;

  return {
    products: products.count ?? 0,
    orders: orders.count ?? 0,
    pendingOrders,
    revenue,
    brands: brands.count ?? 0,
    categories: categories.count ?? 0,
  };
}

export default async function AdminDashboardPage() {
  const stats = await getStats();

  const cards = [
    { label: "Produits", value: stats.products, href: "/admin/produits", color: "var(--color-primary)" },
    { label: "Commandes", value: stats.orders, href: "/admin/commandes", color: "var(--color-secondary)" },
    { label: "En attente", value: stats.pendingOrders, href: "/admin/commandes", color: "var(--color-warning-amber)" },
    { label: "Revenu total", value: `${stats.revenue.toLocaleString("fr-MA")} MAD`, href: "/admin/commandes", color: "var(--color-success-green)" },
    { label: "Marques", value: stats.brands, href: "/admin/marques", color: "var(--color-primary)" },
    { label: "Catégories", value: stats.categories, href: "/admin/categories", color: "var(--color-secondary)" },
  ];

  const shortcuts = [
    { label: "+ Nouveau produit", href: "/admin/produits/nouveau" },
    { label: "Voir les commandes", href: "/admin/commandes" },
    { label: "Gérer le carnet", href: "/admin/carnet" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-xl font-bold text-[var(--color-on-surface)]">Tableau de bord</h1>
        <p className="text-sm text-[var(--color-on-surface-variant)] mt-0.5">Bienvenue dans l&apos;espace d&apos;administration</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="bg-white border border-[var(--color-border-subtle)] rounded-2xl p-6 hover:shadow-md transition-shadow group"
          >
            <p className="text-xs font-semibold text-[var(--color-on-surface-variant)] uppercase tracking-wide mb-2">{card.label}</p>
            <p className="text-2xl font-bold" style={{ color: card.color }}>{card.value}</p>
          </Link>
        ))}
      </div>

      <div className="bg-white border border-[var(--color-border-subtle)] rounded-2xl p-6">
        <h2 className="font-bold text-[var(--color-on-surface)] mb-4">Accès rapides</h2>
        <div className="flex flex-wrap gap-3">
          {shortcuts.map((s) => (
            <Link
              key={s.label}
              href={s.href}
              className="bg-[var(--color-background-soft)] border border-[var(--color-border-subtle)] px-4 py-2 rounded-xl text-sm font-semibold text-[var(--color-on-surface)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
            >
              {s.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
