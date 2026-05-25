import Link from "next/link";

export default function HeroSection() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative py-16 md:py-24"
    >
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-20"
        aria-hidden
      >
        <source src="/herovid.mp4" type="video/mp4" />
      </video>
      {/* Teal overlay */}
      <div className="absolute inset-0 bg-[#00696E]/30" />
      {/* Content */}
      <div className="relative z-10 text-center" style={{ maxWidth: "1000px", width: "100%", margin: "0 auto", padding: "0 1.5rem" }}>
        <span className="inline-block bg-white/20 text-white font-semibold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
          Expertise Pharmaceutique
        </span>

        <h1
          id="hero-heading"
          className="font-bold tracking-tight text-black mb-6 text-center whitespace-nowrap"
          style={{ fontSize: "clamp(1.5rem, 2.8vw, 2.8rem)" }}
        >
          Votre santé, notre priorité numérique.
        </h1>

        <p className="text-black mb-10" style={{ fontSize: "1.125rem", lineHeight: "1.75", maxWidth: "560px", width: "100%", margin: "0 auto 2.5rem" }}>
          Découvrez une large gamme de produits parapharmaceutiques sélectionnés pour votre bien-être quotidien, livrés directement chez vous.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
            className="bg-transparent border-2 border-white/70 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:border-white hover:bg-white/10 transition-colors"
          >
            WhatsApp Conseil
          </a>
        </div>
      </div>
    </section>
  );
}
