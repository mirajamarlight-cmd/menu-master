import { useState } from "react";
import { Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useLocale } from "@/i18n/locale-context";
import { resolveMuskCafeId } from "@/lib/musk-cafe";

const RATING_KEYS = ["place", "food", "service"] as const;
const URGENCY = ["low", "medium", "high"] as const;
const STAR_LABELS = ["poor", "fair", "good", "great", "excellent"] as const;

export function ReviewSection() {
  const { t, dir } = useLocale();
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [text, setText] = useState("");
  const [urgency, setUrgency] = useState<(typeof URGENCY)[number]>("low");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const complete = RATING_KEYS.every((k) => (ratings[k] ?? 0) > 0);

  function reset() {
    setRatings({});
    setText("");
    setUrgency("low");
    setName("");
    setPhone("");
    setEmail("");
    setSubmitted(false);
    setError(false);
  }

  async function submit() {
    if (!complete) return;
    setSubmitting(true);
    setError(false);
    try {
      const cafeId = await resolveMuskCafeId();
      const { error: insertError } = await supabase.from("reviews").insert({
        cafe_id: cafeId,
        rating_place: ratings.place,
        rating_food: ratings.food,
        rating_service: ratings.service,
        comment: text.trim() || null,
        urgency,
        guest_name: name.trim() || null,
        guest_phone: phone.trim() || null,
        guest_email: email.trim() || null,
      });
      if (insertError) throw insertError;
      setSubmitted(true);
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <section id="review-section" dir={dir} className="mt-12 rounded-3xl border border-border bg-card p-6 text-center sm:p-10">
        <h2 className="text-2xl font-bold">{t.review.thank_you}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{t.review.thank_you_message}</p>
        <button
          type="button"
          onClick={reset}
          className="mt-4 rounded-full border border-border px-5 py-2 text-sm font-medium hover:bg-muted"
        >
          {t.review.submit_another}
        </button>
      </section>
    );
  }

  return (
    <section id="review-section" dir={dir} className="mt-12 rounded-3xl border border-border bg-card p-6 sm:p-10">
      <h2 className="text-2xl font-bold">{t.review.title}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{t.review.subtitle}</p>
      {error && (
        <p className="mt-3 rounded-xl border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {t.common.error}
        </p>
      )}
      <div className="mt-6 grid gap-6 sm:grid-cols-3">
        {RATING_KEYS.map((key) => (
          <div key={key}>
            <div className="text-sm font-medium">{t.review.categories[key]}</div>
            <div className="mt-2 flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setRatings((r) => ({ ...r, [key]: n }))}
                  aria-label={t.review.rating_labels[STAR_LABELS[n - 1]]}
                >
                  <Star
                    className={`h-7 w-7 transition ${
                      (ratings[key] ?? 0) >= n
                        ? "fill-[var(--brand-gold)] text-[var(--brand-gold)]"
                        : "text-neutral-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <div className="mb-1 text-sm font-medium">
          {t.review.tell_us_more} <span className="text-muted-foreground">{t.review.optional}</span>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t.review.placeholder_comment}
          maxLength={2000}
          rows={4}
          className="w-full rounded-2xl border border-border bg-background p-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-gold)]"
        />
        <div className="mt-1 text-end text-xs text-muted-foreground">{text.length} / 2000</div>
      </div>
      <div className="mt-4">
        <div className="text-sm font-medium">{t.review.how_important}</div>
        <div className="mt-2 flex flex-wrap gap-2">
          {URGENCY.map((u) => (
            <button
              key={u}
              type="button"
              onClick={() => setUrgency(u)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                urgency === u
                  ? "border-transparent bg-[var(--brand-gold)] text-neutral-900"
                  : "border-border bg-card hover:bg-muted"
              }`}
            >
              {t.review.urgency[u]}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-6">
        <div className="text-sm font-medium">{t.review.add_details}</div>
        <p className="text-xs text-muted-foreground">{t.review.details_hint}</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t.review.placeholder_name}
            className="rounded-2xl border border-border bg-background p-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-gold)]"
          />
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={t.review.placeholder_phone}
            className="rounded-2xl border border-border bg-background p-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-gold)]"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.review.placeholder_email}
            className="rounded-2xl border border-border bg-background p-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-gold)]"
          />
        </div>
      </div>
      <button
        type="button"
        disabled={!complete || submitting}
        onClick={() => void submit()}
        className="mt-4 rounded-full bg-[var(--brand-gold)] px-6 py-2.5 text-sm font-bold text-neutral-900 hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {submitting ? t.review.submitting : t.review.submit}
      </button>
      {!complete && <p className="mt-2 text-xs text-muted-foreground">{t.review.rate_all}</p>}
    </section>
  );
}
