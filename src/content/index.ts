import type { Locale } from "@/i18n/routing";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import type {
  AboutContent,
  ContactContent,
  HomeContent,
  ResourcesContent,
  ServicesContent,
  SiteSettings,
  Testimonial,
} from "./types";

export type * from "./types";

const LOCALIZED_ARRAY_ITEM = `{"v": @[$locale]}.v`;

export async function getHomeContent(locale: Locale): Promise<HomeContent> {
  const data = await client.fetch(
    `*[_type == "homePage"][0]{
      "heroHeading": heroHeading[$locale],
      "heroSubheading": heroSubheading[$locale],
      "intro": intro[$locale],
      "quoteText": quoteText[$locale],
      "quoteAttribution": quoteAttribution,
      "quoteFollowUp": quoteFollowUp[$locale],
      "aboutLinkLabel": aboutLinkLabel[$locale],
      ambiancePhoto
    }`,
    { locale },
  );

  return {
    heroHeading: data.heroHeading,
    heroSubheading: data.heroSubheading,
    intro: data.intro,
    quote: {
      text: data.quoteText,
      attribution: data.quoteAttribution,
      followUp: data.quoteFollowUp,
    },
    aboutLinkLabel: data.aboutLinkLabel,
    ambiancePhotoUrl: data.ambiancePhoto
      ? urlFor(data.ambiancePhoto).width(1600).url()
      : undefined,
  };
}

export async function getAboutContent(locale: Locale): Promise<AboutContent> {
  const data = await client.fetch(
    `*[_type == "aboutPage"][0]{
      "title": title[$locale],
      "subtitle": subtitle[$locale],
      "bio": bio[$locale],
      "expertise": expertise[$locale],
      "credentials": credentials[]${LOCALIZED_ARRAY_ITEM},
      "signature": signature[$locale],
      portraitPhoto
    }`,
    { locale },
  );

  return {
    title: data.title,
    subtitle: data.subtitle,
    bio: data.bio,
    expertise: data.expertise,
    credentials: data.credentials ?? [],
    signature: data.signature,
    portraitPhotoUrl: data.portraitPhoto
      ? urlFor(data.portraitPhoto).width(800).url()
      : undefined,
  };
}

export async function getServicesContent(locale: Locale): Promise<ServicesContent> {
  const data = await client.fetch(
    `*[_type == "servicesPage"][0]{
      "title": title[$locale],
      "services": services[]{
        "name": name[$locale],
        "description": description[$locale],
        "formats": formats[]${LOCALIZED_ARRAY_ITEM},
        "outcome": outcome[$locale]
      }
    }`,
    { locale },
  );

  return { title: data.title, services: data.services ?? [] };
}

export async function getResourcesContent(locale: Locale): Promise<ResourcesContent> {
  const data = await client.fetch(
    `*[_type == "resourcesPage"][0]{
      "title": title[$locale],
      "articles": articles[]{
        "title": title[$locale],
        "slug": slug.current,
        "comingSoon": comingSoon
      }
    }`,
    { locale },
  );

  return { title: data.title, articles: data.articles ?? [] };
}

export async function getContactContent(locale: Locale): Promise<ContactContent> {
  const data = await client.fetch(
    `*[_type == "contactPage"][0]{
      "title": title[$locale],
      "subtitle": subtitle[$locale],
      "ctaHeading": ctaHeading[$locale],
      "ctaQualifiers": ctaQualifiers[]${LOCALIZED_ARRAY_ITEM},
      email,
      phone,
      location
    }`,
    { locale },
  );

  return {
    title: data.title,
    subtitle: data.subtitle,
    ctaHeading: data.ctaHeading,
    ctaQualifiers: data.ctaQualifiers ?? [],
    email: data.email,
    phone: data.phone,
    location: data.location,
  };
}

export async function getTestimonials(locale: Locale): Promise<Testimonial[]> {
  return client.fetch(
    `*[_type == "testimonial"] | order(order asc) {
      "role": role[$locale],
      "quote": quote[$locale]
    }`,
    { locale },
  );
}

export async function getSiteSettings(locale: Locale): Promise<SiteSettings> {
  return client.fetch(
    `*[_type == "siteSettings"][0]{
      brandName,
      "tagline": tagline[$locale],
      "defaultTitle": defaultTitle[$locale],
      "defaultDescription": defaultDescription[$locale]
    }`,
    { locale },
  );
}
