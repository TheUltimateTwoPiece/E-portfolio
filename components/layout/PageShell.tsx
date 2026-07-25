"use client";

import { TopNav } from "@/components/nav/TopNav";
import { Footer } from "@/components/Footer";
import { PCBSchematicBg } from "@/components/ui/PCBSchematicBg";
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
      {/* Persistent PCB-silkscreen background. Sits behind every page. */}
      <PCBSchematicBg />
      <TopNav />
      <main className={cn("relative min-h-screen", className)}>{children}</main>
      {withFooter && <Footer />}
    </>
  );
}
