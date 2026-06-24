import { defineType } from "sanity";

export const servicesPage = defineType({
  name: "servicesPage",
  title: "Services",
  type: "document",
  fields: [
    { name: "title", title: "Titre", type: "localeString", validation: (Rule) => Rule.required() },
    {
      name: "services",
      title: "Services",
      type: "array",
      of: [{ type: "service" }],
    },
  ],
  preview: {
    select: { title: "title.fr" },
  },
});
