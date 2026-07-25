"use client";

import { cn } from "@/lib/utils";

/**
 * Persistent PCB-silkscreen background. Mounted once by `PageShell` so it
 * sits behind every page without re-rendering across nav routes.
 *
 * Layers (back to front):
 *  L1 - fine dot grid                (.bg-dot-grid utility)
 *  L2 - orthogonal copper traces     (8 SVG paths, hand-curated, static)
 *  L3 - signal-flow on 2 traces       (animated stroke-dashoffset, hidden on mobile)
 *  L4 - via dots at intersections     (top + bottom of each via)
 *  L5 - component silkscreen labels   (U1, R12, C3, JP2 … monospace, sparse)
 *  L6 - corner fiducials              (4 corners, faint pulse)
 *
 * Mobile (≤ md): lower opacity, no animation, fewer labels.
 * prefers-reduced-motion: animation layer is `motion-safe` only.
 */
export interface PCBSchematicBgProps {
  /** Spare-noise int for sketches. `lifted` makes the bg more visible. */
  intensity?: "subtle" | "default" | "lifted";
  className?: string;
}

/** Copper trace — a 2D polyline path with right-angle bends, like a real PCB. */
const TRACE_PATHS: ReadonlyArray<string> = [
  "M-40 80 H260 V200 H580 V340 H1040",
  "M-40 320 H180 V160 H540 V260 H900",
  "M-40 480 H340 V560 H720 V420 H1040",
  "M120 -40 V160 H380 V80 H780 V520 V640",
  "M540 -40 V140 H880 V340 H1040",
  "M260 -40 V120 H440 V240 H700 V440 H940",
  "M820 -40 V200 H980 V400 V600",
  "M0 600 H220 V680 H560 V780 H1040",
];

/** Two traces get the gold signal-flow overlay. */
const FLOW_TRACE_PATHS: ReadonlyArray<{ d: string; delay: string }> = [
  { d: "M-40 240 H260 V340 H560 V440 H1040", delay: "-0s" },
  { d: "M80 -40 V160 H200 V280 H800 V400 V620", delay: "-3.5s" },
];

/** Hand-picked via junctions (copper pads with drills). */
const VIAS: ReadonlyArray<{ x: number; y: number }> = [
  { x: 260, y: 80 },
  { x: 580, y: 200 },
  { x: 180, y: 320 },
  { x: 540, y: 260 },
  { x: 340, y: 480 },
  { x: 720, y: 420 },
  { x: 380, y: 80 },
  { x: 780, y: 520 },
  { x: 880, y: 140 },
  { x: 440, y: 240 },
  { x: 700, y: 440 },
  { x: 940, y: 600 },
];

/** Silkscreen component reference designators (U1, R12 …). */
const SILK_LABELS: ReadonlyArray<{ x: number; y: number; label: string }> = [
  { x: 80, y: 50, label: "U1" },
  { x: 920, y: 70, label: "R12" },
  { x: 120, y: 240, label: "C3" },
  { x: 880, y: 210, label: "JP2" },
  { x: 60, y: 410, label: "TP5" },
  { x: 900, y: 380, label: "D1" },
  { x: 140, y: 540, label: "L4" },
  { x: 880, y: 540, label: "IC7" },
];

export function PCBSchematicBg({
  intensity = "default",
  className,
}: PCBSchematicBgProps) {
  const op =
    intensity === "subtle" ? "opacity-70" : intensity === "lifted" ? "opacity-100" : "opacity-85";

  return (
    <div
      aria-hidden
      className={cn(
        "fixed inset-0 -z-10 pointer-events-none overflow-hidden",
        op,
        className,
      )}
    >
      {/* L1 — fine dot grid (existing utility) */}
      <div className="absolute inset-0 bg-dot-grid" />

      {/* L2-L5 — SVG schematics */}
      <svg
        viewBox="0 0 1000 600"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          {/* Gold gradient for the animated signal flow */}
          <linearGradient id="pcb-flow" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#eab308" stopOpacity="0" />
            <stop offset="0.5" stopColor="#eab308" stopOpacity="1" />
            <stop offset="1" stopColor="#eab308" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* L2 — static copper traces */}
        <g stroke="#21262d" fill="none" strokeLinejoin="miter" strokeLinecap="square">
          {TRACE_PATHS.map((d, i) => (
            <path key={`t-${i}`} d={d} strokeWidth={i % 4 === 0 ? "1.4" : "1"} />
          ))}
        </g>

        {/* L3 — animated signal-flow on long traces (desktop only) */}
        <g className="hidden md:block motion-safe:animate-trace-flow">
          {FLOW_TRACE_PATHS.map(({ d, delay }, i) => (
            <path
              key={`f-${i}`}
              d={d}
              stroke="url(#pcb-flow)"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeDasharray="6 18"
              fill="none"
              style={{ animationDelay: delay }}
            />
          ))}
        </g>

        {/* L4 — via dots */}
        <g>
          {VIAS.map(({ x, y }, i) => (
            <g key={`v-${i}`}>
              <circle cx={x} cy={y} r="3.2" fill="#08090c" stroke="#30363d" strokeWidth="0.8" />
              <circle cx={x} cy={y} r="1.4" fill="#eab308" opacity="0.55" />
            </g>
          ))}
        </g>

        {/* L5 — silkscreen component labels (mobile: only 4) */}
        <g
          fill="#7a859a"
          fillOpacity="0.45"
          fontFamily="ui-monospace, monospace"
          fontSize="10"
        >
          {SILK_LABELS.map(({ x, y, label }, i) => (
            <text
              key={`s-${i}`}
              x={x}
              y={y}
              textAnchor="middle"
              className={cn(i >= 4 && "hidden md:inline")}
            >
              {label}
            </text>
          ))}
        </g>

        {/* Silkscreen outline around a few areas (looks like a real PCB keepout) */}
        <g stroke="#30363d" strokeOpacity="0.35" strokeDasharray="3 4" fill="none">
          <rect x="540" y="320" width="220" height="120" />
          <rect x="120" y="380" width="180" height="80" />
        </g>
      </svg>

      {/* L6 — corner fiducials (hidden on smallest viewport to keep edges clean) */}
      <CornerFiducial position="tl" />
      <CornerFiducial position="tr" />
      <CornerFiducial position="bl" />
      <CornerFiducial position="br" />

      {/* Top + bottom soft edge fade (so content edges feel clean) */}
      <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-pcb-base/60 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-pcb-base/60 to-transparent pointer-events-none" />
    </div>
  );
}

function CornerFiducial({
  position,
}: {
  position: "tl" | "tr" | "bl" | "br";
}) {
  const placements: Record<string, string> = {
    tl: "top-4 left-4",
    tr: "top-4 right-4",
    bl: "bottom-4 left-4",
    br: "bottom-4 right-4",
  };
  return (
    <span
      className={cn(
        "absolute hidden md:block motion-safe:animate-fiducial-pulse",
        placements[position],
      )}
    >
      <span className="block h-2.5 w-px bg-gold/60 absolute left-1/2 top-0 -translate-x-1/2" />
      <span className="block w-2.5 h-px bg-gold/60 absolute top-1/2 left-0 -translate-y-1/2" />
      <span className="block h-2 w-2 rounded-full bg-gold/40 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
    </span>
  );
}
