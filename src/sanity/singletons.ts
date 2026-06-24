export const SINGLETON_TYPES = [
  "siteSettings",
  "homePage",
  "aboutPage",
  "servicesPage",
  "resourcesPage",
  "contactPage",
] as const;

export type SingletonType = (typeof SINGLETON_TYPES)[number];

export function isSingletonType(type: string): type is SingletonType {
  return (SINGLETON_TYPES as readonly string[]).includes(type);
}
