import type { Article } from "@/content/types";

export function ArticleCard({
  article,
  comingSoonLabel,
}: {
  article: Article;
  comingSoonLabel: string;
}) {
  return (
    <article className="border border-navy/10 p-8">
      <h3 className="font-display text-xl text-navy">{article.title}</h3>
      {article.comingSoon && (
        <p className="mt-3 text-xs tracking-wide text-navy/40">
          {comingSoonLabel}
        </p>
      )}
    </article>
  );
}
