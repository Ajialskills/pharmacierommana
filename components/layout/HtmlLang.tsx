"use client";

import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function HtmlLang() {
  const { lang } = useLanguage();

  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("lang", lang === "ar" ? "ar" : "fr");
    html.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
  }, [lang]);

  return null;
}
