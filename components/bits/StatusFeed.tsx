"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { statusFeed } from "@/lib/data";
import { useReducedMotion } from "framer-motion";

/**
 * Status ticker . types of things I'm actively doing / reading / building.
 * Cycles through one every few seconds, with a soft crossfade.
 * Designed to look like a realtime update strip, not a carousel.
 */
export function StatusFeed({
  intervalMs = 3200,
  className = "",
}: {
  intervalMs?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(
      () => setIndex((i) => (i + 1) % statusFeed.length),
      intervalMs
    );
    return () => clearInterval(t);
  }, [intervalMs]);

  const line = statusFeed[index];

  if (reduceMotion) {
    // Static fallback for prefers-reduced-motion users.
    return (
      <div
        role="status"
        aria-live="polite"
        className={`font-mono text-[13px] inline-flex items-center gap-2 ${className}`}
      >
        <span className="mono-label text-pcb-dim">// NOW</span>
        <span className="text-gold">›</span>
        <span className="text-pcb-ink">{line}</span>
      </div>
    );
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className={`font-mono text-[13px] inline-flex items-center gap-2 ${className}`}
    >
      <span className="mono-label text-pcb-dim">// NOW</span>
      <span className="text-gold">›</span>
      <div className="relative h-[1.4em] overflow-hidden min-w-[260px]">
        <AnimatePresence mode="wait">
          <motion.span
            key={index}
            initial={{ y: "60%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-60%", opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 top-0 text-pcb-ink"
          >
            {line}
            <span className="text-gold animate-cursor-blink"> _</span>
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}
