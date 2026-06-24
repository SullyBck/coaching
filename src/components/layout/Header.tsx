import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { siteSettings } from "@/content/site-settings";
import { Container } from "@/components/ui/Container";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header() {
  const locale = useLocale();
  const t = useTranslations("nav");
  const { brandName } = siteSettings[locale];

  const links = [
    { href: "/", label: t("home") },
    { href: "/about", label: t("about") },
    { href: "/services", label: t("services") },
    { href: "/resources", label: t("resources") },
    { href: "/contact", label: t("contact") },
  ] as const;

  return (
    <header className="border-b border-navy/10 bg-white">
      <Container className="flex flex-col items-center gap-4 py-6 md:flex-row md:justify-between">
        <Link href="/" className="font-display text-lg text-navy">
          {brandName}
        </Link>
        <nav className="flex flex-wrap items-center justify-center gap-4 text-xs tracking-wide text-navy/70 sm:gap-6 sm:text-sm">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-navy"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <LanguageSwitcher />
      </Container>
    </header>
  );
}
