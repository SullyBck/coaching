import { getLocale, getTranslations } from "next-intl/server";
import { getContactContent, getSiteSettings } from "@/content";
import { Container } from "@/components/ui/Container";

export async function Footer() {
  const locale = await getLocale();
  const [t, { brandName }, { email, linkedinUrl }] = await Promise.all([
    getTranslations("footer"),
    getSiteSettings(locale),
    getContactContent(locale),
  ]);
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy text-sand">
      <Container className="flex flex-col gap-3 py-10 text-sm">
        <p className="font-display text-base text-white">{brandName}</p>
        <p className="text-sand/80">{t("tagline")}</p>
        {(email || linkedinUrl) && (
          <div className="flex flex-wrap gap-4 text-sand/80">
            {email && (
              <a href={`mailto:${email}`} className="hover:text-gold">
                {email}
              </a>
            )}
            {linkedinUrl && (
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold"
              >
                LinkedIn
              </a>
            )}
          </div>
        )}
        <p className="text-sand/50">
          © {year} {brandName} — {t("rights")}
        </p>
      </Container>
    </footer>
  );
}
