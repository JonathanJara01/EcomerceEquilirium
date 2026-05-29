import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Fusiona múltiples nombres de clases de CSS condicionales y resuelve conflictos de Tailwind.
export function cn(...entradas: ClassValue[]) {
  return twMerge(clsx(entradas));
}
