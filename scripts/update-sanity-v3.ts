/**
 * v3 content update — pushes the new content from coaching-site-v3.md
 * into Sanity, replacing the v1/v2 copy.
 * Usage: SANITY_WRITE_TOKEN=... npx tsx scripts/update-sanity-v3.ts
 */
import { createClient } from "next-sanity";

import { home as homeFr } from "../src/content/fr/home";
import { home as homeEn } from "../src/content/en/home";
import { about as aboutFr } from "../src/content/fr/about";
import { about as aboutEn } from "../src/content/en/about";
import { services as servicesFr } from "../src/content/fr/services";
import { services as servicesEn } from "../src/content/en/services";
import { contact as contactFr } from "../src/content/fr/contact";
import { contact as contactEn } from "../src/content/en/contact";
import { siteSettings as siteSettingsByLocale } from "../src/content/site-settings";

const token = process.env.SANITY_WRITE_TOKEN;
if (!token) {
  console.error("Missing SANITY_WRITE_TOKEN env var.");
  process.exit(1);
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2026-06-24",
  token,
  useCdn: false,
});

async function update() {
  console.log("Updating siteSettings...");
  await client
    .patch("siteSettings")
    .set({
      tagline: { fr: siteSettingsByLocale.fr.tagline, en: siteSettingsByLocale.en.tagline },
      defaultTitle: {
        fr: siteSettingsByLocale.fr.defaultTitle,
        en: siteSettingsByLocale.en.defaultTitle,
      },
      defaultDescription: {
        fr: siteSettingsByLocale.fr.defaultDescription,
        en: siteSettingsByLocale.en.defaultDescription,
      },
    })
    .commit();
  console.log("siteSettings updated.");

  console.log("Updating homePage...");
  await client
    .patch("homePage")
    .set({
      heroHeading: { fr: homeFr.heroHeading, en: homeEn.heroHeading },
      heroSubheading: { fr: homeFr.heroSubheading, en: homeEn.heroSubheading },
      intro: { fr: homeFr.intro, en: homeEn.intro },
      whenToContactHeading: {
        fr: homeFr.whenToContact.heading,
        en: homeEn.whenToContact.heading,
      },
      whenToContactIntro: {
        fr: homeFr.whenToContact.intro,
        en: homeEn.whenToContact.intro,
      },
      whenToContactItems: homeFr.whenToContact.items.map((fr, i) => ({
        _key: `wc${i}`,
        _type: "localeString",
        fr,
        en: homeEn.whenToContact.items[i],
      })),
      differenceHeading: { fr: homeFr.difference.heading, en: homeEn.difference.heading },
      differenceText: { fr: homeFr.difference.text, en: homeEn.difference.text },
      workTogetherHeading: {
        fr: homeFr.workTogether.heading,
        en: homeEn.workTogether.heading,
      },
      workTogetherItems: homeFr.workTogether.items.map((fr, i) => ({
        _key: `wt${i}`,
        _type: "localeString",
        fr,
        en: homeEn.workTogether.items[i],
      })),
      testimonialsHeading: { fr: homeFr.testimonialsHeading, en: homeEn.testimonialsHeading },
      aboutLinkLabel: { fr: homeFr.aboutLinkLabel, en: homeEn.aboutLinkLabel },
    })
    .unset(["confidentialHeading", "confidentialText"])
    .commit();
  console.log("homePage updated.");

  console.log("Updating aboutPage...");
  await client
    .patch("aboutPage")
    .set({
      title: { fr: aboutFr.title, en: aboutEn.title },
      intro: { fr: aboutFr.intro, en: aboutEn.intro },
      bio: { fr: aboutFr.bio, en: aboutEn.bio },
      singularity: { fr: aboutFr.singularity, en: aboutEn.singularity },
      approach: { fr: aboutFr.approach, en: aboutEn.approach },
      credentials: aboutFr.credentials.map((fr, i) => ({
        _key: `c${i}`,
        _type: "localeString",
        fr,
        en: aboutEn.credentials[i],
      })),
      frameHeading: { fr: aboutFr.frameHeading, en: aboutEn.frameHeading },
      frameItems: aboutFr.frameItems.map((fr, i) => ({
        _key: `fr${i}`,
        _type: "localeString",
        fr,
        en: aboutEn.frameItems[i],
      })),
      servicesLinkLabel: {
        fr: aboutFr.servicesLinkLabel,
        en: aboutEn.servicesLinkLabel,
      },
    })
    .commit();
  console.log("aboutPage updated.");

  console.log("Updating servicesPage...");
  await client
    .patch("servicesPage")
    .set({
      title: { fr: servicesFr.title, en: servicesEn.title },
      subtitle: { fr: servicesFr.subtitle, en: servicesEn.subtitle },
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
          formats: s.formats.map((fr, j) => ({
            _key: `f${j}`,
            _type: "localeString",
            fr,
            en: sEn.formats[j],
          })),
        };
      }),
      hrInsightHeading: { fr: servicesFr.hrInsightHeading, en: servicesEn.hrInsightHeading },
      hrInsightText: { fr: servicesFr.hrInsightText, en: servicesEn.hrInsightText },
      howToStartHeading: { fr: servicesFr.howToStartHeading, en: servicesEn.howToStartHeading },
      howToStartText: { fr: servicesFr.howToStartText, en: servicesEn.howToStartText },
      bookingLinkLabel: {
        fr: servicesFr.bookingLinkLabel,
        en: servicesEn.bookingLinkLabel,
      },
    })
    .commit();
  console.log("servicesPage updated.");

  console.log("Updating contactPage...");
  await client
    .patch("contactPage")
    .set({
      title: { fr: contactFr.title, en: contactEn.title },
      intro: { fr: contactFr.intro, en: contactEn.intro },
      ctaHeading: { fr: contactFr.ctaHeading, en: contactEn.ctaHeading },
      ctaQualifiers: contactFr.ctaQualifiers.map((q, i) => ({
        _key: `q${i}`,
        _type: "localeString",
        fr: q,
        en: contactEn.ctaQualifiers[i],
      })),
      contactFormIntro: { fr: contactFr.contactFormIntro, en: contactEn.contactFormIntro },
      confidentialityHeading: {
        fr: contactFr.confidentialityHeading,
        en: contactEn.confidentialityHeading,
      },
      confidentialityText: {
        fr: contactFr.confidentialityText,
        en: contactEn.confidentialityText,
      },
      email: contactFr.email,
      linkedinUrl: contactFr.linkedinUrl,
    })
    .unset(["subtitle", "howToStartHeading", "howToStartText"])
    .commit();
  console.log("contactPage updated.");

  console.log("All documents updated successfully.");
}

update().catch((err) => {
  console.error(err);
  process.exit(1);
});
