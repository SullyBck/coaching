import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getServicesContent } from "@/content";
import type { Locale } from "@/i18n/routing";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ServiceCard } from "@/components/ui/ServiceCard";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const content = await getServicesContent(locale);
  return { title: content.title };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const content = await getServicesContent(locale);

  return (
    <Section>
      <Container className="flex flex-col gap-12">
        <h1 className="text-center font-display text-4xl text-navy">
          {content.title}
        </h1>
        <div className="grid gap-8 md:mx-auto md:max-w-4xl md:grid-cols-2">
          {content.services.map((service) => (
            <ServiceCard key={service.name} service={service} />
          ))}
        </div>

        <p className="text-center">
          <Link
            href="/contact"
            className="text-sm tracking-wide text-navy transition-colors hover:text-gold"
          >
            {content.bookingLinkLabel} →
          </Link>
        </p>
      </Container>
    </Section>
  );
}
