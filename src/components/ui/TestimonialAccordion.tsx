"use client";

import { useState } from "react";
import type { Testimonial } from "@/content/types";

export function TestimonialAccordion({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col divide-y divide-navy/10 border-y border-navy/10">
      {testimonials.map((testimonial, index) => (
        <div key={index}>
          <button
            className="flex w-full items-center justify-between gap-4 py-5 text-left"
            onClick={() =>
              setOpenIndex(openIndex === index ? null : index)
            }
            aria-expanded={openIndex === index}
          >
            <span className="text-sm tracking-wide text-navy/70">
              {testimonial.role}
            </span>
            <span
              className="shrink-0 text-gold transition-transform duration-300"
              style={{
                transform: openIndex === index ? "rotate(45deg)" : "rotate(0deg)",
              }}
            >
              +
            </span>
          </button>
          {openIndex === index && (
            <p className="pb-6 pr-8 font-display text-base leading-relaxed text-navy/80 italic">
              &ldquo;{testimonial.quote}&rdquo;
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
