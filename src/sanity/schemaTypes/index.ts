import { type SchemaTypeDefinition } from "sanity";

import { article } from "./objects/article";
import { localeBlockContent } from "./objects/localeBlockContent";
import { localeString } from "./objects/localeString";
import { localeText } from "./objects/localeText";
import { service } from "./objects/service";
import { aboutPage } from "./documents/aboutPage";
import { appointmentSlot } from "./documents/appointmentSlot";
import { contactPage } from "./documents/contactPage";
import { homePage } from "./documents/homePage";
import { resourcesPage } from "./documents/resourcesPage";
import { servicesPage } from "./documents/servicesPage";
import { siteSettings } from "./documents/siteSettings";
import { testimonial } from "./documents/testimonial";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    localeString,
    localeText,
    localeBlockContent,
    service,
    article,
    siteSettings,
    homePage,
    aboutPage,
    servicesPage,
    resourcesPage,
    contactPage,
    testimonial,
    appointmentSlot,
  ],
};
