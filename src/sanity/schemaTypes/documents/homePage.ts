import { defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Accueil",
  type: "document",
  fields: [
    { name: "heroHeading", title: "Accroche principale", type: "localeString", validation: (Rule) => Rule.required() },
    { name: "heroSubheading", title: "Sous-titre", type: "localeString", validation: (Rule) => Rule.required() },
    { name: "intro", title: "Texte d'introduction", type: "localeText", validation: (Rule) => Rule.required() },
    { name: "quoteText", title: "Citation", type: "localeText", validation: (Rule) => Rule.required() },
    {
      name: "quoteAttribution",
      title: "Attribution de la citation",
      type: "string",
      description: "Ex. \"Charles Darwin\" — identique dans les deux langues.",
      validation: (Rule) => Rule.required(),
    },
    { name: "quoteFollowUp", title: "Texte après la citation", type: "localeText", validation: (Rule) => Rule.required() },
    { name: "aboutLinkLabel", title: "Libellé du lien vers À propos", type: "localeString", validation: (Rule) => Rule.required() },
    {
      name: "ambiancePhoto",
      title: "Photo d'ambiance",
      type: "image",
      options: { hotspot: true },
    },
  ],
  preview: {
    select: { title: "heroHeading.fr" },
  },
});
