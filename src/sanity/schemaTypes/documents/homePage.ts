import { defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Accueil",
  type: "document",
  fields: [
    { name: "heroHeading", title: "Accroche principale", type: "localeString", validation: (Rule) => Rule.required() },
    { name: "heroSubheading", title: "Étiquette (au-dessus du titre)", type: "localeString", validation: (Rule) => Rule.required() },
    { name: "intro", title: "Texte d'introduction", type: "localeText", validation: (Rule) => Rule.required() },
    { name: "whenToContactHeading", title: "Titre « Quand me solliciter ? »", type: "localeString", validation: (Rule) => Rule.required() },
    { name: "whenToContactIntro", title: "Phrase d'intro « Quand me solliciter ? »", type: "localeText", validation: (Rule) => Rule.required() },
    {
      name: "whenToContactItems",
      title: "Liste « Quand me solliciter ? »",
      type: "array",
      of: [{ type: "localeString" }],
    },
    { name: "differenceHeading", title: "Titre « Ma différence »", type: "localeString", validation: (Rule) => Rule.required() },
    { name: "differenceText", title: "Texte « Ma différence »", type: "localeText", validation: (Rule) => Rule.required() },
    { name: "workTogetherHeading", title: "Titre « Ce que l'on peut travailler ensemble »", type: "localeString", validation: (Rule) => Rule.required() },
    {
      name: "workTogetherItems",
      title: "Liste « Ce que l'on peut travailler ensemble »",
      type: "array",
      of: [{ type: "localeString" }],
    },
    { name: "testimonialsHeading", title: "Titre de la section témoignages", type: "localeString", validation: (Rule) => Rule.required() },
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
