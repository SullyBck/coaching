import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getAboutContent } from "@/content";
import type { Locale } from "@/i18n/routing";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return { title: getAboutContent(locale).title };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const content = getAboutContent(locale);
  const t = await getTranslations("common");

  return (
    <Section>
      <Container className="flex flex-col gap-12 md:flex-row md:items-start">
        <div className="flex flex-1 flex-col gap-6">
          <p className="text-sm tracking-[0.2em] text-gold uppercase">
            {content.subtitle}
          </p>
          <h1 className="font-display text-4xl text-navy">{content.title}</h1>
          <p className="leading-relaxed text-navy/80">{content.bio}</p>
          <p className="leading-relaxed text-navy/80">{content.expertise}</p>
          <p className="font-display text-xl text-navy">{content.signature}</p>
        </div>

        <div className="flex flex-1 flex-col gap-8">
          <div className="relative aspect-[4/5] w-1/2 overflow-hidden bg-sand/30">
            <Image
              src="/images/segolene-falandry-portrait.jpeg"
              alt={t("aboutPhotoAlt")}
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
          <ul className="flex flex-col gap-2 text-sm leading-relaxed text-navy/70">
            {content.credentials.map((credential) => (
              <li key={credential} className="border-l border-gold/60 pl-4">
                {credential}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
