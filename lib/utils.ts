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
  style: "decimal" | "currency" | "unit" | "percent" = "currency"
) {
  const currencyFormatter = new Intl.NumberFormat("id-ID", {
    style: style,
    currency: "IDR",
    maximumFractionDigits: 0,
  });

  return currencyFormatter.format(value);
}

export function generateRowId() {
  return typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2, 9);
}

export function formatSlug(val: string): string {
  return val
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-"); // Replace multiple hyphens with single hyphen
}
