"use client";

import { useEffect, useRef, useState } from "react";

/**
 * One pool lane, animated. A swimmer figure loops back and forth across
 * a stylized pool lane, with a live "lap" counter incrementing each time
 * it touches a wall. Pauses on hover.
 */
export function SwimLap({
  laneWidth = 360,
  className = "",
}: {
  laneWidth?: number;
  className?: string;
}) {
  const [laps, setLaps] = useState(0);
  const [hovered, setHovered] = useState(false);
  const tickerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (hovered) return;
    const t = setInterval(() => setLaps((l) => l + 1), 2800);
    return () => clearInterval(t);
  }, [hovered]);

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Pool */}
      <div
        className="relative h-24 rounded-sm overflow-hidden border border-pcb-edge/70"
        style={{
          background:
            "linear-gradient(180deg, #0d1117 0%, #11161f 50%, #0d1117 100%)",
        }}
      >
        {/* Lane lines */}
        <div
          aria-hidden
          className="absolute inset-y-0 left-0 right-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(234,179,8,0.18) 0 2px, transparent 2px 24px)",
          }}
        />
        {/* Ripple shimmer */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)",
            animation: "wave-drift 6s linear infinite",
          }}
        />

        {/* Swimmer */}
        <div
          ref={tickerRef}
          aria-hidden
          className="absolute top-1/2 -translate-y-1/2"
          style={{
            animation: hovered
              ? "none"
              : "swim 5.6s ease-in-out infinite",
          }}
          key={hovered ? "paused" : "run"}
        >
          <Swimmer />
        </div>

        <style>{`
          @keyframes swim {
            0% { left: 0%; transform: translate(-6px, -50%); }
            49% { left: 100%; transform: translate(-100%, -50%) scaleX(-1); }
            50% { left: 100%; transform: translate(-94%, -50%) scaleX(-1); }
            99% { left: 0%; transform: translate(0%, -50%) scaleX(-1); }
            100% { left: 0%; transform: translate(-6px, -50%); }
          }
        `}</style>
      </div>

      {/* Stat bar */}
      <div className="mt-3 grid grid-cols-3 gap-2">
        <Stat label="LAPS" value={String(laps).padStart(3, "0")} />
        <Stat label="SPLIT" value="≈ 32s" />
        <Stat label="STROKES" value="free" />
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-pcb-edge/50 bg-pcb-panel/60 px-3 py-2">
      <div className="mono-label">{label}</div>
      <div className="font-display font-semibold text-pcb-ink text-sm mt-0.5">
        {value}
      </div>
    </div>
  );
}

function Swimmer() {
  return (
    <svg width="44" height="20" viewBox="0 0 44 20" aria-hidden>
      {/* Body */}
      <ellipse cx="14" cy="10" rx="8" ry="3" fill="#eab308" />
      {/* Arm reach */}
      <line
        x1="20"
        y1="10"
        x2="34"
        y2="8"
        stroke="#eab308"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <line
        x1="20"
        y1="10"
        x2="34"
        y2="12"
        stroke="#eab308"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      {/* Splash */}
      <circle cx="36" cy="11" r="1" fill="#eab308" opacity="0.6" />
      <circle cx="39" cy="9" r="0.7" fill="#eab308" opacity="0.5" />
      <circle cx="42" cy="11" r="0.5" fill="#eab308" opacity="0.4" />
    </svg>
  );
}
