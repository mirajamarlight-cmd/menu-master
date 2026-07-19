import { WifiOff } from "lucide-react";
import { useLocale } from "@/i18n/locale-context";

export function MenuError({ onRetry }: { onRetry: () => void }) {
  const { t } = useLocale();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-6 text-center">
      <WifiOff className="h-10 w-10 text-muted-foreground" />
      <h2 className="text-xl font-bold text-foreground">{t.menu_page.loading_error}</h2>
      <p className="max-w-md text-sm text-muted-foreground">{t.menu_page.connection_error}</p>
      <button
        onClick={onRetry}
        className="mt-2 rounded-full bg-[var(--brand-gold)] px-6 py-2.5 text-sm font-bold text-neutral-900 hover:brightness-95"
      >
        {t.menu_page.retry}
      </button>
    </div>
  );
}
