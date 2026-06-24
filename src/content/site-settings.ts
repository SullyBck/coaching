import type { Locale } from "@/i18n/routing";
import type { SiteSettings } from "./types";

export const siteSettings: Record<Locale, SiteSettings> = {
  fr: {
    brandName: "Ségolène Falandry",
    tagline: "Aligner. Décider. Avancer.",
    defaultTitle: "Ségolène Falandry — Coaching exécutif",
    defaultDescription:
      "Coaching exécutif pour dirigeants, cadres seniors et hauts potentiels en transition. Clarté, alignement, direction.",
  },
  en: {
    brandName: "Ségolène Falandry",
    tagline: "Where leaders regain their axis.",
    defaultTitle: "Ségolène Falandry — Executive Coaching",
    defaultDescription:
      "Executive coaching for leaders, senior executives, and high-potential talent in transition. Clarity, alignment, direction.",
  },
};
