"use client";

import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Vertical scroll-progress rail with passive dots . appears only on the
 * home page. The dots start dim and brighten as you pass them.
 */
export function ScrollProgress({
  sections,
}: {
  sections: Array<{ id: string; label: string }>;
}) {
  const { scrollYProgress } = useScroll();
  const heightPct = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="fixed top-1/2 right-3 -translate-y-1/2 z-30 hidden lg:flex flex-col items-center gap-3 pointer-events-none">
      <div className="font-mono text-[10px] text-pcb-dim rotate-90 origin-center translate-y-12">
        PROGRESS
      </div>
      <div className="relative h-[200px] w-px bg-pcb-edge/40">
        <motion.div
          style={{ height: heightPct }}
          className="absolute top-0 left-0 w-px bg-gold/80 origin-top"
        />
      </div>
      <div className="flex flex-col items-center gap-2 mt-2">
        {sections.map((s, i) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="group pointer-events-auto flex items-center gap-2"
          >
            <span
              aria-hidden
              className="h-1.5 w-1.5 rounded-full bg-pcb-edge group-hover:bg-gold transition-colors"
            />
            <span className="font-mono text-[10px] text-pcb-dim opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap absolute right-4 bg-pcb-panel border border-pcb-edge/60 px-2 py-1">
              {s.label}
            </span>
            <span className="sr-only">{s.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
