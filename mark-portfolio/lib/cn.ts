import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Voegt Tailwind-klassen samen en lost conflicten op (de laatste wint).
 * Gebruik: cn("text-ivory/60", isActive && "text-champagne", className)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
