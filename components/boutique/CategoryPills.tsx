"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Category } from "@/types";

const VISIBLE = 4;

interface Props {
  categories: Category[];
}

export default function CategoryPills({ categories }: Props) {
  const router = useRouter();
  const params = useSearchParams();
  const active = params.get("categorie");
  const [expanded, setExpanded] = useState(false);

  function select(id: string | null) {
    const next = new URLSearchParams(params.toString());
    if (id) next.set("categorie", id);
    else next.delete("categorie");
    next.delete("page");
    router.push(`/boutique?${next.toString()}`);
  }

  const topLevel = categories.filter((c) => !c.parent_id);
  const visible = expanded ? topLevel : topLevel.slice(0, VISIBLE);
  const hidden = topLevel.length - VISIBLE;

  const pillCls = (isActive: boolean) =>
    `flex-shrink-0 px-3 py-1 rounded-full text-xs font-semibold border transition-all whitespace-nowrap ${
      isActive
        ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)]"
        : "bg-white text-[var(--color-on-surface-variant)] border-[var(--color-border-subtle)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
    }`;

  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-2">
        <button onClick={() => select(null)} className={pillCls(!active)}>
          Tous
        </button>
        {visible.map((cat) => (
          <button key={cat.id} onClick={() => select(cat.id)} className={pillCls(active === cat.id)}>
            {cat.name}
          </button>
        ))}
        {!expanded && hidden > 0 && (
          <button
            onClick={() => setExpanded(true)}
            className="flex-shrink-0 px-3 py-1 rounded-full text-xs font-semibold border border-dashed border-[var(--color-border-subtle)] text-[var(--color-on-surface-variant)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-all whitespace-nowrap"
          >
            +{hidden} autres
          </button>
        )}
        {expanded && (
          <button
            onClick={() => setExpanded(false)}
            className="flex-shrink-0 px-3 py-1 rounded-full text-xs font-semibold border border-dashed border-[var(--color-border-subtle)] text-[var(--color-on-surface-variant)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-all whitespace-nowrap"
          >
            Moins
          </button>
        )}
      </div>
    </div>
  );
}
