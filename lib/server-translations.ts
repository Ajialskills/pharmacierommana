import { cookies } from "next/headers";
import { t, type TranslationKey, type Lang } from "./translations";

/**
 * Returns a `t()` function bound to the current request's language.
 * Use in async Server Components only.
 */
export async function getT() {
  const cookieStore = await cookies();
  const lang: Lang = cookieStore.get("pr_lang")?.value === "ar" ? "ar" : "fr";
  return (key: TranslationKey, vars?: Record<string, string | number>) =>
    t(key, lang, vars);
}
