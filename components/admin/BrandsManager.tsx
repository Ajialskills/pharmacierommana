"use client";

import { useState, useTransition } from "react";
import { createBrand, updateBrand, deleteBrand } from "@/app/actions/brands";
import type { Brand } from "@/types";

interface Props {
  brands: Brand[];
}

export default function BrandsManager({ brands }: Props) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<Brand | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [logoUrl, setLogoUrl] = useState("");

  function openCreate() {
    setEditing(null);
    setName("");
    setSlug("");
    setLogoUrl("");
    setShowForm(true);
  }

  function openEdit(brand: Brand) {
    setEditing(brand);
    setName(brand.name);
    setSlug(brand.slug);
    setLogoUrl(brand.logo_url ?? "");
    setShowForm(true);
  }

  function cancel() {
    setShowForm(false);
    setEditing(null);
    setError(null);
  }

  function autoSlug(val: string) {
    return val
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  function handleNameChange(val: string) {
    setName(val);
    if (!editing) setSlug(autoSlug(val));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      try {
        if (editing) {
          await updateBrand(editing.id, { name, slug, logo_url: logoUrl || null });
        } else {
          await createBrand({ name, slug, logo_url: logoUrl || null });
        }
        cancel();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur");
      }
    });
  }

  function handleDelete(id: string, brandName: string) {
    if (!confirm(`Supprimer la marque « ${brandName} » ?`)) return;
    startTransition(async () => {
      try {
        await deleteBrand(id);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur");
      }
    });
  }

  return (
    <div className="space-y-6">
      {error && (
        <p className="text-sm text-[var(--color-error)] bg-[var(--color-error-container)] px-4 py-3 rounded-xl">
          {error}
        </p>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white border border-[var(--color-border-subtle)] rounded-2xl p-6 space-y-4 max-w-lg">
          <h3 className="font-bold text-[var(--color-on-surface)]">
            {editing ? "Modifier la marque" : "Nouvelle marque"}
          </h3>
          <div>
            <label htmlFor="brand-name" className="block text-xs font-semibold text-[var(--color-on-surface-variant)] mb-1.5 uppercase tracking-wide">Nom *</label>
            <input
              id="brand-name"
              required
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              className="w-full border border-[var(--color-border-subtle)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>
          <div>
            <label htmlFor="brand-slug" className="block text-xs font-semibold text-[var(--color-on-surface-variant)] mb-1.5 uppercase tracking-wide">Slug *</label>
            <input
              id="brand-slug"
              required
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full border border-[var(--color-border-subtle)] rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>
          <div>
            <label htmlFor="brand-logo" className="block text-xs font-semibold text-[var(--color-on-surface-variant)] mb-1.5 uppercase tracking-wide">URL du logo</label>
            <input
              id="brand-logo"
              value={logoUrl}
              onChange={(e) => setLogoUrl(e.target.value)}
              placeholder="https://..."
              className="w-full border border-[var(--color-border-subtle)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={isPending}
              className="bg-[var(--color-primary)] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:opacity-90 disabled:opacity-60 transition-opacity"
            >
              {isPending ? "Enregistrement…" : editing ? "Mettre à jour" : "Créer"}
            </button>
            <button
              type="button"
              onClick={cancel}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold border border-[var(--color-border-subtle)] hover:bg-[var(--color-background-soft)] transition-colors"
            >
              Annuler
            </button>
          </div>
        </form>
      )}

      <div className="bg-white border border-[var(--color-border-subtle)] rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border-subtle)]">
          <p className="text-sm text-[var(--color-on-surface-variant)]">{brands.length} marque{brands.length !== 1 ? "s" : ""}</p>
          {!showForm && (
            <button
              onClick={openCreate}
              className="bg-[var(--color-primary)] text-white px-4 py-2 rounded-xl text-sm font-bold hover:opacity-90 transition-opacity"
            >
              + Ajouter
            </button>
          )}
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--color-border-subtle)] bg-[var(--color-background-soft)]">
              <th className="text-left px-6 py-3 text-xs font-semibold text-[var(--color-on-surface-variant)] uppercase tracking-wide">Nom</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-[var(--color-on-surface-variant)] uppercase tracking-wide">Slug</th>
              <th className="px-6 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-border-subtle)]">
            {brands.length === 0 && (
              <tr>
                <td colSpan={3} className="px-6 py-12 text-center text-[var(--color-on-surface-variant)] text-sm">
                  Aucune marque. Cliquez sur « + Ajouter » pour commencer.
                </td>
              </tr>
            )}
            {brands.map((brand) => (
              <tr key={brand.id} className="hover:bg-[var(--color-background-soft)]">
                <td className="px-6 py-4 font-semibold text-[var(--color-on-surface)]">{brand.name}</td>
                <td className="px-6 py-4 text-xs text-[var(--color-on-surface-variant)] font-mono">{brand.slug}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-3 justify-end">
                    <button
                      onClick={() => openEdit(brand)}
                      className="text-xs font-semibold text-[var(--color-primary)] hover:underline"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(brand.id, brand.name)}
                      disabled={isPending}
                      className="text-xs font-semibold text-[var(--color-error)] hover:underline disabled:opacity-50"
                    >
                      Supprimer
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
