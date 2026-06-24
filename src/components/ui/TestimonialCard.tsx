import type { Testimonial } from "@/content/types";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="flex h-full flex-col justify-between gap-6 bg-sand/40 p-8">
      <blockquote className="leading-relaxed text-navy/90">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>
      <figcaption className="text-sm tracking-wide text-navy/50">
        {testimonial.role}
      </figcaption>
    </figure>
  );
}
