import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getHomeContent, getTestimonials } from "@/content";
import type { Locale } from "@/i18n/routing";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { TestimonialAccordion } from "@/components/ui/TestimonialAccordion";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { getTranslations } from "next-intl/server";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [content, testimonials, t] = await Promise.all([
    getHomeContent(locale),
    getTestimonials(locale),
    getTranslations("common"),
  ]);

  return (
    <>
      <Section>
        <Container className="flex flex-col gap-6 text-center md:mx-auto md:max-w-3xl">
          <p className="text-sm tracking-[0.2em] text-gold uppercase">
            {content.heroSubheading}
          </p>
          <h1 className="font-display text-4xl leading-tight text-navy md:text-5xl">
            {content.heroHeading}
          </h1>
          {content.intro.split("\n\n").map((paragraph, i) => (
            <p key={i} className="text-lg leading-relaxed text-navy/80">
              {paragraph}
            </p>
          ))}
        </Container>
      </Section>

      <Container>
        {content.ambiancePhotoUrl ? (
          <div className="relative aspect-[16/7] w-full overflow-hidden bg-sand/30">
            <Image
              src={content.ambiancePhotoUrl}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        ) : (
          <PhotoPlaceholder
            label={t("photoPlaceholder")}
            className="aspect-[16/7] w-full"
          />
        )}
      </Container>

      {content.whenToContact.heading && (
        <Section>
          <Container className="md:mx-auto md:max-w-3xl">
            <div className="flex flex-col gap-6">
              <h2 className="font-display text-2xl text-navy">
                {content.whenToContact.heading}
              </h2>
              {content.whenToContact.items.length > 0 && (
                <ul className="flex flex-col gap-3 text-navy/80">
                  {content.whenToContact.items.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-1 w-4 shrink-0 bg-gold/60" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Container>
        </Section>
      )}

      {content.confidential.heading && (
        <Section className="bg-sand/30">
          <Container className="md:mx-auto md:max-w-3xl">
            <div className="flex flex-col gap-6">
              <h2 className="font-display text-2xl text-navy">
                {content.confidential.heading}
              </h2>
              {content.confidential.text.split("\n\n").map((paragraph, i) => (
                <p key={i} className="leading-relaxed text-navy/80">
                  {paragraph}
                </p>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {testimonials.length > 0 && (
        <Section>
          <Container className="md:mx-auto md:max-w-3xl">
            {content.testimonialsHeading && (
              <h2 className="mb-8 font-display text-2xl text-navy">
                {content.testimonialsHeading}
              </h2>
            )}
            <TestimonialAccordion testimonials={testimonials} />
            <p className="mt-10 text-center">
              <Link
                href="/about"
                className="text-sm tracking-wide text-navy transition-colors hover:text-gold"
              >
                {content.aboutLinkLabel} →
              </Link>
            </p>
          </Container>
        </Section>
      )}
    </>
  );
}
