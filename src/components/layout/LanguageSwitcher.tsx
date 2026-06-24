"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LanguageSwitcher() {
  const pathname = usePathname();
  const activeLocale = useLocale();
  const t = useTranslations("languageSwitcher");

  return (
    <div className="flex items-center gap-2 text-sm tracking-wide">
      {routing.locales.map((locale, index) => (
        <span key={locale} className="flex items-center gap-2">
          {index > 0 && <span aria-hidden="true" className="text-navy/30">/</span>}
          <Link
            href={pathname}
            locale={locale}
            className={
              locale === activeLocale
                ? "text-navy"
                : "text-navy/40 transition-colors hover:text-navy"
            }
          >
            {t(locale)}
          </Link>
        </span>
      ))}
    </div>
  );
}
