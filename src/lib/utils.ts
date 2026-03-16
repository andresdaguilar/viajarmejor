import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
  return format(new Date(date), "d 'de' MMMM, yyyy", { locale: es });
}

export function formatPriceARS(value: number) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

/** Capitaliza la primera letra de cada palabra (para opciones del wizard) */
export function toTitleCase(str: string): string {
  return str.replace(/\b\w/g, (c) => c.toUpperCase());
}
