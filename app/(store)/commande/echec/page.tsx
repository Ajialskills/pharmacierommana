import Link from "next/link";
import { getT } from "@/lib/server-translations";

export default async function EchecPage() {
  const t = await getT();

  return (
    <div style={{ maxWidth: "var(--spacing-max-width)" }} className="mx-auto px-[var(--spacing-lg)] py-20">
      <div className="max-w-[448px] mx-auto text-center">
        <div className="w-20 h-20 rounded-full bg-[color-mix(in_srgb,var(--color-error)_15%,transparent)] flex items-center justify-center mx-auto mb-6">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: "var(--color-error)" }}>
            <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-[var(--color-on-surface)] mb-3">{t("order.fail_title")}</h1>
        <p className="text-sm text-[var(--color-on-surface-variant)] mb-8 leading-relaxed">
          {t("order.fail_sub")}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/commande"
            className="bg-[var(--color-primary)] text-white px-6 py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity"
          >
            {t("order.retry")}
          </Link>
          <a
            href="https://wa.me/212641337443"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl font-bold text-sm border border-[var(--color-border-subtle)] hover:bg-[var(--color-background-soft)] transition-colors text-[var(--color-on-surface)] flex items-center justify-center gap-2"
          >
            {t("footer.whatsapp")}
          </a>
        </div>
      </div>
    </div>
  );
}
