import type { ReactNode } from "react";

export function Section({
  children,
  className = "",
  compact = false,
}: {
  children: ReactNode;
  className?: string;
  compact?: boolean;
}) {
  return (
    <section className={`${compact ? "py-8 md:py-12" : "py-14 md:py-20"} ${className}`}>
      {children}
    </section>
  );
}
