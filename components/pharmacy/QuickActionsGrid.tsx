"use client";

import type { PharmacieDeGarde } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";

const GARDE_IMG = "https://plus.unsplash.com/premium_photo-1663047392930-7c1c31d7b785?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8RW50ZXJpbmclMjBhJTIwcGhhcm1hY3l8ZW58MHx8MHx8fDA%3D";
const CONSULT_IMG = "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=900&q=80&auto=format&fit=crop";

interface QuickActionsGridProps {
  deGarde: PharmacieDeGarde | null;
}

export default function QuickActionsGrid({ deGarde }: QuickActionsGridProps) {
  const { tr } = useLanguage();

  return (
    <section aria-label={tr("general.pharmacie_de_garde")} className="py-6 bg-[var(--color-surface-container-low)]">
      <div style={{ maxWidth: "var(--spacing-max-width)" }} className="mx-auto px-[var(--spacing-lg)] grid md:grid-cols-2 gap-[var(--spacing-gutter)]">

        {/* Pharmacie de Garde */}
        {deGarde ? (
          <a
            href={deGarde.pdf_url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col overflow-hidden rounded-3xl shadow-sm hover:shadow-lg transition-shadow duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
          >
            {/* Image */}
            <div className="relative overflow-hidden aspect-[2/1]">
              <img
                src={GARDE_IMG}
                alt=""
                aria-hidden="true"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            {/* Strip */}
            <div className="bg-[var(--color-primary)] px-7 py-5 flex items-center justify-between gap-4">
              <div className="text-white">
                <span className="block text-xs font-semibold uppercase tracking-widest opacity-70 mb-1">
                  {tr("pharmacy.garde_title")}
                </span>
                <h2 className="text-xl font-bold leading-snug">
                  {tr("pharmacy.garde_title")}
                </h2>
              </div>
              <span className="shrink-0 inline-flex items-center gap-2 bg-white text-[var(--color-primary)] px-4 py-2.5 rounded-xl font-bold text-sm whitespace-nowrap">
                {tr("pharmacy.garde_download")}
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              </span>
            </div>
          </a>
        ) : (
          <div className="flex flex-col overflow-hidden rounded-3xl shadow-sm">
            <div className="relative overflow-hidden aspect-[2/1]">
              <img
                src={GARDE_IMG}
                alt=""
                aria-hidden="true"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="bg-[var(--color-primary)] px-7 py-5 flex items-center justify-between gap-4">
              <div className="text-white">
                <span className="block text-xs font-semibold uppercase tracking-widest opacity-70 mb-1">
                  {tr("pharmacy.garde_title")}
                </span>
                <h2 className="text-xl font-bold leading-snug">
                  {tr("pharmacy.garde_title")}
                </h2>
              </div>
              <span className="shrink-0 inline-block bg-white/20 text-white px-4 py-2.5 rounded-xl font-bold text-sm whitespace-nowrap">
                {tr("pharmacy.garde_none")}
              </span>
            </div>
          </div>
        )}

        {/* WhatsApp Consultation */}
        <a
          href="https://wa.me/212641337443"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col overflow-hidden rounded-3xl shadow-sm hover:shadow-lg transition-shadow duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-secondary)]"
        >
          {/* Image */}
          <div className="relative overflow-hidden aspect-[2/1]">
            <img
              src={CONSULT_IMG}
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          {/* Strip */}
          <div className="bg-[var(--color-secondary)] px-7 py-5 flex items-center justify-between gap-4">
            <div className="text-white">
              <span className="block text-xs font-semibold uppercase tracking-widest opacity-70 mb-1">
                {tr("pharmacy.consult_sub")}
              </span>
              <h2 className="text-xl font-bold leading-snug">
                {tr("pharmacy.consult_title")}
              </h2>
            </div>
            <span className="shrink-0 inline-flex items-center gap-2 bg-[#25D366] text-white px-4 py-2.5 rounded-xl font-bold text-sm whitespace-nowrap">
              {tr("pharmacy.consult_cta")}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </span>
          </div>
        </a>

      </div>
    </section>
  );
}
