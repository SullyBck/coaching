import { defineType } from "sanity";

export const localeString = defineType({
  name: "localeString",
  title: "Texte (FR/EN)",
  type: "object",
  fields: [
    { name: "fr", title: "Français", type: "string", validation: (Rule) => Rule.required() },
    { name: "en", title: "English", type: "string", validation: (Rule) => Rule.required() },
  ],
  preview: {
    select: { fr: "fr" },
    prepare({ fr }) {
      return { title: fr };
    },
  },
});
