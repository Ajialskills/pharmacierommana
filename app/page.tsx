import LanguagePicker from "@/components/LanguagePicker";

export const metadata = {
  title: "Pharmacie Rommana — Choisissez votre langue / اختر لغتك",
};

// Always show the picker at "/" — the client component handles fast redirect
// for returning visitors who already have a cookie set.
export default function RootPage() {
  return <LanguagePicker />;
}
