"use client";

import { useState, useTransition } from "react";
import {
  createCategory,
  updateCategory,
  deleteCategory,
} from "@/app/actions/categories";
import type { Category } from "@/types";

interface Props {
  categories: Category[];
}

export default function CategoriesManager({ categories }: Props) {
  const [isPending, startTransition] = useTransition();
  const [editing, setEditing] = useState<Category | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const topLevel = categories.filter((c) => !c.parent_id);
  const childrenOf = (id: string) => categories.filter((c) => c.parent_id === id);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const data = new FormData(form);

    startTransition(async () => {
      try {
        if (editing) {
          await updateCategory(editing.id, data);
        } else {
          await createCategory(data);
        }
        setEditing(null);
        setShowForm(false);
        form.reset();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur");
      }
    });
  }

  function handleDelete(id: string, name: string) {
    if (!confirm(`Supprimer « ${name} » ?`)) return;
    startTransition(async () => {
      try {
        await deleteCategory(id);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur");
      }
    });
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-bold text-[var(--color-on-surface)]">Catégories</h1>
          <p className="text-sm text-[var(--color-on-surface-variant)] mt-0.5">{categories.length} catégories</p>
        </div>
        <button
          onClick={() => { setEditing(null); setShowForm(true); }}
          className="bg-[var(--color-primary)] text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:opacity-90 transition-opacity"
        >
          + Nouvelle catégorie
        </button>
      </div>

      {error && (
        <p className="text-sm text-[var(--color-error)] bg-[var(--color-error-container)] px-4 py-3 rounded-xl mb-6">
          {error}
        </p>
      )}

      {/* Form */}
      {(showForm || editing) && (
        <form onSubmit={handleSubmit} className="bg-white border border-[var(--color-border-subtle)] rounded-2xl p-6 mb-8 space-y-4">
          <h2 className="font-bold text-[var(--color-on-surface)]">
            {editing ? "Modifier" : "Nouvelle catégorie"}
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[var(--color-on-surface-variant)] mb-1.5 uppercase tracking-wide">Nom *</label>
              <input name="name" required defaultValue={editing?.name} className="w-full border border-[var(--color-border-subtle)] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[var(--color-on-surface-variant)] mb-1.5 uppercase tracking-wide">Catégorie parente</label>
              <select name="parent_id" defaultValue={editing?.parent_id ?? ""} className="w-full border border-[var(--color-border-subtle)] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]">
                <option value="">— Niveau racine —</option>
                {topLevel.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[var(--color-on-surface-variant)] mb-1.5 uppercase tracking-wide">Ordre</label>
              <input name="sort_order" type="number" defaultValue={editing?.sort_order ?? 0} className="w-full border border-[var(--color-border-subtle)] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[var(--color-on-surface-variant)] mb-1.5 uppercase tracking-wide">Description</label>
              <input name="description" defaultValue={editing?.description ?? ""} className="w-full border border-[var(--color-border-subtle)] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]" />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={isPending} className="bg-[var(--color-primary)] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:opacity-90 disabled:opacity-60 transition-opacity">
              {isPending ? "Enregistrement…" : "Enregistrer"}
            </button>
            <button type="button" onClick={() => { setEditing(null); setShowForm(false); }} className="px-5 py-2.5 rounded-xl text-sm font-semibold border border-[var(--color-border-subtle)] hover:bg-[var(--color-background-soft)] transition-colors">
              Annuler
            </button>
          </div>
        </form>
      )}

      {/* Tree */}
      <div className="bg-white border border-[var(--color-border-subtle)] rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--color-border-subtle)] bg-[var(--color-background-soft)]">
              <th className="text-left px-6 py-3 text-xs font-semibold text-[var(--color-on-surface-variant)] uppercase tracking-wide">Nom</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-[var(--color-on-surface-variant)] uppercase tracking-wide">Slug</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-[var(--color-on-surface-variant)] uppercase tracking-wide">Sous-catégories</th>
              <th className="px-6 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-border-subtle)]">
            {topLevel.map((cat) => (
              <>
                <tr key={cat.id} className="hover:bg-[var(--color-background-soft)]">
                  <td className="px-6 py-4 font-semibold text-[var(--color-on-surface)]">{cat.name}</td>
                  <td className="px-6 py-4 text-[var(--color-on-surface-variant)] font-mono text-xs">{cat.slug}</td>
                  <td className="px-6 py-4 text-[var(--color-on-surface-variant)]">{childrenOf(cat.id).length}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2 justify-end">
                      <button onClick={() => { setEditing(cat); setShowForm(false); }} className="text-xs font-semibold text-[var(--color-primary)] hover:underline">Modifier</button>
                      <button onClick={() => handleDelete(cat.id, cat.name)} className="text-xs font-semibold text-[var(--color-error)] hover:underline">Supprimer</button>
                    </div>
                  </td>
                </tr>
                {childrenOf(cat.id).map((sub) => (
                  <tr key={sub.id} className="hover:bg-[var(--color-background-soft)] bg-[color-mix(in_srgb,var(--color-background-soft)_50%,transparent)]">
                    <td className="px-6 py-3 text-[var(--color-on-surface-variant)] pl-12">↳ {sub.name}</td>
                    <td className="px-6 py-3 text-[var(--color-on-surface-variant)] font-mono text-xs">{sub.slug}</td>
                    <td className="px-6 py-3" />
                    <td className="px-6 py-3">
                      <div className="flex gap-2 justify-end">
                        <button onClick={() => { setEditing(sub); setShowForm(false); }} className="text-xs font-semibold text-[var(--color-primary)] hover:underline">Modifier</button>
                        <button onClick={() => handleDelete(sub.id, sub.name)} className="text-xs font-semibold text-[var(--color-error)] hover:underline">Supprimer</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
