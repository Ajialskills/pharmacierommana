import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pharmacierommana.ma";

export const metadata: Metadata = {
  title: "Contactez Pharmacie Rommana à Tétouan — Parapharmacie en ligne",
  description: "Contactez Pharmacie Rommana à Tétouan. Tél : 05 39 71 42 72 — WhatsApp : +212 641 33 74 43 — 344 Av Al Hijra, Tétouan. Conseil pharmacien disponible en ligne.",
  alternates: { canonical: `${SITE_URL}/contact` },
  openGraph: {
    title: "Contact — Pharmacie Rommana, Tétouan",
    description: "Pharmacie Rommana, 344 Av Al Hijra, Tétouan. Tél : 05 39 71 42 72.",
    url: `${SITE_URL}/contact`,
  },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact"
        subtitle="Nous sommes disponibles pour répondre à vos questions"
        crumbs={[{ label: "Contact" }]}
      />
      <div style={{ maxWidth: "var(--spacing-max-width)" }} className="mx-auto px-[var(--spacing-lg)] py-10">

      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact info */}
        <div className="space-y-6">
          <div className="bg-white border border-[var(--color-border-subtle)] rounded-2xl p-6 space-y-5">
            <h2 className="font-bold text-[var(--color-on-surface)]">Pharmacie Rommana</h2>

            <div className="flex gap-3">
              <div className="w-9 h-9 rounded-full bg-[color-mix(in_srgb,var(--color-primary)_10%,transparent)] flex items-center justify-center flex-shrink-0" style={{ color: "var(--color-primary)" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--color-on-surface)]">Adresse</p>
                <p className="text-sm text-[var(--color-on-surface-variant)]">344 Av Al Hijra, Tétouan, Maroc</p>
                <p className="text-xs text-[var(--color-on-surface-variant)] mt-0.5" dir="rtl">شارع الريف الرمانة, 344 Av Al Hijra, Tétouan</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-9 h-9 rounded-full bg-[color-mix(in_srgb,var(--color-primary)_10%,transparent)] flex items-center justify-center flex-shrink-0" style={{ color: "var(--color-primary)" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.56 3.41 2 2 0 0 1 3.53 1.25h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.81a16 16 0 0 0 6.29 6.29l1.82-1.82a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--color-on-surface)]">Téléphone</p>
                <a href="tel:0539714272" className="text-sm text-[var(--color-primary)] font-semibold hover:underline">05 39 71 42 72</a>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-9 h-9 rounded-full bg-[color-mix(in_srgb,var(--color-secondary)_10%,transparent)] flex items-center justify-center flex-shrink-0" style={{ color: "var(--color-secondary)" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--color-on-surface)]">WhatsApp</p>
                <a href="https://wa.me/212641337443" target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--color-secondary)] font-semibold hover:underline">
                  +212 641 33 74 43
                </a>
                <p className="text-xs text-[var(--color-on-surface-variant)] mt-0.5">Conseil pharmacien disponible</p>
              </div>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="rounded-2xl overflow-hidden border border-[var(--color-border-subtle)] h-80 md:h-auto">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d537.7808256049897!2d-5.3930262!3d35.5672122!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd0b42786c826805:0xe57ee821295b7abd!2z2LXZitiv2YTZitipINin2YTYsdmF2KfZhtip!5e0!3m2!1sen!2sma!4v1778582711786!5m2!1sen!2sma"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Pharmacie Rommana — carte"
          />
        </div>
      </div>
      </div>
    </>
  );
}
