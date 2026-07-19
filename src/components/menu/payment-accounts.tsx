import { useState } from "react";
import { ChevronDown, ChevronUp, QrCode } from "lucide-react";
import { useLocale } from "@/i18n/locale-context";
import { paymentAccounts, qrImageForAccount, type PaymentAccount } from "@/lib/payment-accounts";

function BankCard({ account }: { account: PaymentAccount }) {
  const { t } = useLocale();
  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const typeLabel = t.payment.account_types[account.type];

  return (
    <div className="rounded-2xl border border-border bg-background p-5">
      <div className="text-base font-semibold">{account.bank}</div>
      <div className="mt-1 text-xs text-muted-foreground">
        {typeLabel} · {t.common.etb}
      </div>
      <div className="mt-3 text-xs text-muted-foreground">
        {t.payment.account_name}: {account.holder}
      </div>
      <div className="mt-2 flex items-center justify-between gap-2 rounded-xl bg-muted px-3 py-2">
        <span className="font-mono text-sm">{account.number}</span>
        <button
          type="button"
          onClick={() => {
            void navigator.clipboard?.writeText(account.number);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          }}
          className="text-xs font-semibold text-[var(--brand-gold)] hover:underline"
        >
          {copied ? t.payment.copied : t.payment.copy}
        </button>
      </div>
      <button
        type="button"
        onClick={() => setShowQr((v) => !v)}
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-muted/50 px-3 py-2 text-xs font-medium text-muted-foreground transition hover:bg-muted"
      >
        <QrCode className="h-3.5 w-3.5" />
        {t.payment.show_qr}
        {showQr ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>
      {showQr && (
        <div className="mt-3 flex justify-center rounded-xl border border-border bg-white p-4">
          <img
            src={qrImageForAccount(account)}
            alt={`QR code for ${account.bank}`}
            className="h-40 w-40 object-contain"
          />
        </div>
      )}
    </div>
  );
}

export function PaymentAccountsSection() {
  const { t } = useLocale();
  return (
    <section id="bank-accounts-section" className="mt-20 rounded-3xl border border-border bg-card p-6 sm:p-10">
      <h2 className="text-2xl font-bold">{t.payment.title}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{t.payment.subtitle}</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {paymentAccounts.map((account) => (
          <BankCard key={account.id} account={account} />
        ))}
      </div>
    </section>
  );
}
