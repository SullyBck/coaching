import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getAboutContent, getContactContent } from "@/content";
import type { Locale } from "@/i18n/routing";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const content = await getAboutContent(locale);
  return { title: content.title };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [content, contact, t] = await Promise.all([
    getAboutContent(locale),
    getContactContent(locale),
    getTranslations("common"),
  ]);
  const tAbout = await getTranslations("about");

  return (
    <Section>
      <Container>
        <div className="grid gap-12 md:grid-cols-[3fr_2fr] md:gap-16 md:items-start">

          {/* Colonne gauche — texte */}
          <div className="flex flex-col gap-10">
            <h1 className="font-display text-3xl leading-snug text-navy md:text-4xl">
              {content.title}
            </h1>

            {content.intro.split("\n\n").map((paragraph, i) => (
              <p key={i} className="leading-relaxed text-navy/80">
                {paragraph}
              </p>
            ))}

            <div className="flex flex-col gap-4">
              <h2 className="text-xs tracking-[0.2em] text-gold uppercase">
                {tAbout("whoAmI")}
              </h2>
              {content.bio.split("\n\n").map((paragraph, i) => (
                <p key={i} className="leading-relaxed text-navy/80 whitespace-pre-line">
                  {paragraph}
                </p>
              ))}
              {contact.linkedinUrl && (
                <p className="leading-relaxed text-navy/80">
                  {tAbout("linkedinCta")}{" "}
                  <a
                    href={contact.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-navy underline decoration-gold/60 underline-offset-4 hover:text-gold"
                  >
                    LinkedIn
                  </a>
                </p>
              )}
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="text-xs tracking-[0.2em] text-gold uppercase">
                {tAbout("differentiator")}
              </h2>
              {content.singularity.split("\n\n").map((paragraph, i) => (
                <p key={i} className="leading-relaxed text-navy/80 whitespace-pre-line">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="text-xs tracking-[0.2em] text-gold uppercase">
                {tAbout("approach")}
              </h2>
              {content.approach.split("\n\n").map((paragraph, i) => (
                <p key={i} className="leading-relaxed text-navy/80 whitespace-pre-line">
                  {paragraph}
                </p>
              ))}
            </div>

            <p>
              <Link
                href="/services"
                className="text-sm tracking-wide text-navy transition-colors hover:text-gold"
              >
                {content.servicesLinkLabel} →
              </Link>
            </p>
          </div>

          {/* Colonne droite — photo + diplômes + cadre */}
          <div className="flex flex-col gap-8 md:sticky md:top-12">
            {content.portraitPhotoUrl ? (
              <Image
                src={content.portraitPhotoUrl}
                alt={t("aboutPhotoAlt")}
                width={240}
                height={300}
                className="w-1/2 h-auto"
                priority
              />
            ) : (
              <PhotoPlaceholder
                label={t("photoPlaceholder")}
                className="aspect-[4/5] w-1/2"
              />
            )}

            {content.credentials.length > 0 && (
              <div className="flex flex-col gap-3">
                <h2 className="text-xs tracking-[0.2em] text-gold uppercase">
                  {tAbout("credentials")}
                </h2>
                <ul className="flex flex-col gap-2 text-sm leading-relaxed text-navy/70">
                  {content.credentials.map((credential) => (
                    <li key={credential} className="border-l border-gold/60 pl-3">
                      {credential}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {content.frameItems.length > 0 && (
              <div className="flex flex-col gap-3">
                <h2 className="text-xs tracking-[0.2em] text-gold uppercase">
                  {content.frameHeading}
                </h2>
                <ul className="flex flex-col gap-2 text-sm leading-relaxed text-navy/70">
                  {content.frameItems.map((item) => (
                    <li key={item} className="border-l border-gold/60 pl-3">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

        </div>
      </Container>
    </Section>
  );
}
