import { Link } from "@/i18n/navigation";
import type { Article } from "@/content/types";

export function ArticleCard({
  article,
  comingSoonLabel,
}: {
  article: Article;
  comingSoonLabel: string;
}) {
  const heading = (
    <h3 className="font-display text-xl text-navy">{article.title}</h3>
  );

  return (
    <article className="border border-navy/10 p-8">
      {article.comingSoon ? (
        heading
      ) : article.kind === "external" ? (
        <a
          href={article.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-gold"
        >
          {heading}
        </a>
      ) : (
        <Link
          href={`/resources/${article.slug}`}
          className="transition-colors hover:text-gold"
        >
          {heading}
        </Link>
      )}
      {article.comingSoon && (
        <p className="mt-3 text-xs tracking-wide text-navy/40">
          {comingSoonLabel}
        </p>
      )}
    </article>
  );
}
