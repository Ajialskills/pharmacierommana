"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { t, translateCategory, type Lang, type TranslationKey } from "@/lib/translations";

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  /** Translate a UI string by key, with optional variable interpolation */
  tr: (key: TranslationKey, vars?: Record<string, string | number>) => string;
  /** Translate a category name by its slug (falls back to French name) */
  trCat: (name: string, slug: string) => string;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "fr",
  setLang: () => {},
  tr: (key, vars) => t(key, "fr", vars),
  trCat: (name) => name,
});

export function LanguageProvider({ children, initialLang }: { children: React.ReactNode; initialLang?: Lang }) {
  const [lang, setLangState] = useState<Lang>(initialLang ?? "fr");

  useEffect(() => {
    // Sync from cookie in case client-side cookie differs from SSR value
    const match = document.cookie.match(/(?:^|;\s*)pr_lang=([^;]+)/);
    const stored = match?.[1] as Lang | null;
    if (stored === "ar" || stored === "fr") setLangState(stored);
  }, []);

  function setLang(next: Lang) {
    setLangState(next);
    document.cookie = `pr_lang=${next}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
  }

  const value: LanguageContextValue = {
    lang,
    setLang,
    tr: (key, vars) => t(key, lang, vars),
    trCat: (name, slug) => translateCategory(name, slug, lang),
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
