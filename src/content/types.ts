export interface Testimonial {
  role: string;
  quote: string;
}

export interface HomeContent {
  heroHeading: string;
  heroSubheading: string;
  intro: string;
  quote: {
    text: string;
    attribution: string;
    followUp: string;
  };
  aboutLinkLabel: string;
  ambiancePhotoUrl?: string;
  testimonialsHeading?: string;
}

export interface AboutContent {
  title: string;
  subtitle: string;
  bio: string;
  expertise: string;
  credentials: string[];
  signature: string;
  servicesLinkLabel: string;
  portraitPhotoUrl?: string;
}

export interface Service {
  name: string;
  description: string;
  formats: string[];
  outcome: string;
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
  ctaHeading: string;
  ctaQualifiers: string[];
  email?: string;
  linkedinUrl?: string;
  phone?: string;
  location?: string;
  formIntro: string;
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
