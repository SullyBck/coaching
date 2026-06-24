import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getSiteSettings } from "@/content";
import { Container } from "@/components/ui/Container";
import { LanguageSwitcher } from "./LanguageSwitcher";

export async function Header() {
  const locale = await getLocale();
  const [t, { brandName }] = await Promise.all([
    getTranslations("nav"),
    getSiteSettings(locale),
  ]);

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
