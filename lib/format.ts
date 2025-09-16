export function formatPriceCHF(value?: number): string {
  if (value === undefined || Number.isNaN(value)) return "auf Anfrage";
  return new Intl.NumberFormat("de-CH", { style: "currency", currency: "CHF", maximumFractionDigits: 0 }).format(value);
}

export function toTitleCase(input: string): string {
  return input
    .split(" ")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

