import { defineType } from "sanity";

export const service = defineType({
  name: "service",
  title: "Service",
  type: "object",
  fields: [
    { name: "name", title: "Nom", type: "localeString", validation: (Rule) => Rule.required() },
    { name: "description", title: "Description", type: "localeText", validation: (Rule) => Rule.required() },
    {
      name: "formats",
      title: "Formats / modalités",
      type: "array",
      of: [{ type: "localeString" }],
    },
    { name: "outcome", title: "Résultat attendu", type: "localeString", validation: (Rule) => Rule.required() },
  ],
  preview: {
    select: { fr: "name.fr" },
    prepare({ fr }) {
      return { title: fr };
    },
  },
});
