import { Instagram, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { BuiltByRaafat } from "@/components/brand/built-by-raafat";
import { LOGO_TEXT } from "@/lib/menu-data";
import { useLocale } from "@/i18n/locale-context";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.16 15.3a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.77a8.2 8.2 0 0 0 4.75 1.51V6.86a4.85 4.85 0 0 1-1-.17z" />
    </svg>
  );
}

const HOURS = [
  { dayKey: "mon_fri" as const, time: "7:00 AM - 12:00 AM" },
  { dayKey: "saturday" as const, time: "7:00 AM - 12:00 AM" },
  { dayKey: "sunday" as const, time: "7:00 AM - 12:00 AM" },
];

export function MenuFooter() {
  const { t } = useLocale();
  return (
    <footer id="footer" className="mt-16 border-t border-border pb-10 pt-10">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-4 text-center sm:text-start">
          <img src={LOGO_TEXT} alt="Musk Cafe and Restaurant" className="mx-auto h-8 sm:mx-0" />
          <p className="text-sm text-muted-foreground">{t.footer.tagline}</p>
          <div className="flex justify-center gap-3 sm:justify-start">
            <a
              href="https://www.instagram.com/muskplc/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="rounded-full border border-border p-2 hover:bg-muted"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="https://www.tiktok.com/@muskplc"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="rounded-full border border-border p-2 hover:bg-muted"
            >
              <TikTokIcon className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="space-y-3 text-center sm:text-start">
          <h3 className="text-sm font-semibold text-foreground">{t.footer.get_in_touch}</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start justify-center gap-2 sm:justify-start">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand-gold)]" />
              <span>{t.footer.address}</span>
            </li>
            <li className="flex items-center justify-center gap-2 sm:justify-start">
              <Phone className="h-4 w-4 shrink-0 text-[var(--brand-gold)]" />
              <a href="tel:+251967777778" className="hover:text-[var(--brand-gold)]">
                +251 96 777 7778
              </a>
            </li>
            <li className="flex items-center justify-center gap-2 sm:justify-start">
              <Mail className="h-4 w-4 shrink-0 text-[var(--brand-gold)]" />
              <a href="mailto:muskaddis@gmail.com" className="hover:text-[var(--brand-gold)]">
                muskaddis@gmail.com
              </a>
            </li>
          </ul>
        </div>

        <div className="space-y-3 text-center sm:text-start">
          <h3 className="text-sm font-semibold text-foreground">{t.footer.opening_hours}</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {HOURS.map((row) => (
              <li
                key={row.dayKey}
                className="flex justify-between gap-4 border-b border-border/50 pb-2 last:border-0"
              >
                <span>{t.footer.days[row.dayKey]}</span>
                <span>{row.time}</span>
              </li>
            ))}
          </ul>
          <Link to="/auth" className="inline-block text-sm font-medium text-[var(--brand-gold)] hover:underline">
            {t.footer.staff_login}
          </Link>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl space-y-3 px-4 text-center text-xs text-muted-foreground">
        <p>
          © {new Date().getFullYear()} Musk Cafe and Restaurant. {t.footer.all_rights}
        </p>
        <p>
          <a
            href="https://raafat.site"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium hover:text-foreground"
          >
            {t.footer.developed_by}
          </a>
          {" · "}
          <a
            href="https://raafat.site"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground"
          >
            {t.footer.want_business}
          </a>
        </p>
        <BuiltByRaafat className="text-[11px] text-muted-foreground" />
      </div>
    </footer>
  );
}
