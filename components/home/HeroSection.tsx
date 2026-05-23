import Link from "next/link";

export default function HeroSection() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative bg-[var(--color-surface-container-low)] py-16 md:py-24 overflow-hidden"
    >
      <div
        style={{ maxWidth: "var(--spacing-max-width)" }}
        className="mx-auto px-[var(--spacing-lg)] grid md:grid-cols-2 items-center gap-[var(--spacing-gutter)]"
      >
        {/* Copy */}
        <div className="z-10 text-center md:text-left">
          <span className="inline-block bg-[color-mix(in_srgb,var(--color-primary-container)_15%,transparent)] text-[var(--color-primary)] font-semibold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
            Expertise Pharmaceutique
          </span>
          <h1
            id="hero-heading"
            style={{
              fontSize: "var(--text-headline-xl)",
              lineHeight: "var(--text-headline-xl--line-height)",
              letterSpacing: "var(--text-headline-xl--letter-spacing)",
              fontWeight: "var(--text-headline-xl--font-weight)",
            }}
            className="text-[var(--color-on-background)] mb-6"
          >
            Votre santé, notre priorité numérique.
          </h1>
          <p
            style={{
              fontSize: "var(--text-body-lg)",
              lineHeight: "var(--text-body-lg--line-height)",
            }}
            className="text-[var(--color-on-surface-variant)] mb-10 max-w-lg mx-auto md:mx-0"
          >
            Découvrez une large gamme de produits parapharmaceutiques
            sélectionnés pour votre bien-être quotidien, livrés directement
            chez vous.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link
              href="/boutique"
              className="bg-[var(--color-primary)] text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            >
              Voir les offres
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <a
              href="https://wa.me/212641337443"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border-2 border-[var(--color-secondary)] text-[var(--color-secondary)] px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[color-mix(in_srgb,var(--color-secondary-container)_15%,transparent)] transition-colors"
            >
              WhatsApp Conseil
            </a>
          </div>
        </div>

        {/* Visual */}
        <div className="relative mt-12 md:mt-0">
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-[color-mix(in_srgb,var(--color-primary-container)_20%,transparent)] rounded-full blur-3xl pointer-events-none" />
          {/* TODO: Replace with real pharmacy hero image from Cloudinary */}
          <div className="relative z-10 rounded-3xl bg-[var(--color-surface-container)] aspect-[16/10] flex items-center justify-center">
            <p className="text-[var(--color-on-surface-variant)] text-sm">
              {/* TODO: <Image src={cloudinaryUrl} ... /> */}
              Image hero à venir
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
