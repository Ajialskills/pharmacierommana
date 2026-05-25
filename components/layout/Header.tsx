import Image from "next/image";
import Link from "next/link";
import CartButton from "./CartButton";
import { createClient } from "@/lib/supabase/server";
import type { Category } from "@/types";

const NAV_CATEGORIES = [
  { label: "Accueil", href: "/", slug: null },
  { label: "Bébé & Maman", href: "/boutique/bebe-et-maman", slug: "bebe-et-maman" },
  { label: "Visage", href: "/boutique/visage", slug: "visage" },
  { label: "Corps", href: "/boutique/corps", slug: "corps" },
  { label: "Cheveux", href: "/boutique/cheveux", slug: "cheveux" },
  { label: "Hygiène", href: "/boutique/hygiene", slug: "hygiene" },
  { label: "Santé", href: "/boutique/sante", slug: "sante" },
  { label: "Solaire", href: "/boutique/solaire", slug: "solaire" },
  { label: "Homme", href: "/boutique/homme", slug: "homme" },
];

export default async function Header() {
  const supabase = await createClient();
  const { data: allCategories } = await supabase
    .from("categories")
    .select("id, slug, name, parent_id")
    .order("sort_order");

  type NavCategory = Pick<Category, "id" | "slug" | "name" | "parent_id">;
  const categories: NavCategory[] = allCategories ?? [];

  // Map slug → id for top-level categories
  const slugToId: Record<string, string> = {};
  categories.forEach((c) => {
    if (!c.parent_id) slugToId[c.slug] = c.id;
  });

  // Map parent_id → subcategories
  const subMap: Record<string, NavCategory[]> = {};
  categories.forEach((c) => {
    if (c.parent_id) {
      if (!subMap[c.parent_id]) subMap[c.parent_id] = [];
      subMap[c.parent_id].push(c);
    }
  });

  return (
    <header className="sticky top-0 z-[100] bg-white border-b border-[var(--color-border-subtle)] shadow-sm">
      {/* Main bar */}
      <div className="w-full px-8 h-20 flex items-center gap-6">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/Logo Rommana.png"
            alt="Pharmacie Rommana"
            width={160}
            height={64}
            className="h-12 md:h-16 w-auto object-contain"
            priority
          />
        </Link>

        {/* Search — desktop */}
        <div className="hidden md:flex flex-1 relative">
          <input
            type="text"
            placeholder="Rechercher des produits..."
            className="w-full bg-[var(--color-background-soft)] border border-[var(--color-border-subtle)] rounded-full px-6 py-2.5 text-[var(--color-on-surface)] placeholder:text-[var(--color-outline)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all text-sm"
          />
          <button
            aria-label="Rechercher"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-primary)]"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
          </button>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-6 flex-shrink-0">
          {/* Phone — large screens */}
          <div className="hidden lg:flex flex-col items-end">
            <span className="text-xs font-semibold text-[var(--color-on-surface-variant)] uppercase tracking-wide">
              Besoin d&apos;aide ?
            </span>
            <a href="tel:0539714272" className="font-bold text-[var(--color-primary)] text-sm">
              05 39 71 42 72
            </a>
          </div>

          {/* Icon buttons */}
          <div className="flex items-center gap-7">
            <Link href="/favoris" aria-label="Favoris" className="text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)] transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </Link>
            <CartButton />
            <Link href="/mon-compte" aria-label="Mon compte" className="text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)] transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Category nav — desktop */}
      <nav aria-label="Catégories" className="hidden md:block bg-[#00696E]">
        <ul className="w-full px-8 flex items-center justify-center gap-8 py-2.5">
          {NAV_CATEGORIES.map((item) => {
            const parentId = item.slug ? slugToId[item.slug] : null;
            const subs = parentId ? (subMap[parentId] ?? []) : [];

            return (
              <li key={item.href} className="relative group">
                <Link
                  href={item.href}
                  className="flex items-center gap-1 text-xs font-bold tracking-widest uppercase text-white/80 hover:text-white transition-colors py-2"
                >
                  {item.label}
                  {subs.length > 0 && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="mt-px">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  )}
                </Link>

                {subs.length > 0 && (
                  <div className="absolute top-full left-0 pt-1 hidden group-hover:block z-50 min-w-[180px]">
                    <div className="bg-white border border-[var(--color-border-subtle)] rounded-xl shadow-lg py-1.5 overflow-hidden">
                      {subs.map((sub) => (
                        <Link
                          key={sub.id}
                          href={`/boutique/${sub.slug}`}
                          className="block px-4 py-2 text-sm text-[var(--color-on-surface-variant)] hover:bg-[var(--color-surface-container-low)] hover:text-[var(--color-primary)] transition-colors"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
