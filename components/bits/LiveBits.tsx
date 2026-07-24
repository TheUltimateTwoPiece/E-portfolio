"use client";

import { motion, useReducedMotion } from "framer-motion";
import { liveBits } from "@/lib/data";
import { fadeUp, stagger } from "@/lib/motion";

/**
 * Compact chips showing school, CCA, current stack, what I'm rebuilding.
 * Home hero decoration that grounds the page in facts.
 */
export function LiveBits({ className = "" }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.ul
      variants={stagger(0.06)}
      initial={reduceMotion ? false : "hidden"}
      animate="show"
      className={`grid grid-cols-2 md:grid-cols-4 gap-2 ${className}`}
    >
      {liveBits.map((b) => (
        <motion.li
          key={b.label}
          variants={fadeUp}
          className="group relative bg-pcb-panel/60 border border-pcb-edge/50 px-3 py-2.5 hover:border-gold/40 transition-colors"
        >
          <div className="mono-label">{b.label}</div>
          <div className="font-display font-semibold text-pcb-ink text-[13px] mt-1 leading-snug">
            {b.value}
          </div>
          <span
            aria-hidden
            className="absolute top-2 right-2 h-1 w-1 bg-copper rounded-full group-hover:bg-gold transition-colors"
          />
        </motion.li>
      ))}
    </motion.ul>
  );
}
