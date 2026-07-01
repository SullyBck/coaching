export interface Testimonial {
  role: string;
  quote: string;
}

export interface HomeContent {
  heroHeading: string;
  heroSubheading: string;
  intro: string;
  whenToContact: {
    heading: string;
    items: string[];
  };
  confidential: {
    heading: string;
    text: string;
  };
  testimonialsHeading?: string;
  aboutLinkLabel: string;
  ambiancePhotoUrl?: string;
}

export interface AboutContent {
  title: string;
  bio: string;
  singularity: string;
  approach: string;
  credentials: string[];
  servicesLinkLabel: string;
  portraitPhotoUrl?: string;
}

export interface Service {
  name: string;
  description: string;
  workAxes: string[];
  formats: string[];
}

export interface ServicesContent {
  title: string;
  services: Service[];
  bookingLinkLabel: string;
}

export interface Article {
  title: string;
  slug: string;
  comingSoon: boolean;
  kind: "full" | "external";
  externalUrl?: string;
}

export interface ArticleDetail extends Article {
  body?: import("@portabletext/react").PortableTextBlock[];
}

export interface ResourcesContent {
  title: string;
  articles: Article[];
}

export interface ContactContent {
  title: string;
  subtitle: string;
  howToStartHeading: string;
  howToStartText: string;
  ctaHeading: string;
  ctaQualifiers: string[];
  email?: string;
  linkedinUrl?: string;
  phone?: string;
  location?: string;
}

export interface AppointmentSlot {
  id: string;
  start: string;
  durationMinutes: number;
}

export interface SiteSettings {
  brandName: string;
  tagline: string;
  defaultTitle: string;
  defaultDescription: string;
}
