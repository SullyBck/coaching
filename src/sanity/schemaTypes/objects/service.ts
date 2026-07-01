import { defineType } from "sanity";

export const service = defineType({
  name: "service",
  title: "Service",
  type: "object",
  fields: [
    { name: "name", title: "Nom", type: "localeString", validation: (Rule) => Rule.required() },
    { name: "description", title: "Description", type: "localeText", validation: (Rule) => Rule.required() },
    {
      name: "workAxes",
      title: "Axes de travail possibles",
      type: "array",
      of: [{ type: "localeString" }],
    },
    {
      name: "formats",
      title: "Formats / modalités",
      type: "array",
      of: [{ type: "localeString" }],
    },
  ],
  preview: {
    select: { fr: "name.fr" },
    prepare({ fr }) {
      return { title: fr };
    },
  },
});
