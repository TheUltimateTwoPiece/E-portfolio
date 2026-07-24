import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
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
  title: {
    default: "Hemanth · Robotics maker and software tinkerer",
    template: "%s · Hemanth",
  },
  description:
    "Personal portfolio of Kakarla Hemanth Reddy . secondary school student at SST Singapore who builds robots in CCA and writes full-stack apps on weekends.",
  openGraph: {
    type: "website",
    title: "Hemanth · Robotics maker and software tinkerer",
    description:
      "Robotics at SST, the Homework Board for his class, the Meal Planning App and the robotic arm. Plus piano and swimming.",
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
