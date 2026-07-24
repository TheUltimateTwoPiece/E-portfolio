"use client";

import { TopNav } from "@/components/nav/TopNav";
import { Footer } from "@/components/Footer";
import { cn } from "@/lib/utils";

export function PageShell({
  children,
  withFooter = true,
  className,
}: {
  children: React.ReactNode;
  withFooter?: boolean;
  className?: string;
}) {
  return (
    <>
      <TopNav />
      <main className={cn("relative min-h-screen", className)}>{children}</main>
      {withFooter && <Footer />}
    </>
  );
}
