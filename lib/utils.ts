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

/**
 * Heuristic used by both the home PhotoStrip and the /cca WinGallery.
 * Returns true when a roboticsWins row's placement string starts with
 * "personal" (case-insensitive). Personal-build photos belong on
 * /achievements only — never on the home strip or the CCA page.
 */
export function isPersonalBuild(placement: string): boolean {
  return placement.toLowerCase().startsWith("personal");
}
