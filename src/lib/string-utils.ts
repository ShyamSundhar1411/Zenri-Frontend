export const maskNumber = (num?: string) => `**** **** **** ${num?.slice(-4)}`;

export function formatCardNumber(value: string) {
  const digits = value.replace(/\D/g, "");

  const groups = digits.match(/.{1,4}/g);
  return groups ? groups.join(" ") : "";
}
