import { defineType } from "sanity";

export const contactPage = defineType({
  name: "contactPage",
  title: "Contact",
  type: "document",
  fields: [
    { name: "title", title: "Titre", type: "localeString", validation: (Rule) => Rule.required() },
    { name: "subtitle", title: "Sous-titre", type: "localeString", validation: (Rule) => Rule.required() },
    { name: "ctaHeading", title: "Titre de l'appel à l'action", type: "localeString", validation: (Rule) => Rule.required() },
    {
      name: "ctaQualifiers",
      title: "Qualificatifs (ex. 30 minutes, confidentiel...)",
      type: "array",
      of: [{ type: "localeString" }],
    },
    { name: "email", title: "Email de contact", type: "string" },
    {
      name: "linkedinUrl",
      title: "Lien LinkedIn",
      type: "url",
      validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }),
    },
    { name: "phone", title: "Téléphone", type: "string" },
    { name: "location", title: "Lieu", type: "string" },
    {
      name: "formIntro",
      title: "Texte d'introduction du formulaire",
      type: "localeText",
      description: "Affiché au-dessus du formulaire de contact général, pour expliquer dans quel cas l'utiliser plutôt que de réserver un créneau directement.",
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: { title: "title.fr" },
  },
});
