import type { Locale } from "@/i18n/routing";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import type {
  AboutContent,
  AppointmentSlot,
  ArticleDetail,
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
      "testimonialsHeading": testimonialsHeading[$locale],
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
    testimonialsHeading: data.testimonialsHeading,
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
      "servicesLinkLabel": servicesLinkLabel[$locale],
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
    servicesLinkLabel: data.servicesLinkLabel,
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
      },
      "bookingLinkLabel": bookingLinkLabel[$locale]
    }`,
    { locale },
  );

  return {
    title: data.title,
    services: data.services ?? [],
    bookingLinkLabel: data.bookingLinkLabel,
  };
}

export async function getResourcesContent(locale: Locale): Promise<ResourcesContent> {
  const data = await client.fetch(
    `*[_type == "resourcesPage"][0]{
      "title": title[$locale],
      "articles": articles[]{
        "title": title[$locale],
        "slug": slug.current,
        "comingSoon": comingSoon,
        "kind": kind,
        "externalUrl": externalUrl
      }
    }`,
    { locale },
  );

  return {
    title: data.title,
    articles: (data.articles ?? []).map((article: { kind?: string }) => ({
      ...article,
      kind: article.kind ?? "full",
    })),
  };
}

export async function getArticleContent(
  locale: Locale,
  slug: string,
): Promise<ArticleDetail | null> {
  const data = await client.fetch(
    `*[_type == "resourcesPage"][0].articles[slug.current == $slug][0]{
      "title": title[$locale],
      "slug": slug.current,
      "comingSoon": comingSoon,
      "kind": kind,
      "externalUrl": externalUrl,
      "body": body[$locale]
    }`,
    { locale, slug },
  );

  if (!data) return null;
  return { ...data, kind: data.kind ?? "full" };
}

export async function getContactContent(locale: Locale): Promise<ContactContent> {
  const data = await client.fetch(
    `*[_type == "contactPage"][0]{
      "title": title[$locale],
      "subtitle": subtitle[$locale],
      "ctaHeading": ctaHeading[$locale],
      "ctaQualifiers": ctaQualifiers[]${LOCALIZED_ARRAY_ITEM},
      email,
      linkedinUrl,
      phone,
      location,
      "formIntro": formIntro[$locale]
    }`,
    { locale },
  );

  return {
    title: data.title,
    subtitle: data.subtitle,
    ctaHeading: data.ctaHeading,
    ctaQualifiers: data.ctaQualifiers ?? [],
    email: data.email,
    linkedinUrl: data.linkedinUrl,
    phone: data.phone,
    location: data.location,
    formIntro: data.formIntro,
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

export async function getAvailableSlots(): Promise<AppointmentSlot[]> {
  const now = new Date().toISOString();
  return client.fetch(
    `*[_type == "appointmentSlot" && start > $now && !defined(booking.email)] | order(start asc) {
      "id": _id,
      start,
      durationMinutes
    }`,
    { now },
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
