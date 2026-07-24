"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { identity } from "@/lib/data";
import { cn } from "@/lib/utils";

const routes = [
  { href: "/", label: "Home", mono: "00" },
  { href: "/cca", label: "Robotics CCA", mono: "01" },
  { href: "/projects", label: "Projects", mono: "02" },
  { href: "/achievements", label: "Achievements", mono: "03" },
  { href: "/hobbies", label: "Hobbies", mono: "04" },
  { href: "/contact", label: "Contact", mono: "05" },
];

export function TopNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const initials = identity.firstName[0]?.toUpperCase() ?? "H";

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-pcb-base/90 backdrop-blur-md border-b-2 border-gold/40"
          : "bg-pcb-base/40 backdrop-blur-sm border-b border-pcb-edge/20"
      )}
    >
      <nav className="max-w-7xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="font-display font-bold text-pcb-ink text-sm flex items-center gap-2.5 group"
        >
          <span className="relative flex h-8 w-8 items-center justify-center">
            <span className="absolute inset-0 border-2 border-gold rotate-45 group-hover:border-gold-bright transition-colors" />
            <span className="absolute inset-1.5 bg-gold/20 rotate-45" />
            <span className="font-display text-sm font-bold text-gold relative z-10">
              {initials}
            </span>
          </span>
          <span className="hidden sm:inline-flex items-center gap-2">
            <span className="mono-label">//</span>
            <span className="group-hover:text-gold transition-colors">
              {identity.firstName}
            </span>
            <span className="text-pcb-dim text-[12px]">{identity.lastName}</span>
            <span className="font-mono text-[10px] text-gold animate-cursor-blink">
              _
            </span>
          </span>
        </Link>

        {/* Desktop route strip — bigger, clearer active state */}
        <ul className="hidden lg:flex items-center gap-0.5 font-mono text-[12px]">
          {routes.slice(1).map((r) => {
            const active = pathname === r.href;
            return (
              <li key={r.href}>
                <Link
                  href={r.href}
                  className={cn(
                    "relative px-3 py-2 inline-flex items-center gap-1.5 transition-colors",
                    active ? "text-gold" : "text-pcb-muted hover:text-pcb-ink"
                  )}
                >
                  <span className="text-[10px] text-pcb-dim">{r.mono}</span>
                  <span
                    className={cn(
                      "tracking-tight",
                      active ? "font-semibold" : "font-normal"
                    )}
                  >
                    {r.label}
                  </span>
                  {active && (
                    <motion.span
                      layoutId="route-pill"
                      className="absolute inset-x-2 -bottom-px h-[2px] bg-gold"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/contact"
            className={cn(
              "group inline-flex items-center gap-2 border px-4 py-2 font-mono text-[12px] font-semibold transition-colors",
              pathname === "/contact"
                ? "border-gold text-gold bg-gold/5"
                : "border-pcb-edge/60 text-pcb-ink hover:border-gold/60 hover:text-gold hover:bg-gold/5"
            )}
          >
            <span className="h-1.5 w-1.5 bg-gold rounded-full group-hover:animate-pulse-glow" />
            <span>SAY HI</span>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          className="lg:hidden h-10 w-10 grid place-items-center border-2 border-pcb-edge/60 text-pcb-ink hover:border-gold/60"
          onClick={() => setOpen((v) => !v)}
        >
          <span
            aria-hidden
            className="block w-4 h-px bg-current relative
              before:content-[''] before:absolute before:left-0 before:right-0 before:-top-1.5 before:h-px before:bg-current
              after:content-[''] after:absolute after:left-0 after:right-0 after:top-1.5 after:h-px after:bg-current"
          />
        </button>
      </nav>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden overflow-hidden bg-pcb-panel border-b-2 border-gold/40"
          >
            <ul className="px-6 py-4 space-y-1">
              {routes.map((r) => {
                const active = pathname === r.href;
                return (
                  <li key={r.href}>
                    <Link
                      href={r.href}
                      className={cn(
                        "flex items-center justify-between gap-3 py-3 px-3 font-mono text-sm border-b border-pcb-edge/30",
                        active
                          ? "text-gold bg-gold/5 border-l-2 border-l-gold"
                          : "text-pcb-ink hover:bg-pcb-surface/40"
                      )}
                    >
                      <span>
                        <span className="text-pcb-dim mr-3">{r.mono}</span>
                        {r.label}
                      </span>
                      <span className="mono-label text-pcb-dim">
                        {active ? "· HERE" : "→"}
                      </span>
                    </Link>
                  </li>
                );
              })}
              <li className="pt-3 mt-2 flex items-center justify-between text-xs font-mono text-pcb-muted">
                <span>{identity.email}</span>
                <span>{identity.phone}</span>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
