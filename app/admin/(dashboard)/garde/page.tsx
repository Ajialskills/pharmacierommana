import { getGardeHistory, createGardeEntry, deleteGardeEntry } from "@/app/actions/garde";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pharmacie de Garde — Admin",
};

export default async function AdminGardePage() {
  const history = await getGardeHistory();
  const current = history[0] ?? null;

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--color-on-surface)]">Pharmacie de Garde</h1>
        <p className="text-sm text-[var(--color-on-surface-variant)] mt-1">
          Mettez à jour le PDF hebdomadaire des pharmacies de garde à Tétouan.
        </p>
      </div>

      {/* Current entry */}
      {current && (
        <div className="bg-[color-mix(in_srgb,var(--color-primary)_6%,transparent)] border border-[color-mix(in_srgb,var(--color-primary)_20%,transparent)] rounded-2xl p-5 mb-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-primary)] mb-1">Semaine active</p>
          <p className="font-bold text-[var(--color-on-surface)]">
            Semaine du {new Date(current.week_start_date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
          </p>
          <a
            href={current.pdf_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[var(--color-primary)] hover:underline mt-1 inline-block"
          >
            Voir le PDF →
          </a>
        </div>
      )}

      {/* New entry form */}
      <div className="bg-white border border-[var(--color-border-subtle)] rounded-2xl p-6 mb-8">
        <h2 className="font-bold text-[var(--color-on-surface)] mb-5">Ajouter une nouvelle semaine</h2>
        <form
          action={async (formData: FormData) => {
            "use server";
            const week = formData.get("week_start_date") as string;
            const url = (formData.get("pdf_url") as string).trim();
            await createGardeEntry(week, url);
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-xs font-semibold text-[var(--color-on-surface-variant)] uppercase tracking-wide mb-1.5">
              Début de semaine (lundi)
            </label>
            <input
              type="date"
              name="week_start_date"
              required
              className="w-full border border-[var(--color-border-subtle)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[var(--color-on-surface-variant)] uppercase tracking-wide mb-1.5">
              URL du PDF (Cloudinary)
            </label>
            <input
              type="url"
              name="pdf_url"
              required
              placeholder="https://res.cloudinary.com/…/garde-semaine.pdf"
              className="w-full border border-[var(--color-border-subtle)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
            <p className="text-xs text-[var(--color-on-surface-variant)] mt-1.5">
              Uploadez le PDF sur Cloudinary, puis collez l&apos;URL ici.
            </p>
          </div>
          <button
            type="submit"
            className="bg-[var(--color-primary)] text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity"
          >
            Publier
          </button>
        </form>
      </div>

      {/* History */}
      {history.length > 0 && (
        <div className="bg-white border border-[var(--color-border-subtle)] rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-[var(--color-border-subtle)]">
            <h2 className="font-bold text-[var(--color-on-surface)] text-sm">Historique</h2>
          </div>
          <ul className="divide-y divide-[var(--color-border-subtle)]">
            {history.map((entry, i) => (
              <li key={entry.id} className="px-6 py-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-[var(--color-on-surface)] flex items-center gap-2">
                    {new Date(entry.week_start_date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                    {i === 0 && (
                      <span className="inline-block bg-[color-mix(in_srgb,var(--color-primary)_12%,transparent)] text-[var(--color-primary)] text-xs font-semibold px-2 py-0.5 rounded-full">
                        Active
                      </span>
                    )}
                  </p>
                  <a
                    href={entry.pdf_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[var(--color-primary)] hover:underline"
                  >
                    Voir le PDF
                  </a>
                </div>
                <form
                  action={async () => {
                    "use server";
                    await deleteGardeEntry(entry.id);
                  }}
                >
                  <button
                    type="submit"
                    className="text-xs font-semibold text-[var(--color-error)] hover:underline"
                  >
                    Supprimer
                  </button>
                </form>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
