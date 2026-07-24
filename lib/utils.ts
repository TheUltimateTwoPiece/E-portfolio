import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Year used in the Footer "Built …" line and the /contact "typed from
 * scratch · …" line. Computed once at module load so SSR and CSR agree.
 * Use `suppressHydrationWarning` on the wrapping element as a belt-and-braces.
 */
export const footerYear: number = new Date().getFullYear();
