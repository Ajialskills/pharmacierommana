import Image from "next/image";
import Link from "next/link";

const LINKS_UTILES = [
  { label: "Boutique", href: "/boutique" },
  { label: "Blog Santé", href: "/blog" },
  { label: "Livraison", href: "/livraison" },
  { label: "Retours", href: "/retours" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[var(--color-border-subtle)]">
      <div
        style={{ maxWidth: "var(--spacing-max-width)" }}
        className="mx-auto px-[var(--spacing-lg)] pt-[var(--spacing-xxl)]"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-[var(--spacing-gutter)] mb-16">
          {/* Brand col */}
          <div className="space-y-6">
            <Image
              src="/Logo Rommana.png"
              alt="Pharmacie Rommana"
              width={140}
              height={56}
              className="h-12 w-auto object-contain"
            />
            <p className="text-[var(--color-on-surface-variant)] text-sm leading-relaxed pr-4">
              Pharmacie Rommana, basée à Tétouan, est une parapharmacie en ligne
              spécialisée dans les produits de soin, d&apos;hygiène et de bien-être.
              Livraison rapide partout au Maroc.
            </p>
          </div>

          {/* Liens utiles */}
          <div>
            <h4 className="font-semibold text-[var(--color-on-surface)] mb-6 text-base">
              Liens Utiles
            </h4>
            <ul className="space-y-4">
              {LINKS_UTILES.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)] transition-colors text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-[var(--color-on-surface)] mb-6 text-base">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex gap-3 text-sm text-[var(--color-on-surface-variant)]">
                <LocationIcon />
                <span>344 Av Al Hijra, شارع الريف الرمانة, Tétouan</span>
              </li>
              <li className="flex gap-3 text-sm text-[var(--color-on-surface-variant)]">
                <PhoneIcon />
                <a href="tel:0539714272" className="hover:text-[var(--color-primary)] transition-colors">
                  05 39 71 42 72
                </a>
              </li>
              <li className="flex gap-3 text-sm text-[var(--color-on-surface-variant)]">
                <ChatIcon />
                <a
                  href="https://wa.me/212641337443"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--color-primary)] transition-colors"
                >
                  0641 33 74 43 (WhatsApp)
                </a>
              </li>
            </ul>
          </div>

          {/* Map placeholder — spans 2 cols */}
          <div className="lg:col-span-2">
            <h4 className="font-semibold text-[var(--color-on-surface)] mb-6 text-base">
              Nous trouver
            </h4>
            <address className="not-italic space-y-1.5 text-sm text-[var(--color-on-surface-variant)]">
              <p className="font-semibold text-[var(--color-on-surface)]">Pharmacie Rommana</p>
              <p>344 Av Al Hijra, Tétouan</p>
              <p>
                Tél&nbsp;:{" "}
                <a href="tel:0539714272" className="hover:text-[var(--color-primary)] transition-colors">
                  05 39 71 42 72
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[var(--color-border-subtle)] py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[var(--color-on-surface-variant)]">
            © 2026 Pharmacie Rommana. Tous droits réservés.
          </p>
          <div className="flex gap-6 text-xs text-[var(--color-on-surface-variant)]">
            <Link href="/cgv" className="hover:text-[var(--color-primary)] transition-colors">CGV</Link>
            <Link href="/mentions-legales" className="hover:text-[var(--color-primary)] transition-colors">Mentions légales</Link>
            <Link href="/livraison" className="hover:text-[var(--color-primary)] transition-colors">Livraison</Link>
            <Link href="/retours" className="hover:text-[var(--color-primary)] transition-colors">Retours</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function LocationIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" className="flex-shrink-0 mt-0.5">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" className="flex-shrink-0 mt-0.5">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.1 6.1l1.27-.88a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" className="flex-shrink-0 mt-0.5">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}
