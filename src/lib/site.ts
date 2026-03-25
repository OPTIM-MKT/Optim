import enDictionary from "@/constants/en.json";
import esDictionary from "@/constants/es.json";

export const locales = ["es", "en"] as const;
export const DEFAULT_MEDIA_IMAGE = "/images/placeholders/default-media.svg";
export const DEFAULT_OG_IMAGE = "/images/placeholders/optim-og.svg";

export type Locale = (typeof locales)[number];
export type SiteDictionary = typeof esDictionary;

const dictionaries: Record<Locale, SiteDictionary> = {
  es: esDictionary,
  en: enDictionary,
};

export function getDictionary(locale: Locale): SiteDictionary {
  return dictionaries[locale];
}

export function localizePath(locale: Locale, path = ""): string {
  const normalized = path.replace(/^\/|\/$/g, "");

  if (locale === "es") {
    return normalized ? `/${normalized}` : "/";
  }

  return normalized ? `/en/${normalized}` : "/en";
}

export function normalizePath(path: string): string {
  if (path.length > 1 && path.endsWith("/")) {
    return path.slice(0, -1);
  }

  return path || "/";
}

export function switchLocalePath(currentPath: string, locale: Locale): string {
  const normalizedCurrentPath = normalizePath(currentPath);
  const pathWithoutLocale = normalizedCurrentPath.startsWith("/en/")
    ? normalizedCurrentPath.slice(4)
    : normalizedCurrentPath === "/en"
      ? ""
      : normalizedCurrentPath.slice(1);

  return localizePath(locale, pathWithoutLocale);
}

export const navigationSlugs = [
  "",
  "about",
  "services",
  // "pricing", // Hidden for now — activate when pricing page is ready
  "contact",
] as const;

export type PageKey = "home" | "about" | "services" | "pricing" | "contact";
