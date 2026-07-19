import { LOGO_ANIMAL, LOGO_TEXT } from "@/lib/menu-data";
import { useLocale } from "@/i18n/locale-context";

export function MenuLoading() {
  const { t } = useLocale();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-6 text-center animate-in fade-in duration-500">
      <div className="flex flex-col items-center gap-3">
        <img src={LOGO_ANIMAL} alt="" className="h-20 w-auto object-contain" />
        <img src={LOGO_TEXT} alt="Musk Cafe and Restaurant" className="h-7 w-auto object-contain" />
      </div>
      <div className="space-y-3">
        <h2 className="text-2xl font-bold text-foreground animate-in fade-in duration-700">
          {t.menu_page.loading_title}
        </h2>
        <p className="text-muted-foreground animate-in fade-in duration-1000">
          {t.menu_page.loading_subtitle}
        </p>
        <div className="flex items-center justify-center gap-2 pt-4">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-2 w-2 animate-bounce rounded-full bg-[var(--brand-gold)]"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
        <p className="max-w-sm pt-4 text-sm italic text-muted-foreground/70">
          &ldquo;{t.menu_page.loading_quote}&rdquo;
        </p>
      </div>
    </div>
  );
}
