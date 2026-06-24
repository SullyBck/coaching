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
    { name: "newsletterHeading", title: "Titre newsletter", type: "localeString", validation: (Rule) => Rule.required() },
    { name: "newsletterDescription", title: "Description newsletter", type: "localeText", validation: (Rule) => Rule.required() },
  ],
  preview: {
    select: { title: "title.fr" },
  },
});
