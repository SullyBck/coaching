import type { StructureResolver } from "sanity/structure";
import { SINGLETON_TYPES } from "./singletons";

const SINGLETON_PANES: Record<(typeof SINGLETON_TYPES)[number], string> = {
  siteSettings: "Réglages du site",
  homePage: "Accueil",
  aboutPage: "À propos",
  servicesPage: "Services",
  resourcesPage: "Ressources",
  contactPage: "Contact",
};

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Contenu")
    .items([
      ...SINGLETON_TYPES.map((type) =>
        S.listItem()
          .title(SINGLETON_PANES[type])
          .id(type)
          .child(S.document().schemaType(type).documentId(type)),
      ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => !SINGLETON_TYPES.includes(item.getId() as never),
      ),
    ]);
