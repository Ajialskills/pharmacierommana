import { cookies } from "next/headers";
import type { Lang } from "./translations";

export async function getLang(): Promise<Lang> {
  const store = await cookies();
  const val = store.get("pr_lang")?.value;
  return val === "ar" ? "ar" : "fr";
}
