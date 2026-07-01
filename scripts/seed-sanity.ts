/**
 * One-time seed: pushes the existing static content (src/content/{fr,en})
 * into Sanity as the starting documents, so the Studio doesn't open empty.
 * Usage: SANITY_WRITE_TOKEN=... npx tsx scripts/seed-sanity.ts
 */
import fs from "node:fs";
import path from "node:path";
import { createClient } from "next-sanity";

import { about as aboutEn } from "../src/content/en/about";
import { contact as contactEn } from "../src/content/en/contact";
import { home as homeEn } from "../src/content/en/home";
import { resources as resourcesEn } from "../src/content/en/resources";
import { services as servicesEn } from "../src/content/en/services";
import { testimonials as testimonialsEn } from "../src/content/en/testimonials";
import { about as aboutFr } from "../src/content/fr/about";
import { contact as contactFr } from "../src/content/fr/contact";
import { home as homeFr } from "../src/content/fr/home";
import { resources as resourcesFr } from "../src/content/fr/resources";
import { services as servicesFr } from "../src/content/fr/services";
import { testimonials as testimonialsFr } from "../src/content/fr/testimonials";
import { siteSettings as siteSettingsByLocale } from "../src/content/site-settings";

const token = process.env.SANITY_WRITE_TOKEN;
if (!token) {
  console.error("Missing SANITY_WRITE_TOKEN env var.");
  process.exit(1);
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2026-06-24",
  token,
  useCdn: false,
});

async function uploadPortrait() {
  const filePath = path.join(
    process.cwd(),
    "public/images/segolene-falandry-portrait.jpeg",
  );
  const asset = await client.assets.upload("image", fs.readFileSync(filePath), {
    filename: "segolene-falandry-portrait.jpeg",
    contentType: "image/jpeg",
  });
  return { _type: "image" as const, asset: { _type: "reference" as const, _ref: asset._id } };
}

async function seed() {
  console.log("Uploading portrait...");
  const portraitPhoto = await uploadPortrait();
  console.log("Portrait uploaded.");

  console.log("Writing siteSettings...");
  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    brandName: siteSettingsByLocale.fr.brandName,
    tagline: { fr: siteSettingsByLocale.fr.tagline, en: siteSettingsByLocale.en.tagline },
    defaultTitle: {
      fr: siteSettingsByLocale.fr.defaultTitle,
      en: siteSettingsByLocale.en.defaultTitle,
    },
    defaultDescription: {
      fr: siteSettingsByLocale.fr.defaultDescription,
      en: siteSettingsByLocale.en.defaultDescription,
    },
  });

  console.log("Writing homePage...");
  await client.createOrReplace({
    _id: "homePage",
    _type: "homePage",
    heroHeading: { fr: homeFr.heroHeading, en: homeEn.heroHeading },
    heroSubheading: { fr: homeFr.heroSubheading, en: homeEn.heroSubheading },
    intro: { fr: homeFr.intro, en: homeEn.intro },
    whenToContactHeading: { fr: homeFr.whenToContact.heading, en: homeEn.whenToContact.heading },
    whenToContactItems: homeFr.whenToContact.items.map((fr, i) => ({
      _key: `wc${i}`,
      _type: "localeString",
      fr,
      en: homeEn.whenToContact.items[i],
    })),
    confidentialHeading: { fr: homeFr.confidential.heading, en: homeEn.confidential.heading },
    confidentialText: { fr: homeFr.confidential.text, en: homeEn.confidential.text },
    testimonialsHeading: { fr: homeFr.testimonialsHeading, en: homeEn.testimonialsHeading },
    aboutLinkLabel: { fr: homeFr.aboutLinkLabel, en: homeEn.aboutLinkLabel },
  });

  console.log("Writing aboutPage...");
  await client.createOrReplace({
    _id: "aboutPage",
    _type: "aboutPage",
    title: { fr: aboutFr.title, en: aboutEn.title },
    bio: { fr: aboutFr.bio, en: aboutEn.bio },
    singularity: { fr: aboutFr.singularity, en: aboutEn.singularity },
    approach: { fr: aboutFr.approach, en: aboutEn.approach },
    credentials: aboutFr.credentials.map((fr, i) => ({
      _key: `c${i}`,
      _type: "localeString",
      fr,
      en: aboutEn.credentials[i],
    })),
    servicesLinkLabel: { fr: aboutFr.servicesLinkLabel, en: aboutEn.servicesLinkLabel },
    portraitPhoto,
  });

  console.log("Writing servicesPage...");
  await client.createOrReplace({
    _id: "servicesPage",
    _type: "servicesPage",
    title: { fr: servicesFr.title, en: servicesEn.title },
    services: servicesFr.services.map((s, i) => {
      const sEn = servicesEn.services[i];
      return {
        _key: `s${i}`,
        _type: "service",
        name: { fr: s.name, en: sEn.name },
        description: { fr: s.description, en: sEn.description },
        workAxes: s.workAxes.map((fr, j) => ({
          _key: `a${j}`,
          _type: "localeString",
          fr,
          en: sEn.workAxes[j],
        })),
        formats: s.formats.map((f, j) => ({
          _key: `f${j}`,
          _type: "localeString",
          fr: f,
          en: sEn.formats[j],
        })),
      };
    }),
  });

  console.log("Writing resourcesPage...");
  await client.createOrReplace({
    _id: "resourcesPage",
    _type: "resourcesPage",
    title: { fr: resourcesFr.title, en: resourcesEn.title },
    articles: resourcesFr.articles.map((a, i) => {
      const aEn = resourcesEn.articles[i];
      return {
        _key: `a${i}`,
        _type: "article",
        title: { fr: a.title, en: aEn.title },
        slug: { _type: "slug", current: a.slug },
        comingSoon: a.comingSoon,
      };
    }),
  });

  console.log("Writing contactPage...");
  await client.createOrReplace({
    _id: "contactPage",
    _type: "contactPage",
    title: { fr: contactFr.title, en: contactEn.title },
    subtitle: { fr: contactFr.subtitle, en: contactEn.subtitle },
    ctaHeading: { fr: contactFr.ctaHeading, en: contactEn.ctaHeading },
    ctaQualifiers: contactFr.ctaQualifiers.map((q, i) => ({
      _key: `q${i}`,
      _type: "localeString",
      fr: q,
      en: contactEn.ctaQualifiers[i],
    })),
  });

  console.log("Writing testimonials...");
  await Promise.all(
    testimonialsFr.map((t, i) =>
      client.createOrReplace({
        _id: `testimonial-${i}`,
        _type: "testimonial",
        role: { fr: t.role, en: testimonialsEn[i].role },
        quote: { fr: t.quote, en: testimonialsEn[i].quote },
        order: i,
      }),
    ),
  );

  console.log("Seed complete.");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
