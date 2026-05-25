export interface QuizOption {
  label: string;
  value: string;
  nextId: string | null; // null = show results
  categorySlug?: string; // filter products by this category at results
  emoji?: string;
}

export interface QuizStep {
  id: string;
  question: string;
  options: QuizOption[];
}

export interface QuizConfig {
  steps: Record<string, QuizStep>;
  startId: string;
}

// TODO: Replace placeholder questions with client-approved copy.
export const quizConfig: QuizConfig = {
  startId: "who",
  steps: {
    who: {
      id: "who",
      question: "Ce produit est pour qui ?",
      options: [
        { label: "Pour moi", value: "me", nextId: "me_concern", emoji: "🧑" },
        { label: "Pour mon bébé", value: "baby", nextId: "baby_age", emoji: "👶" },
        { label: "Pour ma famille", value: "family", nextId: "family_concern", emoji: "👨‍👩‍👧" },
      ],
    },
    me_concern: {
      id: "me_concern",
      question: "Quel est votre besoin principal ?",
      options: [
        { label: "Soin du visage", value: "visage", nextId: "me_skin", emoji: "✨" },
        { label: "Soin du corps", value: "corps", nextId: null, categorySlug: "corps", emoji: "🧴" },
        { label: "Santé & bien-être", value: "sante", nextId: null, categorySlug: "sante", emoji: "💊" },
        { label: "Cheveux", value: "cheveux", nextId: null, categorySlug: "cheveux", emoji: "💆" },
      ],
    },
    me_skin: {
      id: "me_skin",
      question: "Quel est votre type de peau ?",
      options: [
        { label: "Peau sèche", value: "seche", nextId: null, categorySlug: "visage", emoji: "🌵" },
        { label: "Peau grasse / mixte", value: "grasse", nextId: null, categorySlug: "visage", emoji: "💧" },
        { label: "Peau sensible", value: "sensible", nextId: null, categorySlug: "visage", emoji: "🌸" },
        { label: "Peau normale", value: "normale", nextId: null, categorySlug: "visage", emoji: "😊" },
      ],
    },
    baby_age: {
      id: "baby_age",
      question: "Quel âge a votre enfant ?",
      options: [
        { label: "Nouveau-né (0–3 mois)", value: "newborn", nextId: null, categorySlug: "bebe-et-maman", emoji: "🍼" },
        { label: "Bébé (3–12 mois)", value: "infant", nextId: "baby_concern", emoji: "🧸" },
        { label: "Tout-petit (1–3 ans)", value: "toddler", nextId: "baby_concern", emoji: "🎠" },
      ],
    },
    baby_concern: {
      id: "baby_concern",
      question: "Qu'est-ce que vous recherchez ?",
      options: [
        { label: "Hygiène & bain", value: "hygiene", nextId: null, categorySlug: "bebe-et-maman", emoji: "🛁" },
        { label: "Soin de la peau", value: "skin", nextId: null, categorySlug: "bebe-et-maman", emoji: "🧴" },
        { label: "Santé & vitamines", value: "health", nextId: null, categorySlug: "bebe-et-maman", emoji: "💊" },
      ],
    },
    family_concern: {
      id: "family_concern",
      question: "Quel est le besoin de votre famille ?",
      options: [
        { label: "Hygiène quotidienne", value: "hygiene", nextId: null, categorySlug: "hygiene", emoji: "🫧" },
        { label: "Santé & soins", value: "sante", nextId: null, categorySlug: "sante", emoji: "🏥" },
        { label: "Solaire & protection", value: "solaire", nextId: null, categorySlug: "solaire", emoji: "☀️" },
        { label: "Bébé & maman", value: "bebe", nextId: null, categorySlug: "bebe-et-maman", emoji: "👶" },
      ],
    },
  },
};
