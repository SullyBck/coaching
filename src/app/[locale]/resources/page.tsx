import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getResourcesContent } from "@/content";
import type { Locale } from "@/i18n/routing";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ArticleCard } from "@/components/ui/ArticleCard";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return { title: getResourcesContent(locale).title };
}

export default async function ResourcesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const content = getResourcesContent(locale);
  const t = await getTranslations("common");

  return (
    <Section>
      <Container className="flex flex-col gap-16">
        <h1 className="text-center font-display text-4xl text-navy">
          {content.title}
        </h1>

        <div className="grid gap-6 md:grid-cols-2">
          {content.articles.map((article) => (
            <ArticleCard
              key={article.slug}
              article={article}
              comingSoonLabel={t("comingSoon")}
            />
          ))}
        </div>

        <div className="bg-sand/30 p-10 text-center">
          <h2 className="font-display text-2xl text-navy">
            {content.newsletter.heading}
          </h2>
          <p className="mt-4 text-navy/80">{content.newsletter.description}</p>
        </div>
      </Container>
    </Section>
  );
}
