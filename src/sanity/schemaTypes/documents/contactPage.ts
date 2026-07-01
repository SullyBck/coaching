import { defineType } from "sanity";

export const contactPage = defineType({
  name: "contactPage",
  title: "Contact",
  type: "document",
  fields: [
    { name: "title", title: "Titre", type: "localeString", validation: (Rule) => Rule.required() },
    { name: "intro", title: "Texte d'introduction", type: "localeText", validation: (Rule) => Rule.required() },
    { name: "ctaHeading", title: "Titre « Prendre rendez-vous »", type: "localeString", validation: (Rule) => Rule.required() },
    {
      name: "ctaQualifiers",
      title: "Qualificatifs (ex. 30 minutes, confidentiel...)",
      type: "array",
      of: [{ type: "localeString" }],
    },
    { name: "contactFormIntro", title: "Phrase d'intro « Me contacter »", type: "localeText", validation: (Rule) => Rule.required() },
    { name: "confidentialityHeading", title: "Titre « Confidentialité »", type: "localeString", validation: (Rule) => Rule.required() },
    { name: "confidentialityText", title: "Texte « Confidentialité »", type: "localeText", validation: (Rule) => Rule.required() },
    { name: "email", title: "Email de contact", type: "string" },
    {
      name: "linkedinUrl",
      title: "Lien LinkedIn",
      type: "url",
      validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }),
    },
    { name: "phone", title: "Téléphone", type: "string" },
    { name: "location", title: "Lieu", type: "string" },
  ],
  preview: {
    select: { title: "title.fr" },
  },
});
