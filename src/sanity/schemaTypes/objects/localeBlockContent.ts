import { defineType } from "sanity";

export const localeBlockContent = defineType({
  name: "localeBlockContent",
  title: "Contenu riche (FR/EN)",
  type: "object",
  fields: [
    {
      name: "fr",
      title: "Français",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "en",
      title: "English",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
    },
  ],
});
