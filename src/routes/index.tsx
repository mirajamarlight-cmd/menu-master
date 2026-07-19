import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Info,
  LayoutGrid,
  List,
  MapPin,
  MessageSquare,
  Moon,
  Search,
  Star,
  Sun,
  Wallet,
  X,
} from "lucide-react";
import {
  LOGO_ANIMAL,
  LOGO_TEXT,
  displayPrice,
  localizedDescription,
  localizedName,
  type Category,
  type MenuItem,
} from "@/lib/menu-data";
import { fetchMuskMenu } from "@/lib/menu-api";
import { applyTheme, readStoredTheme, toggleTheme, type ThemeMode } from "@/lib/theme";
import { LocaleProvider, useLocale } from "@/i18n/locale-context";
import { LOCALE_LABELS, type Locale } from "@/i18n/messages";
import { MenuLoading } from "@/components/menu/menu-loading";
import { MenuError } from "@/components/menu/menu-error";
import { MenuFooter } from "@/components/menu/menu-footer";
import { PaymentAccountsSection } from "@/components/menu/payment-accounts";
import { ReviewSection } from "@/components/menu/review-section";
import { ComplaintDialog } from "@/components/menu/complaint-dialog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Musk Cafe and Restaurant — Digital Menu" },
      {
        name: "description",
        content: "Browse the Musk Cafe and Restaurant digital menu: breakfast, mains, drinks and more.",
      },
      { property: "og:title", content: "Musk Cafe and Restaurant — Digital Menu" },
      { property: "og:description", content: "Browse the Musk Cafe and Restaurant digital menu." },
    ],
  }),
  component: MenuPageRoot,
});

function MenuPageRoot() {
  return (
    <LocaleProvider>
      <MenuPage />
    </LocaleProvider>
  );
}

function Placeholder() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-white p-4">
      <img src={LOGO_ANIMAL} alt="Musk" className="h-16 w-auto object-contain" />
      <img src={LOGO_TEXT} alt="Musk Cafe and Restaurant" className="h-6 w-auto object-contain" />
    </div>
  );
}

function ItemImage({ item, className, alt }: { item: MenuItem; className?: string; alt: string }) {
  const [failed, setFailed] = useState(false);
  if (!item.image || failed) return <Placeholder />;
  return (
    <img
      src={item.image}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={className ?? "h-full w-full object-cover"}
    />
  );
}

function HeroCarousel({ items }: { items: MenuItem[] }) {
  const { t, locale } = useLocale();
  const [idx, setIdx] = useState(0);
  const count = items.length;
  useEffect(() => {
    if (count < 2) return;
    const timer = setInterval(() => setIdx((i) => (i + 1) % count), 5000);
    return () => clearInterval(timer);
  }, [count]);
  if (!count) return null;
  const item = items[idx % count];
  const { price, startingFrom } = displayPrice(item);
  const name = localizedName(item, locale);

  return (
    <div className="relative overflow-hidden rounded-3xl bg-neutral-900 text-white shadow-xl">
      <div className="relative aspect-[16/9] w-full sm:aspect-[21/9]">
        <ItemImage item={item} alt={name} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-[var(--brand-gold)] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-neutral-900">
            {t.featured.popular_order}
          </span>
          <span className="text-xs text-white/70">
            {String(idx + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </span>
        </div>
        <h2 className="mt-4 text-3xl font-bold sm:text-5xl">{name}</h2>
        <div className="mt-4 inline-flex flex-col rounded-2xl bg-white/10 px-5 py-3 backdrop-blur">
          <span className="text-[10px] uppercase tracking-widest text-white/70">{t.featured.price}</span>
          <span className="text-xl font-bold">
            {startingFrom && <span className="me-1 text-xs font-normal text-white/70">{t.featured.from} </span>}
            {price} <span className="text-sm font-semibold text-[var(--brand-gold)]">{t.common.etb}</span>
          </span>
        </div>
      </div>
      {count > 1 && (
        <>
          <button
            type="button"
            aria-label="Prev"
            onClick={() => setIdx((i) => (i - 1 + count) % count)}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 backdrop-blur hover:bg-white/30"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={() => setIdx((i) => (i + 1) % count)}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 backdrop-blur hover:bg-white/30"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}
      <div className="absolute bottom-3 right-6 flex gap-1.5">
        {items.map((_, i) => (
          <span
            key={i}
            className={`h-1 rounded-full transition-all ${i === idx ? "w-8 bg-[var(--brand-gold)]" : "w-4 bg-white/40"}`}
          />
        ))}
      </div>
    </div>
  );
}

function ItemCard({
  item,
  view,
  onOpen,
}: {
  item: MenuItem;
  view: "grid" | "list";
  onOpen: (i: MenuItem) => void;
}) {
  const { t, locale } = useLocale();
  const name = localizedName(item, locale);
  const note = localizedDescription(item, locale);
  const { price, startingFrom } = displayPrice(item);
  const unavailable = item.isAvailable === false;

  if (view === "list") {
    return (
      <div
        onClick={() => onOpen(item)}
        className={`flex cursor-pointer items-center gap-4 rounded-2xl border border-border bg-card p-3 shadow-sm transition hover:shadow-md ${
          unavailable ? "opacity-60" : ""
        }`}
      >
        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-muted">
          <ItemImage item={item} alt={name} />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-semibold text-foreground">{name}</h3>
          {unavailable && <p className="text-xs font-medium text-destructive">{t.menu.out_of_stock}</p>}
          {note && <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">{note}</p>}
          <div className="mt-1 text-sm">
            {startingFrom && <span className="text-xs text-muted-foreground">{t.menu.starting_from} </span>}
            <span className="font-bold">{price}</span>
            <span className="ms-1 text-xs font-semibold text-[var(--brand-gold)]">{t.common.etb}</span>
          </div>
        </div>
        <button type="button" className="rounded-full p-2 text-muted-foreground hover:bg-muted" aria-label="Info">
          <Info className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div
      onClick={() => onOpen(item)}
      className={`group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:shadow-md ${
        unavailable ? "opacity-60" : ""
      }`}
    >
      <div className="aspect-square w-full overflow-hidden bg-muted">
        <ItemImage
          item={item}
          alt={name}
          className="h-full w-full object-cover transition group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-semibold leading-tight text-foreground">{name}</h3>
        {unavailable && <p className="text-xs font-medium text-destructive">{t.menu.out_of_stock}</p>}
        {note && <p className="line-clamp-2 text-xs text-muted-foreground">{note}</p>}
        <div className="mt-auto flex items-end justify-between pt-2">
          <div>
            {startingFrom && <div className="text-[10px] text-muted-foreground">{t.menu.starting_from}</div>}
            <div>
              <span className="text-lg font-bold">{price}</span>
              <span className="ms-1 text-xs font-semibold text-[var(--brand-gold)]">{t.common.etb}</span>
            </div>
          </div>
          <button type="button" className="rounded-full p-1.5 text-muted-foreground hover:bg-muted" aria-label="Info">
            <Info className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function ItemModal({ item, onClose }: { item: MenuItem | null; onClose: () => void }) {
  const { t, locale } = useLocale();
  const [sizeIdx, setSizeIdx] = useState(0);

  useEffect(() => {
    setSizeIdx(0);
  }, [item]);

  useEffect(() => {
    if (!item) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [item, onClose]);

  if (!item) return null;
  const name = localizedName(item, locale);
  const note = localizedDescription(item, locale);
  const unavailable = item.isAvailable === false;
  const sizes = item.sizes ?? [];
  const price = sizes.length ? sizes[sizeIdx]?.price ?? item.price : displayPrice(item).price;
  const startingFrom = !sizes.length && displayPrice(item).startingFrom;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-card shadow-2xl"
      >
        <div className="aspect-video w-full bg-muted">
          <ItemImage item={item} alt={name} className="h-full w-full object-cover" />
        </div>
        <button
          type="button"
          onClick={onClose}
          className="absolute end-3 top-3 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="p-6">
          <h3 className="text-2xl font-bold">{name}</h3>
          {unavailable && <p className="mt-2 text-sm font-medium text-destructive">{t.menu.out_of_stock}</p>}
          {note && <p className="mt-2 text-sm text-muted-foreground">{note}</p>}
          {sizes.length > 0 && (
            <div className="mt-4">
              <div className="text-sm font-medium">{t.menu.sizes}</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {sizes.map((s, i) => (
                  <button
                    key={s.label}
                    type="button"
                    onClick={() => setSizeIdx(i)}
                    className={`rounded-full border px-3 py-1.5 text-sm ${
                      sizeIdx === i
                        ? "border-transparent bg-[var(--brand-gold)] text-neutral-900"
                        : "border-border hover:bg-muted"
                    }`}
                  >
                    {s.label} · {s.price} {t.common.etb}
                  </button>
                ))}
              </div>
            </div>
          )}
          <div className="mt-4 inline-flex flex-col rounded-2xl bg-muted px-5 py-3">
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{t.featured.price}</span>
            <span className="text-xl font-bold">
              {startingFrom && (
                <span className="me-1 text-xs font-normal text-muted-foreground">{t.menu.starting_from}</span>
              )}
              {price}
              <span className="ms-1 text-sm font-semibold text-[var(--brand-gold)]">{t.common.etb}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CategoryChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition ${
        active
          ? "border-transparent bg-[var(--brand-gold)] text-neutral-900"
          : "border-border bg-card text-foreground hover:bg-muted"
      }`}
    >
      {label}
    </button>
  );
}

function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();
  const [open, setOpen] = useState(false);
  const locales: Locale[] = ["en", "am", "ar"];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="rounded-full border border-border px-3 py-1.5 text-sm font-medium hover:bg-muted"
      >
        {LOCALE_LABELS[locale]}
      </button>
      {open && (
        <div className="absolute end-0 z-50 mt-2 min-w-[4.5rem] overflow-hidden rounded-xl border border-border bg-card shadow-lg">
          {locales.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => {
                setLocale(l);
                setOpen(false);
              }}
              className={`block w-full px-3 py-2 text-start text-sm hover:bg-muted ${
                locale === l ? "font-semibold text-[var(--brand-gold)]" : ""
              }`}
            >
              {LOCALE_LABELS[l]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function MenuPage() {
  const { t, locale } = useLocale();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<string>("all");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [openItem, setOpenItem] = useState<MenuItem | null>(null);
  const [dark, setDark] = useState<ThemeMode>("light");
  const [complaintOpen, setComplaintOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [featured, setFeatured] = useState<MenuItem[]>([]);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const bootRef = useRef(false);

  const loadMenu = async () => {
    setLoadError(false);
    setReady(false);
    const minDelay = new Promise((r) => setTimeout(r, 500));
    try {
      const [payload] = await Promise.all([fetchMuskMenu(), minDelay]);
      setCategories(payload.categories);
      setFeatured(payload.featured);
      setReady(true);
    } catch {
      setLoadError(true);
      setReady(true);
    }
  };

  useEffect(() => {
    if (bootRef.current) return;
    bootRef.current = true;
    const theme = readStoredTheme();
    setDark(theme);
    applyTheme(theme);
    void loadMenu();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return categories
      .filter((c) => active === "all" || c.slug === active)
      .map((c) => ({
        ...c,
        items: q
          ? c.items.filter((i) => {
              const hay = `${i.name} ${i.name_am ?? ""} ${i.name_ar ?? ""} ${i.note ?? ""} ${i.description ?? ""}`.toLowerCase();
              return hay.includes(q);
            })
          : c.items,
      }))
      .filter((c) => c.items.length > 0);
  }, [query, active, categories]);

  const scrollTo = (slug: string) => {
    setActive(slug);
    if (slug === "all") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setTimeout(() => {
      const el = sectionRefs.current[slug];
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 180;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }, 50);
  };

  if (!ready) return <MenuLoading />;
  if (loadError) return <MenuError onRetry={() => void loadMenu()} />;

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-neutral-100 py-2 text-center text-xs text-neutral-600 dark:bg-neutral-900 dark:text-neutral-300">
        {t.navbar.vat_notice}
      </div>

      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
          <a href="/" className="flex items-center gap-2">
            <img src={LOGO_ANIMAL} alt="" className="h-9 w-auto" />
            <img src={LOGO_TEXT} alt="Musk Cafe and Restaurant" className="hidden h-6 w-auto sm:block" />
          </a>
          <nav className="hidden items-center gap-6 text-sm font-medium text-foreground md:flex">
            <a className="flex items-center gap-1.5 hover:text-[var(--brand-gold)]" href="#bank-accounts-section">
              <Wallet className="h-4 w-4" /> {t.navbar.payment_options}
            </a>
            <a className="flex items-center gap-1.5 hover:text-[var(--brand-gold)]" href="#review-section">
              <Star className="h-4 w-4" /> {t.navbar.review}
            </a>
            <a className="flex items-center gap-1.5 hover:text-[var(--brand-gold)]" href="#footer">
              <MapPin className="h-4 w-4" /> {t.navbar.contact}
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setDark(toggleTheme(dark))}
              aria-label="Toggle dark mode"
              className="rounded-full border border-border p-2 hover:bg-muted"
            >
              {dark === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <LanguageSwitcher />
            <button
              type="button"
              onClick={() => setComplaintOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm font-medium hover:bg-muted"
            >
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">{t.navbar.complaint}</span>
            </button>
            <a
              href="https://raafat.site"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm font-medium hover:bg-muted lg:inline-flex"
              title={t.navbar.dev_credit_sub}
            >
              {t.navbar.dev_credit} <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 pb-3">
          <div className="relative flex-1">
            <Search className="absolute start-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.menu.search_placeholder}
              className="w-full rounded-full border border-border bg-card py-2.5 pe-10 ps-10 text-sm outline-none ring-[var(--brand-gold)] focus:ring-2"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute end-3 top-1/2 -translate-y-1/2 text-xs font-medium text-[var(--brand-gold)] hover:underline"
              >
                {t.menu.clear_search}
              </button>
            )}
          </div>
          <div className="flex items-center gap-1 rounded-full border border-border bg-card p-1">
            <button
              type="button"
              onClick={() => setView("list")}
              aria-label="List view"
              className={`rounded-full p-1.5 ${view === "list" ? "bg-muted" : ""}`}
            >
              <List className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setView("grid")}
              aria-label="Grid view"
              className={`rounded-full p-1.5 ${view === "grid" ? "bg-muted" : ""}`}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="sticky top-0 z-30 mx-auto max-w-7xl overflow-x-auto px-4 pb-3">
          <div className="flex gap-2">
            <CategoryChip
              label={t.menu.all_categories}
              active={active === "all"}
              onClick={() => scrollTo("all")}
            />
            {categories.map((c) => (
              <CategoryChip
                key={c.slug}
                label={localizedName(c, locale)}
                active={active === c.slug}
                onClick={() => scrollTo(c.slug)}
              />
            ))}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6">
        {active === "all" && query.trim() === "" && (
          <div className="mb-8">
            <HeroCarousel items={featured} />
          </div>
        )}

        <div className="space-y-12">
          {filtered.map((c) => (
            <section
              key={c.slug}
              id={c.slug}
              ref={(el) => {
                sectionRefs.current[c.slug] = el;
              }}
              className="scroll-mt-48"
            >
              <h2 className="mb-4 text-2xl font-bold tracking-tight">{localizedName(c, locale)}</h2>
              <div
                className={
                  view === "grid"
                    ? "grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
                    : "grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
                }
              >
                {c.items.map((item, i) => (
                  <ItemCard key={(item.id ?? c.slug) + i} item={item} view={view} onOpen={setOpenItem} />
                ))}
              </div>
            </section>
          ))}

          {filtered.length === 0 && (
            <div className="py-24 text-center">
              <h3 className="text-xl font-semibold text-foreground">{t.menu_page.no_results_title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {t.menu_page.no_results_desc} {query ? `“${query}”` : ""}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{t.menu_page.adjust_filters}</p>
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="mt-4 rounded-full border border-border px-4 py-2 text-sm font-medium hover:bg-muted"
                >
                  {t.menu.clear_search}
                </button>
              )}
            </div>
          )}
        </div>

        <PaymentAccountsSection />
        <ReviewSection />
        <MenuFooter />
      </main>

      <ItemModal item={openItem} onClose={() => setOpenItem(null)} />
      <ComplaintDialog open={complaintOpen} onClose={() => setComplaintOpen(false)} />
    </div>
  );
}
