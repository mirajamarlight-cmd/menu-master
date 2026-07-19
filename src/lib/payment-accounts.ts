export type AccountType = "savings" | "current" | "mobile_wallet";

export type PaymentAccount = {
  id: string;
  bank: string;
  holder: string;
  number: string;
  type: AccountType;
  /** Optional hosted QR; falls back to generated QR from account number */
  qrUrl?: string;
};

export const paymentAccounts: PaymentAccount[] = [
  {
    id: "cbe",
    bank: "Commercial Bank of Ethiopia (CBE)",
    holder: "Musk Restaurant PLC",
    number: "1000727868686",
    type: "savings",
  },
  {
    id: "dashen",
    bank: "Dashen Bank",
    holder: "Musk Restaurant PLC",
    number: "7912292094211",
    type: "savings",
  },
  {
    id: "telebirr",
    bank: "Telebirr",
    holder: "Musk",
    number: "0967777778",
    type: "mobile_wallet",
  },
];

export function qrImageForAccount(account: PaymentAccount): string {
  if (account.qrUrl) return account.qrUrl;
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(account.number)}`;
}
