"use client";

import { useLanguage } from "@/contexts/LanguageContext";

interface Props {
  gardeUrl: string | null;
}

const cardClass = "group relative overflow-hidden rounded-3xl flex flex-col items-center justify-center text-center p-8 gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl w-full sm:w-auto sm:flex-1 lg:flex-none min-h-[200px] lg:h-[220px]";
const cardStyle = { maxWidth: "380px", flexShrink: 0 } as const;

export default function PharmacyServicesCards({ gardeUrl }: Props) {
  const { tr } = useLanguage();

  return (
    <section aria-label="Services pharmacie" className="py-10 bg-white">
      <div
        style={{ maxWidth: "1920px" }}
        className="mx-auto px-[var(--spacing-lg)] flex flex-col sm:flex-row items-stretch gap-4 lg:gap-6"
      >
        {/* Promo banner — left (desktop only) */}
        <div className="hidden lg:flex flex-1 min-w-0 h-[220px] rounded-3xl border-2 border-dashed border-[var(--color-border-subtle)] flex-col items-center justify-center gap-2 text-[var(--color-on-surface-variant)] bg-[var(--color-surface-container-low)]">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-40">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M3 9h18M9 21V9" />
          </svg>
          <p className="text-xs font-semibold opacity-40 uppercase tracking-widest">Bannière promo</p>
        </div>

        {/* Pharmacie de Garde */}
        {gardeUrl ? (
          <a
            href={gardeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${cardClass} peer`}
            style={{ background: "linear-gradient(140deg, #991b1b 0%, #ef4444 55%, #fca5a5 100%)", ...cardStyle }}
          >
            <div className="absolute -top-6 -right-6 w-36 h-36 rounded-full bg-white/10 transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute -bottom-8 -left-4 w-28 h-28 rounded-full bg-black/10" />
            <div className="relative z-10 w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
            </div>
            <div className="relative z-10">
              <h3 className="text-lg font-black text-white leading-tight mb-1">{tr("pharmacy.garde_title")}</h3>
              <p className="text-white/80 text-xs leading-relaxed">{tr("pharmacy.garde_sub")}</p>
            </div>
            <div className="relative z-10 inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white text-xs font-bold px-4 py-2 rounded-full transition-colors">
              {tr("pharmacy.garde_pdf")}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </div>

            {/* Hover popup */}
            <div className="absolute bottom-[calc(100%+10px)] left-1/2 -translate-x-1/2 w-52 bg-white rounded-2xl shadow-xl p-4 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 pointer-events-none z-20">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
                </div>
                <p className="text-xs font-bold text-gray-800">{tr("pharmacy.garde_popup")}</p>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">Cliquez pour télécharger le planning des pharmacies de garde de cette semaine.</p>
              <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 shadow-sm" />
            </div>
          </a>
        ) : (
          <div
            className="relative overflow-hidden rounded-3xl flex flex-col items-center justify-center text-center p-8 gap-4 opacity-60 cursor-default w-full sm:w-auto sm:flex-1 lg:flex-none min-h-[200px] lg:h-[220px]"
            style={{ background: "linear-gradient(140deg, #991b1b 0%, #ef4444 55%, #fca5a5 100%)", ...cardStyle }}
          >
            <div className="absolute -top-6 -right-6 w-36 h-36 rounded-full bg-white/10" />
            <div className="absolute -bottom-8 -left-4 w-28 h-28 rounded-full bg-black/10" />
            <div className="relative z-10 w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
            </div>
            <div className="relative z-10">
              <h3 className="text-lg font-black text-white leading-tight mb-1">{tr("pharmacy.garde_title")}</h3>
              <p className="text-white/80 text-xs">{tr("pharmacy.garde_none")}</p>
            </div>
          </div>
        )}

        {/* Consultation WhatsApp */}
        <a
          href="https://wa.me/212641337443"
          target="_blank"
          rel="noopener noreferrer"
          className={cardClass}
          style={{ background: "linear-gradient(140deg, #047857 0%, #10b981 55%, #6ee7b7 100%)", ...cardStyle }}
        >
          <div className="absolute -top-6 -right-6 w-36 h-36 rounded-full bg-white/10 transition-transform duration-500 group-hover:scale-110" />
          <div className="absolute -bottom-8 -left-4 w-28 h-28 rounded-full bg-black/10" />
          <div className="relative z-10 w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </div>
          <div className="relative z-10">
            <h3 className="text-lg font-black text-white leading-tight mb-1">{tr("pharmacy.whatsapp_title")}</h3>
            <p className="text-white/80 text-xs leading-relaxed">{tr("pharmacy.whatsapp_sub")}</p>
          </div>
          <div className="relative z-10 inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white text-xs font-bold px-4 py-2 rounded-full transition-colors">
            {tr("pharmacy.whatsapp_cta")}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </div>
        </a>
        {/* Promo banner — right (desktop only) */}
        <div className="hidden lg:flex flex-1 min-w-0 h-[220px] rounded-3xl border-2 border-dashed border-[var(--color-border-subtle)] flex-col items-center justify-center gap-2 text-[var(--color-on-surface-variant)] bg-[var(--color-surface-container-low)]">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-40">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M3 9h18M9 21V9" />
          </svg>
          <p className="text-xs font-semibold opacity-40 uppercase tracking-widest">Bannière promo</p>
        </div>
      </div>
    </section>
  );
}
