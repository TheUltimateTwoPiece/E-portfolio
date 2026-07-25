"use client";

import { cn } from "@/lib/utils";

/**
 * Persistent PCB-silkscreen background. Mounted once by `PageShell` so it
 * sits behind every page without re-rendering across nav routes.
 *
 * Layers (back to front):
 *  L1 - fine dot grid                       (.bg-dot-grid utility)
 *  L2 - orthogonal copper traces (bright)   (8 SVG paths, hand-curated, static)
 *  L3 - copper accent traces                (2 SVG paths, slightly thicker & warmer)
 *  L4 - signal-flow on 2 traces             (animated stroke-dashoffset)
 *  L5 - via dots                            (outer ring + bright gold inner pip)
 *  L6 - chip + keeout silkscreen outlines   (small rects representing SOIC/QFP pads)
 *  L7 - silkscreen component labels         (U1, R12 … monospace, all 8 visible)
 *  L8 - corner fiducials                     (4 corners, visible everywhere)
 *  L9 - top + bottom soft edge fade         (low-opacity to keep edges clean)
 *
 * prefers-reduced-motion: pulse + flow animations drop; everything else still reads.
 */
export interface PCBSchematicBgProps {
  intensity?: "subtle" | "default" | "lifted";
  className?: string;
}

/** Sulphate-copper primary traces - hair-line hairlines on the dark substrate. */
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

/** Two traces get a thicker copper accent for colour variety. */
const COPPER_TRACES: ReadonlyArray<string> = [
  "M-40 220 H160 V280 H420 V360 H1040",
  "M880 -40 V120 H660 V260 H440 V380",
];

/** Two long traces get the gold signal flow overlay. */
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

/** Silkscreen component reference designators (U1, R12 ...). */
const SILK_LABELS: ReadonlyArray<{ x: number; y: string | number; label: string }> = [
  { x: 80, y: 50, label: "U1" },
  { x: 920, y: 70, label: "R12" },
  { x: 120, y: 240, label: "C3" },
  { x: 880, y: 210, label: "JP2" },
  { x: 60, y: 410, label: "TP5" },
  { x: 900, y: 380, label: "D1" },
  { x: 140, y: 540, label: "L4" },
  { x: 880, y: 540, label: "IC7" },
];

/** Small chip outline rectangles . looking like QFP/SOIC footprints. */
const CHIP_OUTLINES: ReadonlyArray<{ x: number; y: number; w: number; h: number }> = [
  { x: 700, y: 30, w: 90, h: 50 },   // top-right SOIC
  { x: 90, y: 280, w: 70, h: 50 },    // mid-left chip
  { x: 580, y: 460, w: 110, h: 60 },  // bottom MCU
];

export function PCBSchematicBg({
  intensity = "default",
  className,
}: PCBSchematicBgProps) {
  // Drop the global opacity wrapper - the bg is calibrated to read at full opacity
  // and intensity handles come from local colour/opacity instead of layer-mul.
  const labelOpacity =
    intensity === "subtle" ? 0.5 : intensity === "lifted" ? 0.85 : 0.7;

  return (
    <div
      aria-hidden
      className={cn(
        "fixed inset-0 -z-10 pointer-events-none overflow-hidden",
        className,
      )}
    >
      {/* L1 - fine dot grid */}
      <div className="absolute inset-0 bg-dot-grid" />

      {/* L2-L7 - SVG schematic */}
      <svg
        viewBox="0 0 1000 600"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          {/* Gold horizontal gradient for the animated signal flow */}
          <linearGradient id="pcb-flow" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#eab308" stopOpacity="0" />
            <stop offset="0.5" stopColor="#eab308" stopOpacity="1" />
            <stop offset="1" stopColor="#eab308" stopOpacity="0" />
          </linearGradient>
          {/* Subtle radial vignette behind the bg so the centre area is the brightest */}
          <radialGradient id="pcb-vignette" cx="50%" cy="50%" r="70%">
            <stop offset="0" stopColor="#000" stopOpacity="0.55" />
            <stop offset="1" stopColor="#000" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* L2 - primary copper traces (bright hair-lines) */}
        <g
          stroke="#3d4757"
          fill="none"
          strokeLinejoin="miter"
          strokeLinecap="square"
        >
          {TRACE_PATHS.map((d, i) => (
            <path key={`t-${i}`} d={d} strokeWidth={i % 4 === 0 ? "1.6" : "1.2"} />
          ))}
        </g>

        {/* L3 - copper accent traces (warmer, slightly thicker) */}
        <g
          stroke="#d97706"
          strokeOpacity="0.65"
          fill="none"
          strokeLinejoin="miter"
          strokeLinecap="square"
        >
          {COPPER_TRACES.map((d, i) => (
            <path key={`c-${i}`} d={d} strokeWidth="1.8" />
          ))}
        </g>

        {/* L4 - animated signal-flow (gold dashed overlay, desktop only) */}
        <g className="hidden md:block motion-safe:animate-trace-flow">
          {FLOW_TRACE_PATHS.map(({ d, delay }, i) => (
            <path
              key={`f-${i}`}
              d={d}
              stroke="url(#pcb-flow)"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeDasharray="6 18"
              fill="none"
              style={{ animationDelay: delay }}
            />
          ))}
        </g>

        {/* L5 - via dots (brighter gold pip + ring on dark substrate) */}
        <g>
          {VIAS.map(({ x, y }, i) => (
            <g key={`v-${i}`}>
              <circle cx={x} cy={y} r="4" fill="#08090c" stroke="#3d4757" strokeWidth="1.2" />
              <circle cx={x} cy={y} r="2" fill="#eab308" opacity="0.95" />
            </g>
          ))}
        </g>

        {/* L6 - chip outlines (silkscreen rectangles for QFP/SOIC footprints) */}
        <g
          stroke="#3d4757"
          strokeOpacity={intensity === "subtle" ? 0.35 : 0.55}
          strokeWidth="1"
          strokeDasharray="4 3"
          fill="none"
        >
          {CHIP_OUTLINES.map(({ x, y, w, h }, i) => (
            <rect key={`co-${i}`} x={x} y={y} width={w} height={h} />
          ))}
        </g>
        {/* Faint pad dots along the chip outlines to look like IC pin pads */}
        <g fill="#eab308" opacity="0.55">
          {CHIP_OUTLINES.flatMap(({ x, y, w, h }, i) => {
            const pinCount = i === 2 ? 6 : 4;
            const pins = [];
            const stepX = w / (pinCount + 1);
            for (let p = 1; p <= pinCount; p++) {
              pins.push(
                <circle
                  key={`co-${i}-p-${p}`}
                  cx={x + stepX * p}
                  cy={y + h + 4}
                  r={1.6}
                />,
              );
            }
            return pins;
          })}
        </g>

        {/* L7 - silkscreen component labels - all 8 visible always */}
        <g
          fill="#cbd5e1"
          fillOpacity={labelOpacity}
          fontFamily="ui-monospace, monospace"
          fontSize="11"
          letterSpacing="0.18em"
        >
          {SILK_LABELS.map(({ x, y, label }, i) => (
            <text key={`s-${i}`} x={x} y={y} textAnchor="middle">
              {label}
            </text>
          ))}
        </g>

        {/* Subtle radial vignette so the bg centre is the brightest area */}
        <rect width="1000" height="600" fill="url(#pcb-vignette)" />
      </svg>

      {/* L8 - corner fiducials (always visible: small dot on mobile, full cross on desktop) */}
      <CornerFiducial position="tl" />
      <CornerFiducial position="tr" />
      <CornerFiducial position="bl" />
      <CornerFiducial position="br" />

      {/* L9 - weak edge fade so content never crashes into the bg edge */}
      <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-pcb-base/35 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-pcb-base/35 to-transparent pointer-events-none" />
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
        "absolute motion-safe:animate-fiducial-pulse",
        placements[position],
      )}
    >
      {/* Full cross on desktop (≥md); small gold dot only on mobile */}
      <span className="hidden md:block">
        <span className="absolute left-1/2 -translate-x-1/2 top-0 block h-3 w-px bg-gold/80" />
        <span className="absolute top-1/2 -translate-y-1/2 left-0 block w-3 h-px bg-gold/80" />
      </span>
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 block h-2 md:h-2.5 w-2 md:w-2.5 rounded-full bg-gold" />
    </span>
  );
}
