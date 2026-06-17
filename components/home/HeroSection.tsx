"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

const SLIDES = [
  {
    // Modern pharmacy interior — wide aisle, bright shelves, clean retail
    src: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=1920&h=900&q=80&auto=format&fit=crop&crop=center",
    alt: "Intérieur moderne d'une parapharmacie",
  },
  {
    // Colourful beauty & cosmetics retail display — wide shot, vibrant products
    src: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1920&h=900&q=80&auto=format&fit=crop&crop=center",
    alt: "Rayons de produits de beauté colorés",
  },
  {
    // Bright health & skincare products on shelves — wide, organised retail
    src: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1920&h=900&q=80&auto=format&fit=crop&crop=center",
    alt: "Produits de soin et de beauté en rayons",
  },
  {
    // Clean modern pharmacy shelf display — wide angle, colourful packaging
    src: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=1920&h=900&q=80&auto=format&fit=crop&crop=center",
    alt: "Rayons pharmacie bien organisés",
  },
];

const INTERVAL = 4500;

export default function HeroSection() {
  const { tr } = useLanguage();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setActive((i) => (i + 1) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, INTERVAL);
    return () => clearInterval(id);
  }, [next, paused]);

  return (
    <section aria-labelledby="hero-heading" className="relative py-16 md:py-24 overflow-hidden">

      {/* Carousel images */}
      {SLIDES.map((slide, i) => (
        <div
          key={slide.src}
          aria-hidden={i !== active}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === active ? 1 : 0 }}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            className="object-cover"
            style={{ opacity: 0.45 }}
            priority={i === 0}
            sizes="100vw"
          />
        </div>
      ))}

      {/* Teal overlay */}
      <div className="absolute inset-0 bg-[#00696E]/30" />

      {/* Content */}
      <div
        className="relative z-10 text-center"
        style={{ maxWidth: "1000px", width: "100%", margin: "0 auto", padding: "0 1.5rem" }}
      >
        <span className="inline-block bg-white/20 text-white font-semibold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
          {tr("hero.badge")}
        </span>

        <h1
          id="hero-heading"
          className="font-bold tracking-tight text-black mb-6 text-center"
          style={{ fontSize: "clamp(1.5rem, 2.8vw, 2.8rem)" }}
        >
          {tr("hero.title")}
        </h1>

        <p
          className="text-black mb-10"
          style={{ fontSize: "1.125rem", lineHeight: "1.75", maxWidth: "560px", width: "100%", margin: "0 auto 2.5rem" }}
        >
          {tr("hero.subtitle")}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/boutique"
            className="bg-[var(--color-primary)] text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
          >
            {tr("hero.cta_shop")}
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
            {tr("hero.cta_whatsapp")}
          </a>
        </div>
      </div>

      {/* Dot indicators */}
      <div
        className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex gap-2"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {SLIDES.map((_, i) => (
          <button
            key={i}
            aria-label={`Slide ${i + 1}`}
            onClick={() => setActive(i)}
            className="transition-all duration-300 rounded-full"
            style={{
              width: i === active ? "24px" : "8px",
              height: "8px",
              background: i === active ? "var(--color-primary)" : "rgba(255,255,255,0.5)",
            }}
          />
        ))}
      </div>
    </section>
  );
}
