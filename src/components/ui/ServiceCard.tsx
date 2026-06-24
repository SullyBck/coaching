import type { Service } from "@/content/types";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="flex flex-col gap-4 border border-navy/10 p-8">
      <h3 className="font-display text-xl text-navy">{service.name}</h3>
      <p className="leading-relaxed text-navy/80">{service.description}</p>
      {service.formats.length > 0 && (
        <ul className="flex flex-col gap-2 text-sm leading-relaxed text-navy/70">
          {service.formats.map((format) => (
            <li key={format}>{format}</li>
          ))}
        </ul>
      )}
      <p className="mt-auto text-sm tracking-wide text-gold">{service.outcome}</p>
    </article>
  );
}
