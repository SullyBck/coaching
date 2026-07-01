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
    {
      name: "whenToContactItems",
      title: "Liste « Quand me solliciter ? »",
      type: "array",
      of: [{ type: "localeString" }],
    },
    { name: "confidentialHeading", title: "Titre section accompagnement", type: "localeString", validation: (Rule) => Rule.required() },
    { name: "confidentialText", title: "Texte section accompagnement", type: "localeText", validation: (Rule) => Rule.required() },
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
