import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, Info, LayoutGrid, List, MapPin, MessageSquare, Moon, Phone, Search, Star, Sun, Wallet, X } from "lucide-react";
import { categories, popular, LOGO_ANIMAL, LOGO_TEXT, type MenuItem } from "@/lib/menu-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Musk Restaurant — Digital Menu" },
      { name: "description", content: "Browse the Musk Restaurant digital menu: breakfast, mains, drinks and more." },
      { property: "og:title", content: "Musk Restaurant — Digital Menu" },
      { property: "og:description", content: "Browse the Musk Restaurant digital menu." },
    ],
  }),
  component: MenuPage,
});

function Placeholder() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-white p-4">
      <img src={LOGO_ANIMAL} alt="Musk" className="h-16 w-auto object-contain" />
      <img src={LOGO_TEXT} alt="Musk Restaurant" className="h-6 w-auto object-contain" />
    </div>
  );
}

function ItemImage({ item, className }: { item: MenuItem; className?: string }) {
  const [failed, setFailed] = useState(false);
  if (!item.image || failed) return <Placeholder />;
  return (
    <img
      src={item.image}
      alt={item.name}
      loading="lazy"
      onError={() => setFailed(true)}
      className={className ?? "h-full w-full object-cover"}
    />
  );
}

function HeroCarousel() {
  const [idx, setIdx] = useState(0);
  const count = popular.length;
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % count), 5000);
    return () => clearInterval(t);
  }, [count]);
  const item = popular[idx];
  return (
    <div className="relative overflow-hidden rounded-3xl bg-neutral-900 text-white shadow-xl">
      <div className="relative aspect-[16/9] w-full sm:aspect-[21/9]">
        <ItemImage item={item} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-[var(--brand-gold)] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-neutral-900">
            Popular Order
          </span>
          <span className="text-xs text-white/70">
            {String(idx + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </span>
        </div>
        <h2 className="mt-4 text-3xl font-bold sm:text-5xl">{item.name}</h2>
        <div className="mt-4 inline-flex flex-col rounded-2xl bg-white/10 px-5 py-3 backdrop-blur">
          <span className="text-[10px] uppercase tracking-widest text-white/70">Price</span>
          <span className="text-xl font-bold">
            {item.price} <span className="text-sm font-semibold text-[var(--brand-gold)]">ETB</span>
          </span>
        </div>
      </div>
      <button
        aria-label="Prev"
        onClick={() => setIdx((i) => (i - 1 + count) % count)}
        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 backdrop-blur hover:bg-white/30"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        aria-label="Next"
        onClick={() => setIdx((i) => (i + 1) % count)}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 backdrop-blur hover:bg-white/30"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
      <div className="absolute bottom-3 right-6 flex gap-1.5">
        {popular.map((_, i) => (
          <span
            key={i}
            className={`h-1 rounded-full transition-all ${i === idx ? "w-8 bg-[var(--brand-gold)]" : "w-4 bg-white/40"}`}
          />
        ))}
      </div>
    </div>
  );
}

function ItemCard({ item, view, onOpen }: { item: MenuItem; view: "grid" | "list"; onOpen: (i: MenuItem) => void }) {
  if (view === "list") {
    return (
      <div
        onClick={() => onOpen(item)}
        className="flex cursor-pointer items-center gap-4 rounded-2xl border border-border bg-card p-3 shadow-sm transition hover:shadow-md"
      >
        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-muted">
          <ItemImage item={item} />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-semibold text-foreground">{item.name}</h3>
          {item.note && <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">{item.note}</p>}
          <div className="mt-1 text-sm">
            {item.startingFrom && <span className="text-xs text-muted-foreground">Starting from </span>}
            <span className="font-bold">{item.price}</span>
            <span className="ml-1 text-xs font-semibold text-[var(--brand-gold)]">ETB</span>
          </div>
        </div>
        <button className="rounded-full p-2 text-muted-foreground hover:bg-muted" aria-label="Info">
          <Info className="h-4 w-4" />
        </button>
      </div>
    );
  }
  return (
    <div
      onClick={() => onOpen(item)}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:shadow-md"
    >
      <div className="aspect-square w-full overflow-hidden bg-muted">
        <ItemImage item={item} className="h-full w-full object-cover transition group-hover:scale-105" />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-semibold leading-tight text-foreground">{item.name}</h3>
        {item.note && <p className="line-clamp-2 text-xs text-muted-foreground">{item.note}</p>}
        <div className="mt-auto flex items-end justify-between pt-2">
          <div>
            {item.startingFrom && <div className="text-[10px] text-muted-foreground">Starting from</div>}
            <div>
              <span className="text-lg font-bold">{item.price}</span>
              <span className="ml-1 text-xs font-semibold text-[var(--brand-gold)]">ETB</span>
            </div>
          </div>
          <button className="rounded-full p-1.5 text-muted-foreground hover:bg-muted" aria-label="Info">
            <Info className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function ItemModal({ item, onClose }: { item: MenuItem | null; onClose: () => void }) {
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
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-card shadow-2xl"
      >
        <div className="aspect-video w-full bg-muted">
          <ItemImage item={item} className="h-full w-full object-cover" />
        </div>
        <button
          onClick={onClose}
          className="absolute right-3 top-3 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="p-6">
          <h3 className="text-2xl font-bold">{item.name}</h3>
          {item.note && <p className="mt-2 text-sm text-muted-foreground">{item.note}</p>}
          <div className="mt-4 inline-flex flex-col rounded-2xl bg-muted px-5 py-3">
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Price</span>
            <span className="text-xl font-bold">
              {item.startingFrom && <span className="mr-1 text-xs font-normal text-muted-foreground">Starting from</span>}
              {item.price}
              <span className="ml-1 text-sm font-semibold text-[var(--brand-gold)]">ETB</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}


function MenuPage() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<string>("all");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [openItem, setOpenItem] = useState<MenuItem | null>(null);
  const [dark, setDark] = useState(false);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return categories
      .filter((c) => active === "all" || c.slug === active)
      .map((c) => ({
        ...c,
        items: q ? c.items.filter((i) => i.name.toLowerCase().includes(q)) : c.items,
      }))
      .filter((c) => c.items.length > 0);
  }, [query, active]);

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

  return (
    <div className="min-h-screen bg-background">
      {/* Top strip */}
      <div className="bg-neutral-100 py-2 text-center text-xs text-neutral-600">
        All prices include VAT &amp; Service Charge
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
          <a href="#" className="flex items-center gap-2">
            <img src={LOGO_ANIMAL} alt="" className="h-9 w-auto" />
            <img src={LOGO_TEXT} alt="Musk Restaurant" className="hidden h-6 w-auto sm:block" />
          </a>
          <nav className="hidden items-center gap-6 text-sm font-medium text-foreground md:flex">
            <a className="flex items-center gap-1.5 hover:text-[var(--brand-gold)]" href="#payment">
              <Wallet className="h-4 w-4" /> Payment Options
            </a>
            <a className="flex items-center gap-1.5 hover:text-[var(--brand-gold)]" href="#review">
              <Star className="h-4 w-4" /> Review
            </a>
            <a className="flex items-center gap-1.5 hover:text-[var(--brand-gold)]" href="#contact">
              <MapPin className="h-4 w-4" /> Contact
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <button className="hidden rounded-full border border-border px-3 py-1.5 text-sm font-medium hover:bg-muted sm:inline-flex">
              EN
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm font-medium hover:bg-muted">
              <MessageSquare className="h-4 w-4" /> Complaint
            </button>
          </div>
        </div>

        {/* Search + view toggle */}
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 pb-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for dishes, drinks..."
              className="w-full rounded-full border border-border bg-card py-2.5 pl-10 pr-4 text-sm outline-none ring-[var(--brand-gold)] focus:ring-2"
            />
          </div>
          <div className="flex items-center gap-1 rounded-full border border-border bg-card p-1">
            <button
              onClick={() => setView("list")}
              aria-label="List view"
              className={`rounded-full p-1.5 ${view === "list" ? "bg-muted" : ""}`}
            >
              <List className="h-4 w-4" />
            </button>
            <button
              onClick={() => setView("grid")}
              aria-label="Grid view"
              className={`rounded-full p-1.5 ${view === "grid" ? "bg-muted" : ""}`}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Category chips */}
        <div className="mx-auto max-w-7xl overflow-x-auto px-4 pb-3">
          <div className="flex gap-2">
            <CategoryChip label="All" active={active === "all"} onClick={() => scrollTo("all")} />
            {categories.map((c) => (
              <CategoryChip
                key={c.slug}
                label={c.name}
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
            <HeroCarousel />
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
              <h2 className="mb-4 text-2xl font-bold tracking-tight">{c.name}</h2>
              <div
                className={
                  view === "grid"
                    ? "grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
                    : "grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
                }
              >
                {c.items.map((item, i) => (
                  <ItemCard key={c.slug + i} item={item} view={view} />
                ))}
              </div>
            </section>
          ))}

          {filtered.length === 0 && (
            <div className="py-24 text-center text-muted-foreground">No items match your search.</div>
          )}
        </div>

        {/* Payment */}
        <section id="payment" className="mt-20 rounded-3xl border border-border bg-card p-6 sm:p-10">
          <h2 className="text-2xl font-bold">Payment Transfer Accounts</h2>
          <p className="mt-1 text-sm text-muted-foreground">Transfer your payment to any of the accounts below</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <BankCard bank="Commercial Bank of Ethiopia (CBE)" holder="Musk Restaurant PLC" number="1000727868686" />
            <BankCard bank="Dashen Bank" holder="Musk Restaurant PLC" number="7912292094211" />
            <BankCard bank="Telebirr" holder="Musk" number="0967777778" />
          </div>
        </section>

        {/* Review */}
        <section id="review" className="mt-12 rounded-3xl border border-border bg-card p-6 sm:p-10">
          <h2 className="text-2xl font-bold">Share Your Experience</h2>
          <p className="mt-1 text-sm text-muted-foreground">Your honest feedback helps us serve you better every visit.</p>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {["Place & Ambiance", "Food & Drinks", "Customer Service"].map((label) => (
              <div key={label}>
                <div className="text-sm font-medium">{label}</div>
                <div className="mt-2 flex gap-1">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <Star key={n} className="h-6 w-6 text-neutral-300" />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <textarea
            placeholder="Tell us more (optional)"
            maxLength={2000}
            className="mt-6 w-full rounded-2xl border border-border bg-background p-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-gold)]"
            rows={4}
          />
          <button className="mt-4 rounded-full bg-[var(--brand-gold)] px-6 py-2.5 text-sm font-bold text-neutral-900 hover:brightness-95">
            Submit Review
          </button>
        </section>

        <footer id="contact" className="mt-16 pb-10 pt-8 text-center text-sm text-muted-foreground">
          <img src={LOGO_TEXT} alt="Musk Restaurant" className="mx-auto h-8" />
          <p className="mt-3">© {new Date().getFullYear()} Musk Restaurant</p>
        </footer>
      </main>
    </div>
  );
}

function CategoryChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
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

function BankCard({ bank, holder, number }: { bank: string; holder: string; number: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="rounded-2xl border border-border bg-background p-5">
      <div className="text-base font-semibold">{bank}</div>
      <div className="mt-1 text-xs text-muted-foreground">Savings · ETB</div>
      <div className="mt-3 text-xs text-muted-foreground">Account Name: {holder}</div>
      <div className="mt-2 flex items-center justify-between gap-2 rounded-xl bg-muted px-3 py-2">
        <span className="font-mono text-sm">{number}</span>
        <button
          onClick={() => {
            navigator.clipboard?.writeText(number);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          }}
          className="text-xs font-semibold text-[var(--brand-gold)] hover:underline"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </div>
  );
}
