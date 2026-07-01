import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
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

  const [content, tServiceCard] = await Promise.all([
    getServicesContent(locale),
    getTranslations("serviceCard"),
  ]);

  return (
    <Section>
      <Container className="flex flex-col gap-12">
        <div className="flex flex-col gap-4 text-center md:mx-auto md:max-w-2xl">
          <h1 className="font-display text-4xl text-navy">{content.title}</h1>
          {content.subtitle && (
            <p className="text-lg leading-relaxed text-navy/80">
              {content.subtitle}
            </p>
          )}
        </div>

        <div className="grid gap-8 md:mx-auto md:max-w-5xl md:grid-cols-3">
          {content.services.map((service) => (
            <ServiceCard
              key={service.name}
              service={service}
              workAxesLabel={tServiceCard("workAxes")}
              formatLabel={tServiceCard("format")}
            />
          ))}
        </div>

        {content.hrInsightHeading && (
          <div className="flex flex-col gap-3 text-center md:mx-auto md:max-w-2xl">
            <h2 className="font-display text-xl text-navy">
              {content.hrInsightHeading}
            </h2>
            <p className="leading-relaxed text-navy/80">
              {content.hrInsightText}
            </p>
          </div>
        )}

        {content.howToStartHeading && (
          <div className="flex flex-col gap-3 text-center md:mx-auto md:max-w-2xl">
            <h2 className="font-display text-xl text-navy">
              {content.howToStartHeading}
            </h2>
            <p className="leading-relaxed text-navy/80">
              {content.howToStartText}
            </p>
          </div>
        )}

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
