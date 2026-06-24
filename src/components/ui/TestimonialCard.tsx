import type { Testimonial } from "@/content/types";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="flex w-[320px] flex-shrink-0 flex-col justify-between gap-6 bg-sand/40 p-8 snap-start sm:w-[380px]">
      <blockquote className="leading-relaxed text-navy/90">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>
      <figcaption className="text-sm tracking-wide text-navy/50">
        {testimonial.role}
      </figcaption>
    </figure>
  );
}
