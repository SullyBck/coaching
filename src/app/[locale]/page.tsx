import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getHomeContent, getTestimonials } from "@/content";
import type { Locale } from "@/i18n/routing";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Quote } from "@/components/ui/Quote";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";

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
          <p className="text-lg leading-relaxed text-navy/80">
            {content.intro}
          </p>
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

      <Section className="bg-sand/30">
        <Container className="md:mx-auto md:max-w-3xl">
          <Quote
            text={content.quote.text}
            attribution={content.quote.attribution}
            followUp={content.quote.followUp}
          />
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-6 md:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </Container>
      </Section>

      <Section className="bg-navy text-center">
        <Container>
          <Link
            href="/about"
            className="text-sm tracking-wide text-sand transition-colors hover:text-gold"
          >
            {content.aboutLinkLabel} →
          </Link>
        </Container>
      </Section>
    </>
  );
}
