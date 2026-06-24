import { defineType } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "À propos",
  type: "document",
  fields: [
    { name: "title", title: "Titre", type: "localeString", validation: (Rule) => Rule.required() },
    { name: "subtitle", title: "Sous-titre", type: "localeString", validation: (Rule) => Rule.required() },
    { name: "bio", title: "Parcours", type: "localeText", validation: (Rule) => Rule.required() },
    { name: "expertise", title: "Expertise hybride", type: "localeText", validation: (Rule) => Rule.required() },
    {
      name: "credentials",
      title: "Diplômes & expertise",
      type: "array",
      of: [{ type: "localeString" }],
    },
    { name: "signature", title: "Phrase de signature", type: "localeString", validation: (Rule) => Rule.required() },
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
