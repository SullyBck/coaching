import type { Locale } from "@/i18n/routing";
import { about as aboutEn } from "./en/about";
import { contact as contactEn } from "./en/contact";
import { home as homeEn } from "./en/home";
import { resources as resourcesEn } from "./en/resources";
import { services as servicesEn } from "./en/services";
import { testimonials as testimonialsEn } from "./en/testimonials";
import { about as aboutFr } from "./fr/about";
import { contact as contactFr } from "./fr/contact";
import { home as homeFr } from "./fr/home";
import { resources as resourcesFr } from "./fr/resources";
import { services as servicesFr } from "./fr/services";
import { testimonials as testimonialsFr } from "./fr/testimonials";

export { siteSettings } from "./site-settings";
export type * from "./types";

const byLocale = <T>(fr: T, en: T) => ({ fr, en }) as Record<Locale, T>;

const homeByLocale = byLocale(homeFr, homeEn);
const aboutByLocale = byLocale(aboutFr, aboutEn);
const servicesByLocale = byLocale(servicesFr, servicesEn);
const resourcesByLocale = byLocale(resourcesFr, resourcesEn);
const contactByLocale = byLocale(contactFr, contactEn);
const testimonialsByLocale = byLocale(testimonialsFr, testimonialsEn);

export function getHomeContent(locale: Locale) {
  return homeByLocale[locale];
}

export function getAboutContent(locale: Locale) {
  return aboutByLocale[locale];
}

export function getServicesContent(locale: Locale) {
  return servicesByLocale[locale];
}

export function getResourcesContent(locale: Locale) {
  return resourcesByLocale[locale];
}

export function getContactContent(locale: Locale) {
  return contactByLocale[locale];
}

export function getTestimonials(locale: Locale) {
  return testimonialsByLocale[locale];
}
