"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * Vertical PCB-style trace line for between sections.
 * Scrubs its draw-on length to scroll progress, so the trace "etches"
 * itself as you scroll past . much more interesting than a static divider.
 */
export function VerticalTrace({ height = 160 }: { height?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const dashOffset = useTransform(scrollYProgress, [0, 0.6], [200, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.85, 1], [0, 0.6, 0.6, 0]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="relative mx-auto my-2"
      style={{ width: 6, height }}
    >
      <motion.svg
        viewBox="0 0 6 200"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
        style={{ opacity }}
      >
        <motion.path
          d="M 3 0 L 3 60 L 1 60 L 1 100 L 5 100 L 5 150 L 3 150 L 3 200"
          fill="none"
          stroke="#eab308"
          strokeWidth="1.2"
          strokeLinecap="square"
          strokeDasharray="200"
          style={{ strokeDashoffset: dashOffset }}
        />
        {/* Solder pads at the joints */}
        <circle cx="3" cy="0" r="2.5" fill="#eab308" />
        <circle cx="1" cy="60" r="2" fill="#eab308" />
        <circle cx="5" cy="100" r="2" fill="#eab308" />
        <circle cx="3" cy="200" r="2.5" fill="#eab308" />
      </motion.svg>
    </div>
  );
}
