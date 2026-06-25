import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getContactContent } from "@/content";
import type { Locale } from "@/i18n/routing";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { BookingWidget } from "@/components/booking/BookingWidget";
import { ContactForm } from "@/components/contact/ContactForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const content = await getContactContent(locale);
  return { title: content.title };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const content = await getContactContent(locale);

  return (
    <Section>
      <Container className="flex flex-col gap-12 md:flex-row">
        <div className="flex flex-1 flex-col gap-6">
          <p className="text-sm tracking-[0.2em] text-gold uppercase">
            {content.subtitle}
          </p>
          <h1 className="font-display text-4xl text-navy">{content.title}</h1>
          <h2 className="font-display text-xl text-navy">
            {content.ctaHeading}
          </h2>
          <ul className="flex flex-wrap gap-3 text-sm tracking-wide text-navy/60">
            {content.ctaQualifiers.map((qualifier) => (
              <li key={qualifier} className="border border-navy/20 px-3 py-1">
                {qualifier}
              </li>
            ))}
          </ul>
          {(content.email || content.linkedinUrl) && (
            <div className="flex flex-col gap-1 text-sm text-navy/70">
              {content.email && (
                <a
                  href={`mailto:${content.email}`}
                  className="hover:text-gold"
                >
                  {content.email}
                </a>
              )}
              {content.linkedinUrl && (
                <a
                  href={content.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold"
                >
                  LinkedIn
                </a>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-12">
          <BookingWidget />

          <div className="flex flex-col gap-4 border-t border-navy/10 pt-12">
            <ContactForm />
          </div>
        </div>
      </Container>
    </Section>
  );
}
