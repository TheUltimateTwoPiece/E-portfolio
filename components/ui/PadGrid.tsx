"use client";

import { motion } from "framer-motion";

/**
 * BGA-pin-grid background motif for the hero.
 *
 * Deterministic: lit pad positions are derived from a hash of (x,y)
 * so server and client render the same SVG tree (no hydration mismatch).
 * A few pads additionally pulse via motion animations on the client.
 */
export function PadGrid({
  cols = 20,
  rows = 12,
  className = "",
  litRatio = 0.06,
}: {
  cols?: number;
  rows?: number;
  className?: string;
  litRatio?: number;
}) {
  const cellW = 100 / cols;
  const cellH = 100 / rows;
  const total = cols * rows;

  const pads = Array.from({ length: total }, (_, i) => {
    const x = i % cols;
    const y = Math.floor(i / cols);
    // djb2-style hash → stable "lit" decision per cell
    let h = 5381;
    h = ((h << 5) + h + x * 73 + y * 131) >>> 0;
    h = ((h << 5) + h + x * 17 - y * 23) >>> 0;
    const lit = (h % 1000) / 1000 < litRatio;
    return { x, y, lit };
  });

  const litPads = pads.filter((p) => p.lit);

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <svg
        viewBox={`0 0 100 60`}
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
      >
        {pads.map((p, idx) => {
          const cx = p.x * cellW + cellW / 2;
          const cy = (p.y * cellH + cellH / 2) * 0.6; // viewBox is 100x60
          const r = Math.min(cellW, cellH * 0.6) * 0.18;
          return (
            <circle
              key={idx}
              cx={cx}
              cy={cy}
              r={r}
              fill={p.lit ? "#eab308" : "#21262d"}
              opacity={p.lit ? 0.55 : 0.6}
            />
          );
        })}
      </svg>

      {/* A handful of pulse pads . client-only animation */}
      {litPads.slice(0, 8).map((p, idx) => (
        <motion.span
          key={`pulse-${p.x}-${p.y}`}
          className="absolute"
          style={{
            left: `${p.x * cellW}%`,
            top: `${(p.y * cellH) * 0.6}%`,
            width: 6,
            height: 6,
          }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: [0, 1, 0.6, 0], scale: [0.6, 1, 1, 0.6] }}
          transition={{
            duration: 2.6,
            repeat: Infinity,
            delay: idx * 0.3,
            ease: "easeInOut",
          }}
        >
          <span className="absolute inset-0 rounded-full bg-gold" />
          <span className="absolute -inset-1 rounded-full bg-gold/30 blur-sm" />
        </motion.span>
      ))}
    </div>
  );
}
