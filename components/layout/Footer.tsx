"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

const SOCIALS = [
  {
    label: "Email",
    href: "mailto:contact@pharmacierommana.ma",
    bg: "#E53E3E",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "#",
    bg: "#010101",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.87a8.18 8.18 0 0 0 4.78 1.52V6.93a4.85 4.85 0 0 1-1.02-.24z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "#",
    bg: "#1877F2",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/212641337443",
    bg: "#25D366",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    bg: "linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="white" />
      </svg>
    ),
  },
];

export default function Footer() {
  const { tr } = useLanguage();

  const BOTTOM_LINKS = [
    { label: tr("nav.about"), href: "/notre-histoire" },
    { label: tr("nav.blog"), href: "/blog" },
    { label: tr("nav.contact"), href: "/contact" },
    { label: tr("nav.faq"), href: "/faq" },
  ];

  return (
    <footer className="bg-[#FAF7F2]">
      {/* ── Contact strip ── */}
      <div className="border-y border-[var(--color-border-subtle)] bg-[var(--color-surface-container-low)]">
        <div
          style={{ maxWidth: "var(--spacing-max-width)" }}
          className="mx-auto px-[var(--spacing-lg)] py-10 grid grid-cols-1 sm:grid-cols-3 gap-6"
        >
          {/* Address */}
          <div className="flex flex-col items-center text-center gap-3 group">
            <div className="w-14 h-14 rounded-full bg-white border border-[var(--color-border-subtle)] shadow-sm flex items-center justify-center group-hover:shadow-md transition-shadow">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="10" r="3" />
                <path d="M12 2a8 8 0 0 1 8 8c0 5.25-8 14-8 14S4 15.25 4 10a8 8 0 0 1 8-8z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-on-surface-variant)] mb-1">{tr("footer.address")}</p>
              <p className="text-sm text-[var(--color-on-surface)] leading-relaxed">
                344 Av Al Hijra<br />
                <span dir="rtl" className="text-xs text-[var(--color-on-surface-variant)]">شارع الريف الرمانة</span><br />
                Tétouan, Maroc
              </p>
            </div>
          </div>

          {/* WhatsApp */}
          <a
            href="https://wa.me/212641337443"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center text-center gap-3 group"
          >
            <div className="w-14 h-14 rounded-full bg-white border border-[var(--color-border-subtle)] shadow-sm flex items-center justify-center group-hover:shadow-md transition-shadow">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="var(--color-primary)">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-on-surface-variant)] mb-1">{tr("footer.whatsapp")}</p>
              <p className="text-base font-bold text-[var(--color-primary)] tracking-wide" dir="ltr">0641 33 74 43</p>
            </div>
          </a>

          {/* Phone */}
          <a href="tel:0539714272" className="flex flex-col items-center text-center gap-3 group">
            <div className="w-14 h-14 rounded-full bg-white border border-[var(--color-border-subtle)] shadow-sm flex items-center justify-center group-hover:shadow-md transition-shadow">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.1 6.1l1.27-.88a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-on-surface-variant)] mb-1">{tr("footer.phone")}</p>
              <p className="text-base font-bold text-[var(--color-primary)] tracking-wide" dir="ltr">05 39 71 42 72</p>
            </div>
          </a>
        </div>
      </div>

      {/* ── Main footer body ── */}
      <div
        style={{ maxWidth: "var(--spacing-max-width)" }}
        className="mx-auto px-[var(--spacing-lg)] py-12 grid grid-cols-1 lg:grid-cols-3 gap-10 items-start"
      >
        {/* Logo + description */}
        <div className="flex flex-col items-start gap-4">
          <Image
            src="/Logo Rommana.png"
            alt="Pharmacie Rommana"
            width={160}
            height={64}
            className="h-14 w-auto object-contain"
          />
          <p className="text-sm text-[var(--color-on-surface-variant)] leading-relaxed">
            {tr("footer.description")}
          </p>
        </div>

        {/* Map */}
        <div className="rounded-2xl overflow-hidden border border-[var(--color-border-subtle)] shadow-sm h-[220px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d537.7808256049897!2d-5.393409205622905!3d35.56700913748666!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd0b42786c826805%3A0xe57ee821295b7abd!2z2LXZitiv2YTZitipINin2YXYsdmF2KfZhtip!5e0!3m2!1sen!2sma!4v1778582711786!5m2!1sen!2sma"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Pharmacie Rommana sur Google Maps"
          />
        </div>

        {/* Socials */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--color-on-surface-variant)] mb-4">{tr("footer.socials")}</h4>
          <div className="flex flex-col gap-2">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={s.label}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white text-xs font-semibold w-fit transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md opacity-90 hover:opacity-100"
                style={{ background: s.bg }}
              >
                {s.icon}
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-[var(--color-border-subtle)]">
        <div
          style={{ maxWidth: "var(--spacing-max-width)" }}
          className="mx-auto px-[var(--spacing-lg)] py-5 flex flex-col sm:flex-row justify-between items-center gap-3"
        >
          <p className="text-xs text-[var(--color-on-surface-variant)]">
            {tr("footer.copyright")}
          </p>
          <nav className="flex gap-6" aria-label="Footer navigation">
            {BOTTOM_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-xs font-semibold uppercase tracking-wider text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)] transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
