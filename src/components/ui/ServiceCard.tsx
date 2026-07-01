import type { Service } from "@/content/types";

export function ServiceCard({
  service,
  workAxesLabel,
  formatLabel,
}: {
  service: Service;
  workAxesLabel: string;
  formatLabel: string;
}) {
  return (
    <article className="flex flex-col gap-5 border border-navy/10 p-8">
      <h3 className="font-display text-xl text-navy">{service.name}</h3>
      <div className="flex flex-col gap-3">
        {service.description.split("\n\n").map((paragraph, i) => (
          <p key={i} className="leading-relaxed text-navy/80">
            {paragraph}
          </p>
        ))}
      </div>

      {service.workAxes.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-xs tracking-[0.15em] text-gold uppercase">
            {workAxesLabel}
          </p>
          <ul className="flex flex-col gap-1 text-sm leading-relaxed text-navy/70">
            {service.workAxes.map((axis) => (
              <li key={axis} className="flex gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold/60" />
                {axis}
              </li>
            ))}
          </ul>
        </div>
      )}

      {service.formats.length > 0 && (
        <div className="flex flex-col gap-3 border-t border-navy/10 pt-5">
          <p className="text-xs tracking-[0.15em] text-gold uppercase">
            {formatLabel}
          </p>
          <ul className="flex flex-col gap-3">
            {service.formats.map((format) => (
              <li key={format} className="flex gap-3 text-sm leading-relaxed text-navy/70">
                <span className="mt-2 h-px w-3 shrink-0 bg-gold/50" />
                {format}
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}
