import type { PharmacieDeGarde } from "@/types";

interface QuickActionsGridProps {
  deGarde: PharmacieDeGarde | null;
}

export default function QuickActionsGrid({ deGarde }: QuickActionsGridProps) {
  return (
    <section aria-label="Actions rapides" className="py-6 bg-[var(--color-surface-container-low)]">
      <div style={{ maxWidth: "var(--spacing-max-width)" }} className="mx-auto px-[var(--spacing-lg)] grid md:grid-cols-2 gap-[var(--spacing-gutter)]">

        {/* Pharmacie de Garde */}
        {deGarde ? (
          <a
            href={deGarde.pdf_url}
            target="_blank"
            rel="noopener noreferrer"
            className="relative group overflow-hidden h-28 rounded-2xl flex items-center justify-center gap-8 px-10 bg-[var(--color-primary)] hover:brightness-110 transition-[filter] duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <div className="absolute inset-0 bg-black/10 pointer-events-none" />
            <div className="relative z-10 text-white">
              <span
                style={{ fontSize: "var(--text-label-caps)", letterSpacing: "var(--text-label-caps--letter-spacing)" }}
                className="block font-semibold uppercase opacity-80 mb-1"
              >
                Urgence Tétouan
              </span>
              <h2
                style={{ fontSize: "var(--text-headline-lg)", lineHeight: "var(--text-headline-lg--line-height)", fontWeight: "var(--text-headline-lg--font-weight)" }}
              >
                Pharmacie de Garde
              </h2>
            </div>
            <span className="relative z-10 inline-flex items-center gap-2 bg-white text-[var(--color-primary)] px-4 py-2 rounded-lg font-semibold text-sm flex-shrink-0">
              Voir la liste
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            </span>
          </a>
        ) : (
          <div className="relative overflow-hidden h-28 rounded-2xl flex items-center justify-center gap-8 px-10 bg-[var(--color-primary)]">
            <div className="absolute inset-0 bg-black/10 pointer-events-none" />
            <div className="relative z-10 text-white">
              <span
                style={{ fontSize: "var(--text-label-caps)", letterSpacing: "var(--text-label-caps--letter-spacing)" }}
                className="block font-semibold uppercase opacity-80 mb-1"
              >
                Urgence Tétouan
              </span>
              <h2
                style={{ fontSize: "var(--text-headline-lg)", lineHeight: "var(--text-headline-lg--line-height)", fontWeight: "var(--text-headline-lg--font-weight)" }}
              >
                Pharmacie de Garde
              </h2>
            </div>
            <span className="relative z-10 inline-block bg-white/20 text-white px-4 py-2 rounded-lg font-semibold text-sm flex-shrink-0">
              Bientôt disponible
            </span>
          </div>
        )}

        {/* WhatsApp Consultation */}
        <a
          href="https://wa.me/212641337443"
          target="_blank"
          rel="noopener noreferrer"
          className="relative group overflow-hidden h-28 rounded-2xl flex items-center justify-center gap-8 px-10 bg-[var(--color-secondary)] hover:brightness-110 transition-[filter] duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-secondary)] to-transparent pointer-events-none" />
          <div className="relative z-10 text-white">
            <span
              style={{ fontSize: "var(--text-label-caps)", letterSpacing: "var(--text-label-caps--letter-spacing)" }}
              className="block font-semibold uppercase opacity-80 mb-1"
            >
              Conseil médical
            </span>
            <h2
              style={{ fontSize: "var(--text-headline-lg)", lineHeight: "var(--text-headline-lg--line-height)", fontWeight: "var(--text-headline-lg--font-weight)" }}
            >
              Votre Consultation
            </h2>
          </div>
          <span className="relative z-10 inline-flex items-center gap-2 bg-[var(--color-success-green)] text-white px-4 py-2 rounded-lg font-semibold text-sm flex-shrink-0">
            WhatsApp Direct
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </span>
        </a>

      </div>
    </section>
  );
}
