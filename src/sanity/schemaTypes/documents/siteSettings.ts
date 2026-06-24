import { defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Réglages du site",
  type: "document",
  fields: [
    {
      name: "brandName",
      title: "Nom de marque",
      type: "string",
      description: "Affiché dans l'en-tête, le pied de page, et les titres d'onglet.",
      validation: (Rule) => Rule.required(),
    },
    { name: "tagline", title: "Accroche / slogan", type: "localeString", validation: (Rule) => Rule.required() },
    { name: "defaultTitle", title: "Titre par défaut (SEO)", type: "localeString", validation: (Rule) => Rule.required() },
    { name: "defaultDescription", title: "Description par défaut (SEO)", type: "localeText", validation: (Rule) => Rule.required() },
  ],
  preview: {
    select: { title: "brandName" },
  },
});
