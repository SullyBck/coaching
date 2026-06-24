import { defineType } from "sanity";

export const localeText = defineType({
  name: "localeText",
  title: "Paragraphe (FR/EN)",
  type: "object",
  fields: [
    { name: "fr", title: "Français", type: "text", rows: 4, validation: (Rule) => Rule.required() },
    { name: "en", title: "English", type: "text", rows: 4, validation: (Rule) => Rule.required() },
  ],
  preview: {
    select: { fr: "fr" },
    prepare({ fr }) {
      return { title: fr };
    },
  },
});
