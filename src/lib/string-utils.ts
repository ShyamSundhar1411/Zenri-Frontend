export const maskNumber = (num?: string) => `**** **** **** ${num?.slice(-4)}`;

export function formatCardNumber(value: string) {
  const digits = value.replace(/\D/g, "");

  const groups = digits.match(/.{1,4}/g);
  return groups ? groups.join(" ") : "";
}

export function expiryToTimeStamp(expiry: string): string | null {
  if (!expiry) return null; // empty input

  const [mmStr, yyStr] = expiry.split("/");
  if (!mmStr || !yyStr) return null;

  const mm = Number(mmStr);
  const yy = Number(yyStr);

  if (Number.isNaN(mm) || Number.isNaN(yy)) return null;
  if (mm < 1 || mm > 12) return null;

  const fullYear = 2000 + yy;
  const date = new Date(fullYear, mm, 0);
  return date.toISOString();
}
