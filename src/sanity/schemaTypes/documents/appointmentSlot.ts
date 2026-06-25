import { defineType } from "sanity";

export const appointmentSlot = defineType({
  name: "appointmentSlot",
  title: "Créneau de rendez-vous",
  type: "document",
  fields: [
    {
      name: "start",
      title: "Date et heure de début",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "durationMinutes",
      title: "Durée (minutes)",
      type: "number",
      initialValue: 30,
      validation: (Rule) => Rule.required().positive(),
    },
    {
      name: "booking",
      title: "Réservation",
      type: "object",
      readOnly: true,
      description: "Rempli automatiquement par le site lors d'une réservation. Effacer ces champs (ou supprimer le créneau) pour le rendre à nouveau disponible.",
      fields: [
        { name: "name", title: "Nom", type: "string" },
        { name: "email", title: "Email", type: "string" },
        { name: "bookedAt", title: "Réservé le", type: "datetime" },
      ],
    },
  ],
  orderings: [
    {
      title: "Date (croissant)",
      name: "startAsc",
      by: [{ field: "start", direction: "asc" }],
    },
  ],
  preview: {
    select: { start: "start", bookedEmail: "booking.email" },
    prepare({ start, bookedEmail }) {
      const date = start
        ? new Date(start as string).toLocaleString("fr-FR", { dateStyle: "medium", timeStyle: "short" })
        : "Sans date";
      return {
        title: date,
        subtitle: bookedEmail ? `Réservé — ${bookedEmail}` : "Disponible",
      };
    },
  },
});
