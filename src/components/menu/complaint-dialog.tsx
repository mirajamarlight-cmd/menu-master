import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useLocale } from "@/i18n/locale-context";
import { resolveMuskCafeId } from "@/lib/musk-cafe";

type Props = {
  open: boolean;
  onClose: () => void;
};

const empty = { full_name: "", email: "", phone: "", subject: "", message: "" };

export function ComplaintDialog({ open, onClose }: Props) {
  const { t, dir } = useLocale();
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);

  useEffect(() => {
    if (!open) {
      setForm(empty);
      setErrors({});
      setSuccess(false);
      setFail(false);
      setSubmitting(false);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  function validate() {
    const next: Record<string, string> = {};
    if (!form.full_name.trim()) next.full_name = t.common.required;
    if (!form.subject.trim()) next.subject = t.common.required;
    if (!form.message.trim()) next.message = t.common.required;
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = t.common.error;
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function submit() {
    if (!validate()) return;
    setSubmitting(true);
    setFail(false);
    try {
      const cafeId = await resolveMuskCafeId();
      const { error } = await supabase.from("complaints").insert({
        cafe_id: cafeId,
        full_name: form.full_name.trim(),
        email: form.email.trim() || null,
        phone: form.phone.trim() || null,
        subject: form.subject.trim(),
        message: form.message.trim(),
      });
      if (error) throw error;
      setSuccess(true);
    } catch {
      setFail(true);
    } finally {
      setSubmitting(false);
    }
  }

  const fields = [
    { key: "full_name" as const, type: "text", required: true },
    { key: "email" as const, type: "email", required: false },
    { key: "phone" as const, type: "tel", required: false },
    { key: "subject" as const, type: "text", required: true },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" onClick={onClose}>
      <div
        dir={dir}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-card shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute end-3 top-3 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
          aria-label={t.common.cancel}
        >
          <X className="h-4 w-4" />
        </button>

        {success ? (
          <div className="space-y-3 p-8 text-center">
            <h3 className="text-xl font-bold">{t.complaint.success_title}</h3>
            <p className="text-sm text-muted-foreground">{t.complaint.success_message}</p>
            <button
              type="button"
              onClick={onClose}
              className="mt-2 rounded-full bg-[var(--brand-gold)] px-6 py-2.5 text-sm font-bold text-neutral-900"
            >
              {t.common.cancel}
            </button>
          </div>
        ) : (
          <div className="p-6 sm:p-8">
            <h3 className="text-lg font-semibold">{t.complaint.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{t.complaint.description}</p>
            {fail && (
              <p className="mt-3 rounded-xl border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {t.complaint.error_message}
              </p>
            )}
            <div className="mt-4 space-y-3">
              {fields.map((f) => (
                <div key={f.key}>
                  <label className="mb-1 block text-sm font-medium">
                    {t.complaint[f.key]}{" "}
                    {f.required ? <span className="text-destructive">*</span> : <span className="text-muted-foreground">{t.complaint.optional}</span>}
                  </label>
                  <input
                    type={f.type}
                    value={form[f.key]}
                    onChange={(e) => setForm((prev) => ({ ...prev, [f.key]: e.target.value }))}
                    placeholder={
                      f.key === "full_name"
                        ? t.complaint.full_name_placeholder
                        : f.key === "email"
                          ? t.complaint.email_placeholder
                          : f.key === "phone"
                            ? t.complaint.phone_placeholder
                            : t.complaint.subject_placeholder
                    }
                    className={`w-full rounded-xl border bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-gold)] ${
                      errors[f.key] ? "border-destructive" : "border-border"
                    }`}
                  />
                  {errors[f.key] && <p className="mt-1 text-xs text-destructive">{errors[f.key]}</p>}
                </div>
              ))}
              <div>
                <label className="mb-1 block text-sm font-medium">
                  {t.complaint.message} <span className="text-destructive">*</span>
                </label>
                <textarea
                  value={form.message}
                  maxLength={500}
                  rows={4}
                  onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                  placeholder={t.complaint.message_placeholder}
                  className={`w-full rounded-xl border bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--brand-gold)] ${
                    errors.message ? "border-destructive" : "border-border"
                  }`}
                />
                <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                  {errors.message ? <span className="text-destructive">{errors.message}</span> : <span />}
                  <span>{form.message.length}/500</span>
                </div>
              </div>
            </div>
            <button
              type="button"
              disabled={submitting}
              onClick={() => void submit()}
              className="mt-4 w-full rounded-full bg-[var(--brand-gold)] px-6 py-2.5 text-sm font-bold text-neutral-900 disabled:opacity-50"
            >
              {submitting ? t.complaint.submitting : t.complaint.submit}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
