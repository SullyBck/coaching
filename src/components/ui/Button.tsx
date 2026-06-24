import type { ButtonHTMLAttributes } from "react";

export function Button({
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`inline-flex items-center justify-center bg-navy px-8 py-3 text-sm tracking-wide text-white transition-colors hover:bg-gold ${className}`}
      {...props}
    />
  );
}
