import { defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Témoignage",
  type: "document",
  fields: [
    { name: "role", title: "Fonction / rôle", type: "localeString", validation: (Rule) => Rule.required() },
    { name: "quote", title: "Citation", type: "localeText", validation: (Rule) => Rule.required() },
    {
      name: "order",
      title: "Ordre d'affichage",
      type: "number",
      description: "Les témoignages s'affichent du plus petit au plus grand.",
    },
  ],
  orderings: [
    {
      title: "Ordre d'affichage",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "role.fr" },
  },
});
