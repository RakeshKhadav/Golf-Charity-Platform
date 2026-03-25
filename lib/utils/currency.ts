/**
 * Formats a number as Indian Rupee (INR) with 2 decimal places.
 * Example: 1250.5 -> ₹1,250.50
 */
export function formatINR(value: unknown): string {
  const numberValue = typeof value === "number" ? value : Number(value);
  
  if (!Number.isFinite(numberValue)) {
    return "₹0.00";
  }

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numberValue);
}

/**
 * Strips the currency symbol and returns only the formatted number string.
 * Useful for large data displays where the symbol is provided separately.
 */
export function formatAmount(value: unknown): string {
  const numberValue = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(numberValue)) return "0.00";
  
  return new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numberValue);
}
