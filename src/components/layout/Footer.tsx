import { getLocale, getTranslations } from "next-intl/server";
import { getSiteSettings } from "@/content";
import { Container } from "@/components/ui/Container";

export async function Footer() {
  const locale = await getLocale();
  const [t, { brandName }] = await Promise.all([
    getTranslations("footer"),
    getSiteSettings(locale),
  ]);
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy text-sand">
      <Container className="flex flex-col gap-3 py-10 text-sm">
        <p className="font-display text-base text-white">{brandName}</p>
        <p className="text-sand/80">{t("tagline")}</p>
        <p className="text-sand/50">
          © {year} {brandName} — {t("rights")}
        </p>
      </Container>
    </footer>
  );
}
