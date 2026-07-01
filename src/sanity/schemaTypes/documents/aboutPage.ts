import { defineType } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "À propos",
  type: "document",
  fields: [
    { name: "title", title: "Titre", type: "localeString", validation: (Rule) => Rule.required() },
    { name: "bio", title: "Mon parcours", type: "localeText", validation: (Rule) => Rule.required() },
    { name: "singularity", title: "Ma singularité", type: "localeText", validation: (Rule) => Rule.required() },
    { name: "approach", title: "Ma manière d'accompagner", type: "localeText", validation: (Rule) => Rule.required() },
    {
      name: "credentials",
      title: "Diplômes & certifications",
      type: "array",
      of: [{ type: "localeString" }],
    },
    {
      name: "servicesLinkLabel",
      title: "Libellé du lien vers la page Services",
      type: "localeString",
      description: "Affiché en bas de la page, sous forme de lien vers la page Services.",
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
