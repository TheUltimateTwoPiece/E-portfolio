"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * A small mini piano for the hobbies page.
 * Plays a note via Web Audio on hover or click. Notes are pentatonic,
 * so there are no wrong sounds. If Web Audio is unavailable or the
 * user prefers reduced motion, this still renders keys visually but
 * skips audio output.
 */

// Middle register pentatonic. Two octaves is plenty for "I dabble" piano.
const NOTES = [
  { key: "C4", freq: 261.63, accent: false },
  { key: "D4", freq: 293.66, accent: false },
  { key: "E4", freq: 329.63, accent: false },
  { key: "G4", freq: 392.0, accent: true },
  { key: "A4", freq: 440.0, accent: false },
  { key: "C5", freq: 523.25, accent: false },
  { key: "D5", freq: 587.33, accent: false },
  { key: "E5", freq: 659.25, accent: false },
  { key: "G5", freq: 783.99, accent: true },
];

export function PianoKeys({ className = "" }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  const ctxRef = useRef<AudioContext | null>(null);
  const [active, setActive] = useState<string | null>(null);
  const lastPlayedRef = useRef<Record<string, number>>({});

  const ensureContext = () => {
    if (!ctxRef.current && typeof window !== "undefined") {
      const AC =
        (window as unknown as { AudioContext: typeof AudioContext })
          .AudioContext ||
        (
          window as unknown as {
            webkitAudioContext: typeof AudioContext;
          }
        ).webkitAudioContext;
      if (AC) ctxRef.current = new AC();
    }
    return ctxRef.current;
  };

  const play = (freq: number, keyName: string) => {
    if (reduceMotion) return;
    const now = performance.now();
    // Light de-bouncing so a fast hover doesn't re-trigger on the same key
    if ((now - (lastPlayedRef.current[keyName] ?? 0)) < 60) return;
    lastPlayedRef.current[keyName] = now;

    const ctx = ensureContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.value = freq;
    osc.connect(gain);
    gain.connect(ctx.destination);

    const t = ctx.currentTime;
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.16, t + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.6);

    osc.start(t);
    osc.stop(t + 0.65);
    setActive(keyName);
    window.setTimeout(() => setActive((a) => (a === keyName ? null : a)), 220);
  };

  useEffect(() => {
    return () => {
      try {
        ctxRef.current?.close();
      } catch {}
    };
  }, []);

  return (
    <div className={`relative ${className}`}>
      <div className="grid grid-cols-9 gap-[2px] sm:gap-1 select-none">
        {NOTES.map((n) => {
          const isActive = active === n.key;
          return (
            <button
              key={n.key}
              type="button"
              onClick={() => play(n.freq, n.key)}
              onMouseEnter={() => play(n.freq, n.key)}
              aria-label={`Play ${n.key}`}
              className={cn(
                "group/key relative h-20 sm:h-24",
                "bg-pcb-paper text-pcb-base border border-pcb-edge/70",
                "flex flex-col items-end justify-end pb-2 pr-2",
                "transition-[transform,background-color,box-shadow] duration-100",
                "hover:bg-pcb-bright active:bg-gold",
                isActive && "bg-gold"
              )}
              style={{
                transform: isActive ? "translateY(2px)" : undefined,
                boxShadow: isActive
                  ? "0 0 22px rgba(234,179,8,0.55)"
                  : undefined,
              }}
            >
              <span className="font-mono text-[10px] text-pcb-edge group-hover/key:text-pcb-base/80">
                {n.key}
              </span>
            </button>
          );
        })}
      </div>
      <div className="mt-3 mono-label flex items-center justify-between">
        <span>// pentatonic . drag your cursor over the keys</span>
        <span className="text-pcb-dim">WEB AUDIO</span>
      </div>
    </div>
  );
}
