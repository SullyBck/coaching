export function Quote({
  text,
  attribution,
  followUp,
}: {
  text: string;
  attribution: string;
  followUp?: string;
}) {
  return (
    <figure className="border-l-2 border-gold pl-6">
      <blockquote className="font-display text-2xl leading-snug text-navy md:text-3xl">
        &ldquo;{text}&rdquo;
      </blockquote>
      <figcaption className="mt-4 text-sm tracking-wide text-navy/50">
        — {attribution}
      </figcaption>
      {followUp && (
        <p className="mt-6 leading-relaxed text-navy/80">{followUp}</p>
      )}
    </figure>
  );
}
