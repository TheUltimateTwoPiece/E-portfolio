"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { identity, heroScopeLabels, pageContent } from "@/lib/data";

const home = pageContent.home;
import { CornerBrackets, Fiducial } from "@/components/ui/CornerMarks";
import { StatusFeed } from "@/components/bits/StatusFeed";
import { fadeUp, stagger } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Hero centerpiece: a small oscilloscope-style readout.
 *
 * Pencil-thin trace, no neon glow. The cursor's position subtly modulates
 * the live signal so the panel breathes when you move around the page.
 * Runs off-screen via refs (no React re-render per frame).
 *
 * Labels are generic scope terminology, with a small panel around it that
 * shows real electronics vocabulary the user actually uses on the bench:
 * Arduino Uno · ESP32 · L298N · SG90 · HC-SR04 · TM1637. Repetition and
 * silkscreen style are deliberate.
 */
export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yName = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const opacityName = useTransform(scrollYProgress, [0, 0.7], [1, 0.55]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      <div className="absolute inset-0">
        {/* The persistent PCB background already lives behind this section
            via PageShell. Add a soft radial vignette so the hero text
            stays legible, and a horizontal scan band near the bottom. */}
      </div>

      <div aria-hidden className="absolute inset-0 pointer-events-none">
        {/* Subtle hero copy legibility wash — just enough to keep text clear
            without smothering the persistent PCB background. The PCB bg is
            dark on dark, but a 15–30 % wash on the hero centre keeps long
            titles from sitting on a busy trace. */}
        <div className="hidden md:block absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,rgba(8,9,12,0.15)_0%,rgba(8,9,12,0.45)_75%)]" />
        <div className="md:hidden absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(8,9,12,0.2)_0%,rgba(8,9,12,0.55)_75%)]" />

        <div className="absolute top-24 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        <div className="absolute bottom-24 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-10 w-full pt-32">
        <motion.div
          variants={stagger(0.12)}
          initial={reduceMotion ? false : "hidden"}
          animate="show"
          className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center"
        >
          <motion.div style={{ y: yName, opacity: opacityName }} className="lg:col-span-7">
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-5">
              <Fiducial color="#eab308" size={7} />
              <span className="mono-label">{identity.school} · {identity.yearLabel}</span>
              <span className="h-px w-10 bg-gold/40" />
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-display display-tight font-bold text-[34px] sm:text-[56px] md:text-[78px] lg:text-[96px] leading-[0.95] sm:leading-[0.92] tracking-tight text-pcb-ink"
            >
              <span className="block">
                <span className="text-pcb-dim text-[14px] sm:text-[16px] font-mono mr-2 align-top">
                  {"<"}
                </span>
                Hemanth
              </span>
              <span className="block text-gold">
                Kakarla
                <span className="text-solder animate-cursor-blink">_</span>
              </span>
              <span className="block text-pcb-muted text-[15px] sm:text-[20px] md:text-[24px] font-display font-normal mt-3 sm:mt-4 break-words">
                /&gt; {identity.role.toLowerCase()}
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-xl text-pcb-muted text-[15px] md:text-base leading-relaxed"
            >
              {identity.oneLine}
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-3 mono-label text-pcb-dim flex items-center gap-2 flex-wrap"
            >
              <span>// started building at age</span>
              <span className="text-gold">{identity.startedAge}</span>
              <span>·</span>
              <span>{identity.startedAt}</span>
              <span>·</span>
              <span>{identity.startedWhere}</span>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-5">
              <StatusFeed />
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-3"
            >
              <Link
                href="/projects"
                className="group relative inline-flex items-center gap-3 bg-gold text-pcb-base px-6 py-3 font-mono font-semibold text-sm hover:bg-gold-bright transition-colors"
              >
                <CornerBrackets
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  color="#08090c"
                  size={6}
                />
                <span>{home.heroCtas.seeProjects}</span>
                <span className="font-mono">→</span>
              </Link>
              <Link
                href="/contact"
                className="group relative inline-flex items-center gap-3 border border-pcb-edge hover:border-gold/80 text-pcb-ink px-6 py-3 font-mono font-semibold text-sm transition-colors"
              >
                <span>{home.heroCtas.sayHi}</span>
                <span className="font-mono text-gold group-hover:translate-x-1 transition-transform">
                  ↗
                </span>
              </Link>
              <Link
                href="/cca"
                className="ml-0 sm:ml-2 inline-flex items-center gap-2 font-mono text-[12px] text-pcb-muted hover:text-gold transition-colors"
              >
                <span className="mono-label">{home.heroCtas.orReadAbout}</span>
                <span>{home.heroCtas.ccaLink}</span>
                <span className="text-gold">→</span>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div variants={fadeUp} className="lg:col-span-5">
            <Oscilloscope />
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="mono-label">scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="block h-6 w-px bg-gradient-to-b from-gold to-transparent"
        />
      </motion.div>
    </section>
  );
}

/**
 * The scope panel. Routes an interactive waveform and labels it with
 * real electronics vocabulary. Two labelled traces, a moving scan cursor,
 * and the kind of legend you'd see on a cheap bench oscilloscope.
 */
function Oscilloscope() {
  const pathARef = useRef<SVGPathElement | null>(null);
  const pathBRef = useRef<SVGPathElement | null>(null);
  const cursorRef = useRef<SVGLineElement | null>(null);
  const pointer = useRef({ x: 0.5, y: 0.5 });
  const start = useRef<number>(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const onMove = (e: MouseEvent) => {
      const el = pathARef.current?.ownerSVGElement;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      pointer.current = {
        x: clamp01((e.clientX - rect.left) / rect.width),
        y: clamp01((e.clientY - rect.top) / rect.height),
      };
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion) return;
    let raf = 0;
    start.current = performance.now();
    const loop = (now: number) => {
      const t = (now - start.current) / 1000;
      drawTrace(pathARef.current, pointer.current.x, pointer.current.y, t);
      drawTrace(pathBRef.current, 1 - pointer.current.x, 1 - pointer.current.y, t);
      if (cursorRef.current) {
        const x = ((t * 30) % 1000);
        cursorRef.current.setAttribute("x1", String(x));
        cursorRef.current.setAttribute("x2", String(x));
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reduceMotion]);

  return (
    <div
      className="relative w-full max-w-3xl mx-auto group"
      aria-hidden
    >
      <svg
        viewBox="0 0 1000 220"
        className="w-full h-auto"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="grad-wave" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#eab308" stopOpacity="0" />
            <stop offset="0.2" stopColor="#eab308" stopOpacity="1" />
            <stop offset="0.8" stopColor="#eab308" stopOpacity="1" />
            <stop offset="1" stopColor="#eab308" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Grid baseline */}
        <line x1="0" y1="110" x2="1000" y2="110" stroke="#21262d" strokeWidth="1" />
        {/* Tick marks */}
        {Array.from({ length: 21 }, (_, i) => (
          <line
            key={i}
            x1={i * 50}
            y1="106"
            x2={i * 50}
            y2="114"
            stroke="#21262d"
            strokeWidth="1"
          />
        ))}

        {/* Wave traces */}
        <path
          ref={pathARef}
          fill="none"
          stroke="url(#grad-wave)"
          strokeWidth="1.6"
          strokeLinecap="round"
          d=""
        />
        <path
          ref={pathBRef}
          fill="none"
          stroke="#eab308"
          strokeOpacity="0.18"
          strokeWidth="1"
          strokeLinecap="round"
          d=""
        />
        {/* Sweeping scan cursor */}
        <line
          ref={cursorRef}
          y1="20"
          y2="200"
          stroke="#eab308"
          strokeWidth="0.6"
          strokeOpacity="0.5"
          x1="0"
          x2="0"
        />
      </svg>

      {/* Scope-style labels. No "CH1 LIVE" — generic FREQ / AMP / etc. All editable in `heroScopeLabels` in lib/data.ts. */}
      <div className="absolute top-2 left-2 mono-label select-none">
        {heroScopeLabels.topLeft}
      </div>
      <div className="absolute top-2 right-2 mono-label select-none flex items-center gap-2">
        <span className={cn("h-1.5 w-1.5 bg-gold inline-block animate-pulse-glow")} />
        {heroScopeLabels.topRight}
      </div>
      <div className="absolute bottom-2 left-2 mono-label select-none">{heroScopeLabels.bottomLeft}</div>
      <div className="absolute bottom-2 right-2 mono-label select-none">{heroScopeLabels.bottomRight}</div>
    </div>
  );
}

function clamp01(v: number) {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}

function drawTrace(el: SVGPathElement | null, px: number, py: number, t: number) {
  if (!el) return;
  const w = 1000;
  const h = 220;
  const base = h / 2;
  const ampA = 28 + py * 60;
  const ampB = 16 + (1 - py) * 40;
  const phaseB = px * Math.PI * 2 + t * 0.6;
  const segs = 120;
  let d = "";
  for (let i = 0; i <= segs; i++) {
    const u = i / segs;
    const x = u * w;
    const y =
      base +
      Math.sin(u * Math.PI * 6 + phaseB) * ampA * 0.4 +
      Math.sin(u * Math.PI * 14 + phaseB * 0.5) * ampB * 0.25 +
      Math.cos(u * Math.PI * 22) * 6;
    d += (i === 0 ? "M" : "L") + x.toFixed(2) + " " + y.toFixed(2) + " ";
  }
  el.setAttribute("d", d.trim());
}
