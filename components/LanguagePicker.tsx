"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

function setCookieAndGo(lang: "fr" | "ar") {
  document.cookie = `pr_lang=${lang}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
  // Hard navigation to bypass Next.js router cache — ensures the server re-reads the fresh cookie
  window.location.href = "/accueil";
}

export default function LanguagePicker() {
  const router = useRouter();

  // Returning visitors who land on "/" directly (not via the toggle): redirect silently
  useEffect(() => {
    const hasForce = new URLSearchParams(window.location.search).has("choisir");
    if (hasForce) return; // show picker even if cookie set
    const match = document.cookie.match(/(?:^|;\s*)pr_lang=([^;]+)/);
    const stored = match?.[1];
    if (stored === "fr" || stored === "ar") {
      router.replace("/accueil");
    }
  }, [router]);

  return (
    <main className="min-h-screen flex flex-col items-center bg-[#f0f7f7] px-4 pt-14 pb-12">
      {/* Welcome — bilingual */}
      <div className="text-center mb-6">
        <p className="text-2xl font-semibold text-[#3d494a] tracking-wide">
          Bienvenue Chez&nbsp;&nbsp;·&nbsp;&nbsp;<span style={{ fontFamily: "Cairo, sans-serif" }}>مرحباً بكم في</span>
        </p>
      </div>

      {/* Logo */}
      <div className="mb-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/Logo Rommana.png?v=2"
          alt="Pharmacie Rommana"
          className="h-40 w-auto object-contain"
        />
      </div>

      {/* Prompt */}
      <p className="text-[#3d494a] text-base font-medium tracking-wide mb-10 text-center">
        Choisissez votre langue&nbsp;&nbsp;·&nbsp;&nbsp;<span style={{ fontFamily: "Cairo, sans-serif" }}>اختر لغتك</span>
      </p>

      {/* Cards — fixed equal size, centered */}
      <div className="flex flex-col sm:flex-row gap-6 justify-center">
        {/* French */}
        <button
          onClick={() => setCookieAndGo("fr")}
          className="group w-80 flex flex-col items-center gap-7 bg-white border-2 border-transparent hover:border-[#00696e] rounded-3xl px-12 py-16 shadow-sm hover:shadow-xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00696e] cursor-pointer"
        >
          <span className="text-7xl" role="img" aria-label="Drapeau français">🇫🇷</span>
          <div className="text-center">
            <p className="text-3xl font-bold text-[#131b2e] mb-2">Français</p>
            <p className="text-base text-[#3d494a]">Continuer en français</p>
          </div>
          <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[#00696e] opacity-0 group-hover:opacity-100 transition-opacity">
            Continuer
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </button>

        {/* Arabic */}
        <button
          onClick={() => setCookieAndGo("ar")}
          className="group w-80 flex flex-col items-center gap-7 bg-white border-2 border-transparent hover:border-[#00696e] rounded-3xl px-12 py-16 shadow-sm hover:shadow-xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00696e] cursor-pointer"
        >
          <span className="text-7xl" role="img" aria-label="العلم المغربي">🇲🇦</span>
          <div className="text-center">
            <p className="text-3xl font-bold text-[#131b2e] mb-2" style={{ fontFamily: "Cairo, sans-serif" }}>العربية</p>
            <p className="text-base text-[#3d494a]" style={{ fontFamily: "Cairo, sans-serif" }}>تابع بالعربية</p>
          </div>
          <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[#00696e] opacity-0 group-hover:opacity-100 transition-opacity" style={{ fontFamily: "Cairo, sans-serif" }}>
            تابع
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </span>
        </button>
      </div>

      {/* Tagline */}
      <p className="mt-14 text-xs text-[#3d494a]/60 text-center">
        Pharmacie Rommana · Tétouan, Maroc
      </p>
    </main>
  );
}
