const FEATURES = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="1" y="3" width="15" height="13" rx="2" />
        <path d="M16 8h4l3 5v4h-7V8z" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
    bg: "bg-[color-mix(in_srgb,var(--color-primary-container)_20%,transparent)]",
    color: "text-[var(--color-primary)]",
    title: "Livraison Gratuite",
    description: "Dès 400 DH sur Tétouan & 800 DH au Maroc",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
    bg: "bg-[color-mix(in_srgb,var(--color-secondary-container)_20%,transparent)]",
    color: "text-[var(--color-secondary)]",
    title: "Paiement Cash",
    description: "Payez en toute confiance à la réception",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    bg: "bg-[color-mix(in_srgb,var(--color-success-green)_15%,transparent)]",
    color: "text-[var(--color-success-green)]",
    title: "Conseil Pro",
    description: "Pharmaciens disponibles via WhatsApp",
  },
];

export default function FeaturesStrip() {
  return (
    <section aria-label="Nos services" className="py-[var(--spacing-xl)] bg-white">
      <ul
        style={{ maxWidth: "var(--spacing-max-width)" }}
        className="mx-auto px-[var(--spacing-lg)] grid grid-cols-1 md:grid-cols-3 gap-[var(--spacing-gutter)]"
      >
        {FEATURES.map((f) => (
          <li
            key={f.title}
            className="flex items-center gap-6 p-6 rounded-2xl bg-[var(--color-background-soft)] border border-[var(--color-border-subtle)] transition-transform hover:-translate-y-1"
          >
            <div
              className={`w-14 h-14 ${f.bg} ${f.color} rounded-full flex items-center justify-center flex-shrink-0`}
            >
              {f.icon}
            </div>
            <div>
              <h3
                style={{ fontSize: "var(--text-headline-sm)", lineHeight: "var(--text-headline-sm--line-height)", fontWeight: "var(--text-headline-sm--font-weight)" }}
                className="text-[var(--color-on-surface)] mb-1"
              >
                {f.title}
              </h3>
              <p className="text-[var(--color-on-surface-variant)] text-sm">
                {f.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
