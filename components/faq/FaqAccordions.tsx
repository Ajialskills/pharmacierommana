"use client";

import { useState } from "react";
import Link from "next/link";
import { FAQS } from "./faq-data";

export { FAQS };

export default function FaqAccordions() {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {FAQS.map((section) => (
        <div key={section.category}>
          <h2 className="font-bold text-[var(--color-on-surface)] text-base mb-3 px-1">
            {section.category}
          </h2>
          <div className="space-y-2">
            {section.items.map((item) => (
              <Accordion key={item.q} question={item.q} answer={item.a} />
            ))}
          </div>
        </div>
      ))}

      <div className="bg-[color-mix(in_srgb,var(--color-primary)_6%,transparent)] border border-[color-mix(in_srgb,var(--color-primary)_20%,transparent)] rounded-2xl p-6 text-center">
        <p className="font-semibold text-[var(--color-on-surface)] mb-1">Vous ne trouvez pas votre réponse ?</p>
        <p className="text-sm text-[var(--color-on-surface-variant)] mb-4">
          Notre pharmacien répond rapidement par WhatsApp ou téléphone depuis Tétouan.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <a
            href="https://wa.me/212641337443"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            WhatsApp
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 border border-[var(--color-border-subtle)] text-[var(--color-on-surface)] px-5 py-2.5 rounded-xl text-sm font-semibold hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
          >
            Nous contacter
          </Link>
        </div>
      </div>
    </div>
  );
}

function Accordion({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  const panelId = `faq-panel-${question.slice(0, 32).replace(/\W+/g, "-").toLowerCase()}`;
  return (
    <div className="bg-white border border-[var(--color-border-subtle)] rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left"
        aria-expanded={open}
        aria-controls={panelId}
      >
        <span className="font-semibold text-sm text-[var(--color-on-surface)]">{question}</span>
        <svg
          className={`flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          style={{ color: "var(--color-primary)" }}
          width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      <div
        id={panelId}
        hidden={!open}
        className="px-6 pb-5 text-sm text-[var(--color-on-surface-variant)] leading-relaxed border-t border-[var(--color-border-subtle)] pt-4"
      >
        {answer}
      </div>
    </div>
  );
}
