import type { Locale } from "@/i18n/routing";
import type { SiteSettings } from "./types";

export const siteSettings: Record<Locale, SiteSettings> = {
  fr: {
    brandName: "Ségolène Falandry",
    tagline: "Coaching professionnel, RH & leadership.",
    defaultTitle: "Ségolène Falandry — Coaching professionnel, RH & leadership",
    defaultDescription:
      "Coaching professionnel, RH & leadership pour dirigeants, managers et professionnels en évolution. Clarté, alignement, direction.",
  },
  en: {
    brandName: "Ségolène Falandry",
    tagline: "Professional, HR & leadership coaching.",
    defaultTitle: "Ségolène Falandry — Professional, HR & Leadership Coaching",
    defaultDescription:
      "Professional, HR and leadership coaching for executives, managers and professionals in transition. Clarity, alignment, direction.",
  },
};
