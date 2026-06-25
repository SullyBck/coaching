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
    {
      name: "kind",
      title: "Type d'article",
      type: "string",
      options: {
        list: [
          { title: "Article complet (rédigé sur le site)", value: "full" },
          { title: "Lien externe (article académique)", value: "external" },
        ],
        layout: "radio",
      },
      initialValue: "full",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "body",
      title: "Contenu de l'article",
      type: "localeBlockContent",
      hidden: ({ parent }) => parent?.kind !== "full",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { kind?: string } | undefined;
          if (parent?.kind === "full" && !value) {
            return "Le contenu est requis pour un article complet.";
          }
          return true;
        }),
    },
    {
      name: "externalUrl",
      title: "Lien vers l'article externe",
      type: "url",
      hidden: ({ parent }) => parent?.kind !== "external",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { kind?: string } | undefined;
          if (parent?.kind === "external" && !value) {
            return "Le lien est requis pour un article externe.";
          }
          return true;
        }).uri({ scheme: ["http", "https"] }),
    },
  ],
  preview: {
    select: { fr: "title.fr" },
    prepare({ fr }) {
      return { title: fr };
    },
  },
});
