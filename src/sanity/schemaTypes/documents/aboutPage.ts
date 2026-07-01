import { defineType } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "À propos",
  type: "document",
  fields: [
    { name: "title", title: "Titre", type: "localeString", validation: (Rule) => Rule.required() },
    { name: "intro", title: "Texte d'introduction", type: "localeText", validation: (Rule) => Rule.required() },
    { name: "bio", title: "Qui suis-je ?", type: "localeText", validation: (Rule) => Rule.required() },
    { name: "singularity", title: "Ce qui me différencie", type: "localeText", validation: (Rule) => Rule.required() },
    { name: "approach", title: "Ma manière d'accompagner", type: "localeText", validation: (Rule) => Rule.required() },
    {
      name: "credentials",
      title: "Formation & références",
      type: "array",
      of: [{ type: "localeString" }],
    },
    { name: "frameHeading", title: "Titre « Mon cadre »", type: "localeString", validation: (Rule) => Rule.required() },
    {
      name: "frameItems",
      title: "Liste « Mon cadre »",
      type: "array",
      of: [{ type: "localeString" }],
    },
    {
      name: "servicesLinkLabel",
      title: "Libellé du lien vers la page Accompagnements",
      type: "localeString",
      description: "Affiché en bas de la page, sous forme de lien vers la page Accompagnements.",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "portraitPhoto",
      title: "Portrait",
      type: "image",
      options: { hotspot: true },
    },
  ],
  preview: {
    select: { title: "title.fr" },
  },
});
