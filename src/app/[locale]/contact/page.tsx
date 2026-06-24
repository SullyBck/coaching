import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getContactContent } from "@/content";
import type { Locale } from "@/i18n/routing";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

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

  const [content, t] = await Promise.all([
    getContactContent(locale),
    getTranslations("contactForm"),
  ]);

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
        </div>

        <form className="flex flex-1 flex-col gap-4">
          <div>
            <label
              htmlFor="name"
              className="mb-1 block text-sm text-navy/70"
            >
              {t("name")}
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder={t("namePlaceholder")}
              className="w-full border border-navy/20 px-4 py-3 focus:border-gold focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm text-navy/70"
            >
              {t("email")}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder={t("emailPlaceholder")}
              className="w-full border border-navy/20 px-4 py-3 focus:border-gold focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="mb-1 block text-sm text-navy/70"
            >
              {t("message")}
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder={t("messagePlaceholder")}
              className="w-full border border-navy/20 px-4 py-3 focus:border-gold focus:outline-none"
            />
          </div>
          <Button type="submit" className="self-start">
            {t("submit")}
          </Button>
        </form>
      </Container>
    </Section>
  );
}
