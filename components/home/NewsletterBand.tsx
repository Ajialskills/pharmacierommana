"use client";

export default function NewsletterBand() {
  return (
    <section
      aria-labelledby="newsletter-heading"
      className="py-[var(--spacing-xl)] bg-[var(--color-primary)]"
    >
      <div
        style={{ maxWidth: "var(--spacing-max-width)" }}
        className="mx-auto px-[var(--spacing-lg)] flex flex-col md:flex-row items-center justify-between gap-[var(--spacing-gutter)] text-white"
      >
        <div className="text-center md:text-left">
          <h2
            id="newsletter-heading"
            style={{ fontSize: "var(--text-headline-md)", fontWeight: "var(--text-headline-md--font-weight)" }}
            className="mb-1"
          >
            Restez informé de nos offres
          </h2>
          <p className="opacity-80 text-sm">
            Inscrivez-vous pour recevoir les dernières nouveautés santé.
          </p>
        </div>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex w-full max-w-md gap-3"
          aria-label="Formulaire newsletter"
        >
          <input
            type="email"
            placeholder="Votre email"
            required
            className="flex-grow rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/60 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/40 text-sm"
          />
          <button
            type="submit"
            className="bg-white text-[var(--color-primary)] px-6 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity text-sm whitespace-nowrap"
          >
            S&apos;inscrire
          </button>
        </form>
      </div>
    </section>
  );
}
