// /studio has no shared ancestor with the [locale] tree (no app/layout.tsx
// above either), so it forms its own root layout — Sanity Studio manages
// its own styling and doesn't need our fonts/Tailwind globals.
export default function StudioRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
