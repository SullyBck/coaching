export function PhotoPlaceholder({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center border border-dashed border-navy/20 bg-sand/30 text-center text-xs tracking-wide text-navy/40 ${className}`}
    >
      {label}
    </div>
  );
}
