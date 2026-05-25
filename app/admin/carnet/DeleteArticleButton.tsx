"use client";

import { useTransition } from "react";
import { deleteArticle } from "@/app/actions/articles";

interface Props {
  id: string;
  title: string;
}

export default function DeleteArticleButton({ id, title }: Props) {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    if (!confirm(`Supprimer « ${title} » ?`)) return;
    startTransition(() => deleteArticle(id));
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="text-xs font-semibold text-[var(--color-error)] hover:underline disabled:opacity-50"
    >
      Supprimer
    </button>
  );
}
