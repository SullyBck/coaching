import { defineType } from "sanity";

export const article = defineType({
  name: "article",
  title: "Article",
  type: "object",
  fields: [
    { name: "title", title: "Titre", type: "localeString", validation: (Rule) => Rule.required() },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title.fr" },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "comingSoon",
      title: "À venir (pas encore publié)",
      type: "boolean",
      initialValue: true,
    },
  ],
  preview: {
    select: { fr: "title.fr" },
    prepare({ fr }) {
      return { title: fr };
    },
  },
});
