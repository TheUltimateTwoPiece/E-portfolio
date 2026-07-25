"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CornerBrackets, Fiducial } from "@/components/ui/CornerMarks";
import { fadeUp, stagger } from "@/lib/motion";
import { cn } from "@/lib/utils";

export interface PageHeroProps {
  mono: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  chips?: Array<{ label: string; value: string }>;
  /** Pad bottom: false → tight, true → followed by lots of content */
  withTrace?: boolean;
}

export function PageHero({
  mono,
  title,
  subtitle,
  chips,
  withTrace = true,
}: PageHeroProps) {
  const reduceMotion = useReducedMotion();
  return (
    <section className="relative pt-32 md:pt-40 pb-16 md:pb-20 px-5 md:px-10 max-w-7xl mx-auto">
      {/* Background dot field */}
      <div aria-hidden className="absolute inset-0 bg-dot-grid pointer-events-none" />

      <motion.div
        variants={stagger(0.08)}
        initial={reduceMotion ? false : "hidden"}
        animate="show"
        className="relative"
      >
        <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
          <span className="mono-label">SECTION</span>
          <span className="font-mono text-sm text-gold font-semibold">
            {mono}
          </span>
          <span className="h-px w-12 bg-gold/50" />
          <Fiducial color="#eab308" size={8} />
        </motion.div>

        <h1 className="font-display display-tight text-pcb-ink text-[32px] sm:text-[48px] md:text-[68px] lg:text-[80px] font-bold leading-[1.0] sm:leading-[0.96] tracking-tight max-w-5xl">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-6 max-w-2xl text-pcb-muted text-base md:text-[17px] leading-relaxed">
            {subtitle}
          </p>
        )}

        {chips && chips.length > 0 && (
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {chips.map((c) => (
              <div
                key={c.label}
                className="border border-pcb-edge/50 bg-pcb-panel/40 px-3 py-2.5"
              >
                <div className="mono-label">{c.label}</div>
                <div className="font-display font-semibold text-pcb-ink text-sm mt-1 leading-tight">
                  {c.value}
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {withTrace && (
        <div
          aria-hidden
          className="absolute -bottom-12 right-6 hidden lg:block"
        >
          <ScrollHint />
        </div>
      )}
    </section>
  );
}

function ScrollHint() {
  return (
    <div className="flex items-center gap-3">
      <span className="mono-label">SCROLL</span>
      <motion.span
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        className="block h-6 w-px bg-gradient-to-b from-gold to-transparent"
      />
    </div>
  );
}

// Re-export so other files can use cn
export { cn };
