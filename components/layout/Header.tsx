import Image from "next/image";
import Link from "next/link";
import SearchAutocomplete from "./SearchAutocomplete";
import HeaderCategoryNav from "./HeaderCategoryNav";
import LanguageToggle from "./LanguageToggle";
import HeaderActions from "./HeaderActions";
import { createClient } from "@/lib/supabase/server";
import type { Category } from "@/types";

export default async function Header() {
  const supabase = await createClient();
  const { data: allCategories } = await supabase
    .from("categories")
    .select("id, slug, name, parent_id")
    .order("sort_order");

  type NavCategory = Pick<Category, "id" | "slug" | "name" | "parent_id">;
  const categories: NavCategory[] = allCategories ?? [];

  const slugToId: Record<string, string> = {};
  categories.forEach((c) => {
    if (!c.parent_id) slugToId[c.slug] = c.id;
  });

  const subMap: Record<string, NavCategory[]> = {};
  categories.forEach((c) => {
    if (c.parent_id) {
      if (!subMap[c.parent_id]) subMap[c.parent_id] = [];
      subMap[c.parent_id].push(c);
    }
  });

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:bg-[var(--color-primary)] focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:font-semibold focus:text-sm"
      >
        Aller au contenu principal
      </a>
      <header className="bg-white border-b border-[var(--color-border-subtle)] shadow-sm">
        {/* Main bar */}
        <div className="w-full px-8 h-20 flex items-center gap-6">
          {/* Logo */}
          <Link href="/accueil" className="flex-shrink-0">
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
          <SearchAutocomplete />

          {/* Right actions (client — translated) */}
          <HeaderActions />

          {/* Language toggle */}
          <LanguageToggle />
        </div>

        {/* Category nav — client (translated) */}
        <HeaderCategoryNav slugToId={slugToId} subMap={subMap} />
      </header>
    </>
  );
}
