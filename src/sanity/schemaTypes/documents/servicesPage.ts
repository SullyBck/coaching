import { defineType } from "sanity";

export const servicesPage = defineType({
  name: "servicesPage",
  title: "Accompagnements",
  type: "document",
  fields: [
    { name: "title", title: "Titre", type: "localeString", validation: (Rule) => Rule.required() },
    { name: "subtitle", title: "Sous-titre", type: "localeString", validation: (Rule) => Rule.required() },
    {
      name: "services",
      title: "Formats d'accompagnement",
      type: "array",
      of: [{ type: "service" }],
    },
    { name: "hrInsightHeading", title: "Titre « Éclairage RH & organisationnel »", type: "localeString", validation: (Rule) => Rule.required() },
    { name: "hrInsightText", title: "Texte « Éclairage RH & organisationnel »", type: "localeText", validation: (Rule) => Rule.required() },
    { name: "howToStartHeading", title: "Titre « Comment commencer ? »", type: "localeString", validation: (Rule) => Rule.required() },
    { name: "howToStartText", title: "Texte « Comment commencer ? »", type: "localeText", validation: (Rule) => Rule.required() },
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
