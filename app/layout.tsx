import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import { identity, cca } from "@/lib/data";
import "./globals.css";

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  // Default tab title + per-page template. Both edit via identity in lib/data.ts.
  title: {
    default: `${identity.firstName} · ${identity.shortRole}`,
    template: `%s · ${identity.firstName}`,
  },
  description: `${identity.shortRole} at ${identity.school}. ${identity.oneLine}`,
  openGraph: {
    type: "website",
    title: `${identity.firstName} · ${identity.shortRole}`,
    description: `${identity.shortRole} at ${identity.school}. ${identity.oneLine}`,
  },
};

export const viewport: Viewport = {
  themeColor: "#08090c",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${mono.variable} ${sans.variable}`}>
      <body className="font-sans antialiased bg-pcb-base text-pcb-ink min-h-screen">
        {children}
      </body>
    </html>
  );
}
