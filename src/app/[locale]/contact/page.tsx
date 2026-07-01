import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
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

  const [content, tContact] = await Promise.all([
    getContactContent(locale),
    getTranslations("contact"),
  ]);

  return (
    <Section>
      <Container className="flex flex-col gap-12">
        <div className="flex flex-col gap-4 text-center md:mx-auto md:max-w-2xl">
          <h1 className="font-display text-4xl text-navy">{content.title}</h1>
          {content.intro.split("\n\n").map((paragraph, i) => (
            <p key={i} className="leading-relaxed text-navy/80">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="grid gap-12 md:grid-cols-2">
          {/* Colonne gauche — prise de rendez-vous */}
          <div className="flex flex-col gap-4">
            <h2 className="font-display text-2xl text-navy">
              {content.ctaHeading}
            </h2>
            <ul className="flex flex-wrap gap-3 text-sm tracking-wide text-navy/60">
              {content.ctaQualifiers.map((qualifier) => (
                <li key={qualifier} className="border border-navy/20 px-3 py-1">
                  {qualifier}
                </li>
              ))}
            </ul>
            <BookingWidget showHeading={false} />
          </div>

          {/* Colonne droite — formulaire + contact direct */}
          <div className="flex flex-col gap-10 border-t border-navy/10 pt-8 md:border-t-0 md:border-l md:pl-12 md:pt-0">
            <div className="flex flex-col gap-4">
              <h2 className="font-display text-2xl text-navy">
                {tContact("panelTitle")}
              </h2>
              {content.contactFormIntro && (
                <p className="text-sm leading-relaxed text-navy/70">
                  {content.contactFormIntro}
                </p>
              )}
              <ContactForm />
            </div>

            {(content.email || content.linkedinUrl) && (
              <div className="flex flex-col gap-2">
                <h2 className="font-display text-xl text-navy">
                  {tContact("directTitle")}
                </h2>
                <div className="flex flex-col gap-1 text-sm text-navy/70">
                  {content.email && (
                    <a href={`mailto:${content.email}`} className="hover:text-gold">
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
              </div>
            )}
          </div>
        </div>

        {content.confidentialityHeading && (
          <div className="flex flex-col gap-2 border-t border-navy/10 pt-8 text-center md:mx-auto md:max-w-2xl">
            <h2 className="font-display text-lg text-navy">
              {content.confidentialityHeading}
            </h2>
            <p className="text-sm leading-relaxed text-navy/70">
              {content.confidentialityText}
            </p>
          </div>
        )}
      </Container>
    </Section>
  );
}
