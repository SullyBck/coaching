import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getAboutContent } from "@/content";
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

  const [content, t] = await Promise.all([
    getAboutContent(locale),
    getTranslations("common"),
  ]);

  return (
    <Section>
      <Container className="flex flex-col gap-16">
        <h1 className="font-display text-3xl leading-snug text-navy md:max-w-3xl md:text-4xl">
          {content.title}
        </h1>

        <div className="grid gap-12 md:grid-cols-[1fr_auto]">
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-4">
              <h2 className="text-xs tracking-[0.2em] text-gold uppercase">
                Mon parcours
              </h2>
              {content.bio.split("\n\n").map((paragraph, i) => (
                <p key={i} className="leading-relaxed text-navy/80">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="text-xs tracking-[0.2em] text-gold uppercase">
                Ma singularité
              </h2>
              {content.singularity.split("\n\n").map((paragraph, i) => (
                <p key={i} className="leading-relaxed text-navy/80">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="text-xs tracking-[0.2em] text-gold uppercase">
                Ma manière d&apos;accompagner
              </h2>
              {content.approach.split("\n\n").map((paragraph, i) => (
                <p key={i} className="leading-relaxed text-navy/80">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-start gap-8 md:w-56">
            {content.portraitPhotoUrl ? (
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-sand/30">
                <Image
                  src={content.portraitPhotoUrl}
                  alt={t("aboutPhotoAlt")}
                  fill
                  sizes="(min-width: 768px) 224px, 50vw"
                  className="object-cover"
                  priority
                />
              </div>
            ) : (
              <PhotoPlaceholder
                label={t("photoPlaceholder")}
                className="aspect-[3/4] w-full"
              />
            )}
          </div>
        </div>

        {content.credentials.length > 0 && (
          <div className="flex flex-col gap-4 border-t border-navy/10 pt-10">
            <h2 className="text-xs tracking-[0.2em] text-gold uppercase">
              Diplômes & certifications
            </h2>
            <ul className="flex flex-col gap-2 text-sm leading-relaxed text-navy/70 md:max-w-2xl">
              {content.credentials.map((credential) => (
                <li key={credential} className="border-l border-gold/60 pl-4">
                  {credential}
                </li>
              ))}
            </ul>
          </div>
        )}

        <p className="text-center">
          <Link
            href="/services"
            className="text-sm tracking-wide text-navy transition-colors hover:text-gold"
          >
            {content.servicesLinkLabel} →
          </Link>
        </p>
      </Container>
    </Section>
  );
}
