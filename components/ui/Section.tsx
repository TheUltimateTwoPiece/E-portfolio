"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/motion";
import { cn } from "@/lib/utils";

export interface SectionProps {
  id: string;
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  /** If true, render the right-margin vertical trace */
  withTrace?: boolean;
}

export function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  className,
  withTrace = true,
}: SectionProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id={id}
      className={cn(
        "relative py-24 md:py-32 px-6 md:px-10 max-w-7xl mx-auto",
        className
      )}
    >
      {/* Structural vertical trace on right margin . runs between sections */}
      {withTrace && (
        <div
          aria-hidden
          className="pointer-events-none absolute right-3 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-pcb-edge/40 to-transparent hidden lg:block"
        />
      )}

      <motion.div
        variants={stagger(0.08)}
        initial={reduceMotion ? false : "hidden"}
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid md:grid-cols-12 gap-8 md:gap-12"
      >
        <motion.div variants={fadeUp} className="md:col-span-4">
          <div className="mono-label flex items-center gap-3">
            <span className="h-px w-7 bg-gold/60 inline-block" />
            <span>{eyebrow}</span>
          </div>
          <h2 className="mt-4 font-display display-tight text-3xl md:text-4xl text-pcb-ink leading-[1.05]">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-4 text-pcb-muted leading-relaxed text-[15px] max-w-md">
              {subtitle}
            </p>
          )}
        </motion.div>

        <motion.div variants={fadeUp} className="md:col-span-8">
          {children}
        </motion.div>
      </motion.div>
    </section>
  );
}
