"use client";

import { useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { CornerBrackets, Fiducial } from "@/components/ui/CornerMarks";
import { fadeUp } from "@/lib/motion";

export interface Project {
  id: string;
  name: string;
  tagline: string;
  status: string;
  summary: string;
  stack: string[];
  features: string[];
  metrics: { label: string; value: string }[];
  audience: string;
  highlights: string[];
}

const accentById: Record<string, { color: string; symbol: string }> = {
  "homework-board": { color: "#eab308", symbol: "01" },
  "meal-planning": { color: "#79c0ff", symbol: "02" },
  "robotic-arm": { color: "#f59e0b", symbol: "03" },
};

export function ProjectCard({
  project,
  index,
  withAudience = true,
}: {
  project: Project;
  index: number;
  withAudience?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const accent = accentById[project.id] ?? { color: "#eab308", symbol: String(index + 1) };

  return (
    <motion.article
      variants={fadeUp}
      className="relative bg-pcb-panel border border-pcb-edge/60 panel-edge group hover:border-gold/50 transition-colors"
    >
      <CornerBrackets
        className="opacity-30 group-hover:opacity-80 transition-opacity"
        color={accent.color}
        size={10}
      />

      <div className="p-6 md:p-8">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <span
              className="font-mono font-bold text-lg"
              style={{ color: accent.color }}
            >
              {accent.symbol}
            </span>
            <span className="h-px w-10 bg-pcb-edge/60" />
            <span className="mono-label">{project.id}</span>
          </div>
          <StatusPill status={project.status} accent={accent.color} />
        </div>

        <h3 className="font-display font-bold text-pcb-ink text-2xl md:text-3xl display-tight">
          {project.name}
        </h3>
        <p className="mt-2 text-pcb-muted text-[15px] leading-relaxed">
          {project.tagline}
        </p>

        {withAudience && project.audience && (
          <p className="mt-3 mono-label">
            <span className="text-pcb-dim">// built for </span>
            <span className="text-pcb-ink">{project.audience}</span>
          </p>
        )}

        <div className="mt-6 grid sm:grid-cols-3 gap-3">
          {project.metrics.map((m, i) => (
            <div
              key={i}
              className="border border-pcb-edge/60 bg-pcb-surface/40 px-3 py-2.5 relative"
            >
              <Fiducial
                position={i === 0 ? "tl" : i === 2 ? "br" : "tr"}
                color={accent.color}
                size={6}
              />
              <div className="mono-label">{m.label}</div>
              <div className="font-display font-semibold text-pcb-ink mt-1 text-sm leading-tight">
                {m.value}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-pcb-muted text-[15px] leading-relaxed">
          {project.summary}
        </p>

        {/* Highlights */}
        {project.highlights?.length > 0 && (
          <ul className="mt-5 space-y-1.5">
            {project.highlights.map((h, i) => (
              <li
                key={i}
                className="text-pcb-muted text-[13.5px] leading-relaxed flex items-start gap-2"
              >
                <span
                  className="font-mono text-[10px] mt-1.5"
                  style={{ color: accent.color }}
                >
                  ·
                </span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Stack */}
        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <span
              key={s}
              className="relative inline-flex items-center gap-1.5 px-2.5 py-1 border border-pcb-edge/60 text-pcb-muted font-mono text-[11px] hover:text-gold hover:border-gold/40 transition-colors"
            >
              <span className="h-1 w-1 rounded-full bg-current" />
              {s}
            </span>
          ))}
        </div>

        {/* Schematic miniature */}
        <ProjectSchematic id={project.id} color={accent.color} />

        <button
          type="button"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="mt-6 w-full inline-flex items-center justify-between gap-3 py-3 border-t border-pcb-edge/60 text-left group/btn"
        >
          <span className="font-mono text-[13px] text-pcb-ink font-semibold">
            {open ? ". Collapse details" : "+ Engineering details"}
          </span>
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.35 }}
            className="font-mono text-gold text-lg leading-none"
          >
            ⌄
          </motion.span>
        </button>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="features"
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-pcb-edge/40"
          >
            <div className="p-6 md:p-8 bg-pcb-surface/40">
              <div className="mono-label mb-3">// features · what it actually does</div>
              <ul className="space-y-2.5">
                {project.features.map((f, i) => (
                  <motion.li
                    key={i}
                    initial={reduceMotion ? false : { opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="flex items-start gap-3 text-pcb-ink text-[14px] leading-relaxed"
                  >
                    <span
                      className="font-mono text-[10px] mt-1.5 whitespace-nowrap"
                      style={{ color: accent.color }}
                    >
                      [{String(i + 1).padStart(2, "0")}]
                    </span>
                    <span>{f}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

function StatusPill({ status, accent }: { status: string; accent: string }) {
  const isLive = status.toLowerCase().includes("live");
  const label = isLive ? "LIVE" : "ACTIVE";
  return (
    <span className="inline-flex items-center gap-1.5 px-2 py-1 border border-pcb-edge/60 font-mono text-[10px] tracking-wider">
      <motion.span
        className="h-1.5 w-1.5 rounded-full"
        style={{ background: isLive ? "#eab308" : "#79c0ff" }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      />
      <span style={{ color: isLive ? "#eab308" : "#79c0ff" }}>{label}</span>
    </span>
  );
}

/**
 * Schematic miniature . different drawing per project so cards feel
 * hand-drafted rather than templated.
 */
function ProjectSchematic({ id, color }: { id: string; color: string }) {
  const stroke = color;
  if (id === "homework-board") {
    return (
      <svg
        viewBox="0 0 400 80"
        className="mt-6 w-full h-16"
        aria-hidden
      >
        {/* Corkboard: a row of cards with pins */}
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <g key={i}>
            <rect
              x={20 + i * 50}
              y="22"
              width="42"
              height="44"
              fill="none"
              stroke={stroke}
              strokeOpacity="0.4"
              strokeDasharray="2 2"
            />
            <line
              x1={20 + i * 50 + 21}
              y1="6"
              x2={20 + i * 50 + 21}
              y2="22"
              stroke={stroke}
              strokeOpacity="0.6"
            />
            <circle cx={20 + i * 50 + 21} cy="6" r="2.5" fill={stroke} />
            <line
              x1={20 + i * 50 + 6}
              y1="34"
              x2={20 + i * 50 + 36}
              y2="34"
              stroke={stroke}
              strokeOpacity="0.25"
            />
            <line
              x1={20 + i * 50 + 6}
              y1="44"
              x2={20 + i * 50 + 28}
              y2="44"
              stroke={stroke}
              strokeOpacity="0.25"
            />
            <line
              x1={20 + i * 50 + 6}
              y1="54"
              x2={20 + i * 50 + 32}
              y2="54"
              stroke={stroke}
              strokeOpacity="0.25"
            />
          </g>
        ))}
      </svg>
    );
  }
  if (id === "meal-planning") {
    return (
      <svg viewBox="0 0 400 80" className="mt-6 w-full h-16" aria-hidden>
        {/* Five-panel layout */}
        {[0, 1, 2, 3, 4].map((i) => {
          const colors = [stroke, "#79c0ff", "#f59e0b", "#a78bfa", "#5eead4"];
          return (
            <g key={i}>
              <rect
                x={30 + i * 70}
                y="14"
                width="60"
                height="52"
                fill="none"
                stroke={colors[i]}
                strokeOpacity="0.4"
              />
              <text
                x={30 + i * 70 + 30}
                y="44"
                textAnchor="middle"
                fill={colors[i]}
                fillOpacity="0.6"
                fontFamily="ui-monospace, monospace"
                fontSize="10"
              >
                {["INV", "GRC", "RCP", "PLN", "WST"][i]}
              </text>
              <circle
                cx={30 + i * 70 + 60}
                cy="14"
                r="2"
                fill={colors[i]}
              />
            </g>
          );
        })}
      </svg>
    );
  }
  if (id === "robotic-arm") {
    return (
      <svg viewBox="0 0 400 80" className="mt-6 w-full h-16" aria-hidden>
        {/* Robotic arm */}
        <rect x="40" y="60" width="80" height="14" fill="none" stroke={stroke} strokeOpacity="0.5" />
        <line x1="80" y1="60" x2="80" y2="38" stroke={stroke} strokeWidth="1.5" />
        <circle cx="80" cy="38" r="3" fill={stroke} />
        <line x1="80" y1="38" x2="160" y2="22" stroke={stroke} strokeWidth="1.5" />
        <circle cx="160" cy="22" r="3" fill={stroke} />
        <line x1="160" y1="22" x2="220" y2="40" stroke={stroke} strokeWidth="1.5" />
        <circle cx="220" cy="40" r="3" fill={stroke} />
        <path d="M 220 40 L 244 28 M 220 40 L 244 52" stroke={stroke} strokeWidth="1.4" fill="none" />
        <text x="60" y="74" fill={stroke} fillOpacity="0.6" fontFamily="ui-monospace, monospace" fontSize="8">SV1</text>
        <text x="100" y="74" fill={stroke} fillOpacity="0.6" fontFamily="ui-monospace, monospace" fontSize="8">SV2</text>
        <text x="160" y="74" fill={stroke} fillOpacity="0.6" fontFamily="ui-monospace, monospace" fontSize="8">SV3</text>
        {Array.from({ length: 16 }, (_, i) => (
          <circle
            key={i}
            cx={50 + i * 18}
            cy="70"
            r="1.6"
            fill={stroke}
            opacity="0.35"
          />
        ))}
      </svg>
    );
  }
  return null;
}
