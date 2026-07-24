"use client";

import { motion, useReducedMotion } from "framer-motion";
import { identity, buildStack } from "@/lib/data";
import { footerYear } from "@/lib/utils";

export function Footer() {
  const reduceMotion = useReducedMotion();

  return (
    <footer className="relative border-t border-pcb-edge/40 px-6 md:px-10 py-12 mt-16">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-3 gap-8"
        >
          <div>
            <div className="font-display font-bold text-pcb-ink text-2xl display-tight">
              {identity.firstName}
              <span className="text-copper">{" "}</span>
              <span className="font-display font-bold text-copper text-2xl display-tight">
                {identity.lastName}
              </span>
              <span className="text-gold animate-cursor-blink">_</span>
            </div>
            <p className="mt-2 text-pcb-muted text-sm">
              {identity.role}
            </p>
          </div>

          <div>
            <div className="mono-label mb-3">// build</div>
            <ul className="text-pcb-muted text-sm space-y-1.5 font-mono">
              {buildStack.map((line) => (
                <li key={line}>{line}</li>
              ))}
              <li className="text-pcb-dim text-xs mt-3" suppressHydrationWarning>
                Built {footerYear} · v1.0
              </li>
            </ul>
          </div>

          <div>
            <div className="mono-label mb-3">// elsewhere</div>
            <ul className="text-pcb-muted text-sm space-y-1.5 font-mono">
              <li>
                <a
                  href={`mailto:${identity.email}`}
                  className="hover:text-gold transition-colors"
                >
                  {identity.email}
                </a>
              </li>
              {identity.github ? (
                <li>
                  <a
                    href={identity.github}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="hover:text-gold transition-colors"
                  >
                    GitHub ↗
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
        </motion.div>

        {/* Bottom trace */}
        <div className="mt-10 flex items-center gap-3">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
          <span className="mono-label">
            <span className="text-pcb-dim">// </span>
            end · transmission
          </span>
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        </div>
      </div>
    </footer>
  );
}
