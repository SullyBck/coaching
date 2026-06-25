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
    {
      name: "bookingLinkLabel",
      title: "Libellé du lien vers la prise de rendez-vous",
      type: "localeString",
      description: "Affiché en bas de la page, sous forme de lien vers la page Contact.",
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: { title: "title.fr" },
  },
});
