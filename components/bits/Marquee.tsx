"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface MarqueeProps {
  items: string[];
  /** Seconds for one full pass */
  speed?: number;
  separator?: string;
  reverse?: boolean;
  className?: string;
  /** Color tokens cycle through these on each item */
  accents?: string[];
}

/**
 * Type-rack marquee . the same visual trick as old newspaper
 * stock tickers, just with monospace tech labels. Stops cleanly
 * on reduced-motion.
 */
export function Marquee({
  items,
  speed = 32,
  separator = "/",
  reverse = false,
  className = "",
  accents = ["#eab308", "#79c0ff", "#f59e0b", "#5eead4"],
}: MarqueeProps) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) {
    return (
      <div className={cn("overflow-hidden border-y border-pcb-edge/40 py-3", className)}>
        <div className="font-display font-bold text-2xl text-pcb-ink truncate">
          {items.slice(0, 8).map((t, i) => (
            <span key={i} className="mx-3 inline-flex items-center gap-3">
              <span style={{ color: accents[i % accents.length] }}>{t}</span>
              <span className="text-pcb-dim">{separator}</span>
            </span>
          ))}
        </div>
      </div>
    );
  }

  // Duplicate for seamless wrap
  const loop = [...items, ...items];

  return (
    <div
      role="marquee"
      aria-label={items.join(". ")}
      className={cn(
        "relative overflow-hidden border-y border-pcb-edge/30 py-3.5 group",
        className
      )}
    >
      {/* Edge fades */}
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 w-20 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, #08090c, rgba(8,9,12,0))",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-y-0 right-0 w-20 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to left, #08090c, rgba(8,9,12,0))",
        }}
      />

      <motion.div
        aria-hidden="true"
        className="flex gap-6 whitespace-nowrap will-change-transform"
        animate={{
          x: reverse ? ["0%", "50%"] : ["0%", "-50%"],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {loop.map((text, i) => {
          const color = accents[i % accents.length];
          return (
            <span
              key={i}
              className="font-display font-bold text-2xl md:text-3xl tracking-tight inline-flex items-center gap-6"
              style={{ color }}
            >
              {text}
              <span className="text-pcb-dim text-sm">{separator}</span>
            </span>
          );
        })}
      </motion.div>
    </div>
  );
}
