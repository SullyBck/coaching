import type { Metadata } from "next";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getArticleContent } from "@/content";
import type { Locale } from "@/i18n/routing";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = await getArticleContent(locale, slug);
  return { title: article?.title };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const article = await getArticleContent(locale, slug);

  if (!article || article.kind !== "full" || !article.body) {
    notFound();
  }

  return (
    <Section>
      <Container className="flex flex-col gap-10 md:mx-auto md:max-w-2xl">
        <h1 className="font-display text-4xl text-navy">{article.title}</h1>
        <div className="flex flex-col gap-4 leading-relaxed text-navy/80">
          <PortableText value={article.body} />
        </div>
      </Container>
    </Section>
  );
}
