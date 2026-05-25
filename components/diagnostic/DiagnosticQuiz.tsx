"use client";

import { useState } from "react";
import Link from "next/link";
import { quizConfig } from "@/lib/quiz-config";
import type { QuizStep } from "@/lib/quiz-config";

type Answer = { stepId: string; value: string; categorySlug?: string };

export default function DiagnosticQuiz() {
  const [history, setHistory] = useState<Answer[]>([]);
  const [currentId, setCurrentId] = useState<string | null>(quizConfig.startId);
  const [resultCategory, setResultCategory] = useState<string | null>(null);

  const currentStep: QuizStep | null = currentId ? quizConfig.steps[currentId] ?? null : null;

  function choose(option: { value: string; nextId: string | null; categorySlug?: string }) {
    const answer: Answer = { stepId: currentId!, value: option.value, categorySlug: option.categorySlug };
    setHistory((prev) => [...prev, answer]);

    if (option.nextId === null) {
      setCurrentId(null);
      setResultCategory(option.categorySlug ?? null);
    } else {
      setCurrentId(option.nextId);
    }
  }

  function restart() {
    setHistory([]);
    setCurrentId(quizConfig.startId);
    setResultCategory(null);
  }

  function goBack() {
    if (history.length === 0) return;
    const prev = [...history];
    const popped = prev.pop()!;
    setHistory(prev);
    setCurrentId(popped.stepId);
    setResultCategory(null);
  }

  const stepIndex = history.length + 1;
  const totalSteps = 3; // rough estimate for progress

  if (resultCategory !== null || (currentId === null && history.length > 0)) {
    return (
      <div className="text-center">
        <div className="w-14 h-14 rounded-full bg-[color-mix(in_srgb,var(--color-primary)_12%,transparent)] flex items-center justify-center mx-auto mb-4">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-[var(--color-on-surface)] mb-2">Voici ce qu&apos;on vous recommande</h3>
        <p className="text-sm text-[var(--color-on-surface-variant)] mb-8">
          Basé sur vos réponses, explorez nos produits sélectionnés.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {resultCategory && (
            <Link
              href={`/boutique/${resultCategory}`}
              className="bg-[var(--color-primary)] text-white px-8 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity text-sm"
            >
              Voir les produits recommandés
            </Link>
          )}
          {!resultCategory && (
            <Link
              href="/boutique"
              className="bg-[var(--color-primary)] text-white px-8 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity text-sm"
            >
              Explorer la boutique
            </Link>
          )}
          <a
            href="https://wa.me/212641337443"
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-[var(--color-secondary)] text-[var(--color-secondary)] px-8 py-3 rounded-xl font-bold hover:bg-[color-mix(in_srgb,var(--color-secondary)_8%,transparent)] transition-colors text-sm flex items-center justify-center gap-2"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
            </svg>
            Conseil pharmacien
          </a>
        </div>
        <button
          onClick={restart}
          className="mt-6 text-xs text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)] underline transition-colors"
        >
          Recommencer le diagnostic
        </button>
      </div>
    );
  }

  if (!currentStep) return null;

  return (
    <div>
      {/* Progress */}
      <div className="flex items-center gap-3 mb-8">
        {history.length > 0 && (
          <button
            onClick={goBack}
            className="w-8 h-8 rounded-full border border-[var(--color-border-subtle)] flex items-center justify-center hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors flex-shrink-0"
            aria-label="Retour"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
        )}
        <div className="flex-1 h-1.5 bg-[var(--color-surface-container-low)] rounded-full overflow-hidden">
          <div
            className="h-full bg-[var(--color-primary)] rounded-full transition-all duration-300"
            style={{ width: `${Math.min((stepIndex / totalSteps) * 100, 90)}%` }}
          />
        </div>
        <span className="text-xs text-[var(--color-on-surface-variant)] flex-shrink-0">
          Étape {stepIndex}
        </span>
      </div>

      <h3 className="text-lg font-bold text-[var(--color-on-surface)] mb-6 text-center">
        {currentStep.question}
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {currentStep.options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => choose(opt)}
            className="flex items-center gap-3 text-left bg-white border-2 border-[var(--color-border-subtle)] rounded-xl px-5 py-4 hover:border-[var(--color-primary)] hover:bg-[color-mix(in_srgb,var(--color-primary)_4%,transparent)] transition-all group"
          >
            {opt.emoji && (
              <span className="text-2xl flex-shrink-0" aria-hidden>{opt.emoji}</span>
            )}
            <span className="font-semibold text-sm text-[var(--color-on-surface)] group-hover:text-[var(--color-primary)] transition-colors">
              {opt.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
