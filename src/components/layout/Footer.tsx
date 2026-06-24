import { useLocale, useTranslations } from "next-intl";
import { siteSettings } from "@/content/site-settings";
import { Container } from "@/components/ui/Container";

export function Footer() {
  const locale = useLocale();
  const t = useTranslations("footer");
  const { brandName } = siteSettings[locale];
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
