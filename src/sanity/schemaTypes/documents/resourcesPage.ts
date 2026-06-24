import { defineType } from "sanity";

export const resourcesPage = defineType({
  name: "resourcesPage",
  title: "Ressources",
  type: "document",
  fields: [
    { name: "title", title: "Titre", type: "localeString", validation: (Rule) => Rule.required() },
    {
      name: "articles",
      title: "Articles",
      type: "array",
      of: [{ type: "article" }],
    },
  ],
  preview: {
    select: { title: "title.fr" },
  },
});
