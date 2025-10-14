import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Use this formatter to format currency in IDR (Indonesian Rupiah)
 * Example: formatCurrency(15000000) => "Rp15.000.000"
 * Example: formatCurrency(15000000, decimal) => "15.000.000"
 */

export function formatCurrency(
  value: number,
  style: "decimal" | "currency" | "unit" | "percent" = "currency",
) {
  const currencyFormatter = new Intl.NumberFormat("id-ID", {
    style: style,
    currency: "IDR",
    maximumFractionDigits: 0,
  });

  return currencyFormatter.format(value);
}
