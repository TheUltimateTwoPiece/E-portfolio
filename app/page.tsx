"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { Hero } from "@/components/hero/Hero";
import { Marquee } from "@/components/bits/Marquee";
import { LiveBits } from "@/components/bits/LiveBits";
import { ScrollProgress } from "@/components/bits/ScrollProgress";
import { CornerBrackets, Fiducial } from "@/components/ui/CornerMarks";
import { StatusFeed } from "@/components/bits/StatusFeed";
import { CursorGlow } from "@/components/bits/CursorGlow";
import { fadeUp, stagger } from "@/lib/motion";
import {
  identity,
  roboticsWins,
  cca,
  otherAchievements,
  pageContent,
} from "@/lib/data";
import { isPersonalBuild } from "@/lib/utils";

// Hoist the home/CCA-specific data so it's easy to scan. The whole
// home composition is driven by these three objects plus identity.
const home = pageContent.home;


/**
 * Home composition.
 *
 * The Hero anchors the first viewport. Then the bio strip grounds it
 * with facts. Then the Showcase is a 5-card stack pointing at every
 * deep-dive page. Then the marquee / outro close it out.
 *
 * Vertical motion budget is shared so nothing competes with the
 * Hero centerpiece once the user has scrolled past it.
 */
export default function HomePage() {
  return (
    <PageShell>
      <CursorGlow />
      <ScrollProgress sections={home.scrollProgressSections} />

      <Hero />
      <BioStrip />
      <Showcase />
      <WinsMarquee />
      <PhotoStrip />
      <OutroCTA />
    </PageShell>
  );
}

function BioStrip() {
  const reduceMotion = useReducedMotion();
  return (
    <section
      id="bio"
      className="relative px-5 md:px-10 max-w-7xl mx-auto py-16 md:py-24"
    >
      <motion.div
        variants={stagger(0.08)}
        initial={reduceMotion ? false : "hidden"}
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="grid md:grid-cols-12 gap-8 md:gap-10"
      >
        <motion.div variants={fadeUp} className="md:col-span-5">
          <div className="mono-label flex items-center gap-3">
            <span className="h-px w-7 bg-gold/60" />
            <span>{home.bioEyebrow}</span>
          </div>
          <h2 className="mt-4 font-display display-tight text-pcb-ink text-3xl md:text-4xl leading-[1.05]">
            {home.bioTitle.prefix}{" "}
            <span className="text-gold">{home.bioTitle.accent}</span>{home.bioTitle.suffix}
            <br />
            {home.bioTitle.bodyLine1}
            <br />
            {home.bioTitle.bodyLine2}
          </h2>
        </motion.div>

        <motion.div variants={fadeUp} className="md:col-span-7">
          <div className="space-y-4">
            {identity.bio.map((paragraph, i) => (
              <p
                key={i}
                className="text-pcb-muted text-[15px] md:text-[17px] leading-[1.7] md:leading-[1.85]"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-6">
            <LiveBits />
          </div>

          {/* Status feed line, persistent here too */}
          <div className="mt-6">
            <StatusFeed intervalMs={4200} className="text-pcb-ink text-[13px]" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function Showcase() {
  const reduceMotion = useReducedMotion();
  return (
    <section
      id="showcase"
      className="relative px-5 md:px-10 max-w-7xl mx-auto py-16 md:py-24"
    >
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-end justify-between gap-6 mb-10 flex-wrap"
      >
        <div>
          <div className="mono-label flex items-center gap-3">
            <span className="h-px w-7 bg-gold/60" />
            <span>{home.showcaseEyebrow}</span>
          </div>
          <h2 className="mt-3 font-display display-tight text-pcb-ink text-3xl md:text-4xl">
            {home.showcaseTitle}<span className="text-gold">{home.showcaseTitleAccent}</span>
          </h2>
        </div>
        <p className="text-pcb-muted text-[14px] max-w-sm leading-relaxed">
          {home.showcaseSubtitle}
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {home.showcaseCards.map((c) => (
          <CaseCard
            key={c.href + c.mono}
            mono={c.mono}
            label={c.label}
            title={c.title}
            body={c.body}
            meta={c.meta}
            accent={c.accent}
            href={c.href}
            openLabel={home.caseCardOpenLabel}
          />
        ))}
      </div>
    </section>
  );
}

function CaseCard({
  mono,
  label,
  title,
  body,
  meta,
  accent,
  href,
  openLabel,
}: {
  mono: string;
  label: string;
  title: string;
  body: string;
  meta: string;
  accent: string;
  href: string;
  openLabel: string;
}) {
  return (
    <Link
      href={href}
      className="group relative bg-pcb-panel border border-pcb-edge/60 p-5 md:p-6 panel-edge hover:border-gold/50 transition-colors block overflow-hidden"
      style={
        { "--accent": accent } as Record<string, string>
      }
    >
      <CornerBrackets
        className="opacity-20 group-hover:opacity-80 transition-opacity"
        color={accent}
        size={9}
      />
      <Fiducial position="br" color={accent} size={9} />

      <div className="flex items-center justify-between mb-5">
        <span
          className="font-mono font-bold text-2xl leading-none"
          style={{ color: accent }}
        >
          {mono}
        </span>
        <ArrowUpRight
          size={18}
          className="text-pcb-dim group-hover:text-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
          strokeWidth={1.6}
        />
      </div>

      <div className="mono-label text-pcb-dim group-hover:text-[color:var(--accent)] transition-colors">
        // {label}
      </div>
      <h3 className="font-display font-bold text-pcb-ink text-xl mt-1 leading-tight">
        {title}
      </h3>
      <p className="mt-3 text-pcb-muted text-[13.5px] leading-relaxed">
        {body}
      </p>

      {/* Hover lift */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px translate-y-px group-hover:translate-y-0 transition-transform"
        style={{ background: accent }}
      />

      <div className="mt-6 pt-4 border-t border-pcb-edge/40 flex items-center justify-between">
        <span className="font-mono text-[11px] text-pcb-dim truncate max-w-[80%]">
          {meta}
        </span>
        <span
          className="font-mono text-[11px] font-semibold"
          style={{ color: accent }}
        >
          {openLabel}
        </span>
      </div>
    </Link>
  );
}

function WinsMarquee() {
  return (
    <section id="wins" className="py-12">
      <div className="max-w-7xl mx-auto px-5 md:px-10 mb-6 flex items-center justify-between">
        <div className="mono-label flex items-center gap-3">
          <span className="h-px w-7 bg-gold/60" />
          <span>{home.winsEyebrow}</span>
        </div>
        <Link
          href="/achievements"
          className="mono-label text-pcb-muted hover:text-gold transition-colors"
        >
          {home.winsLink}
        </Link>
      </div>
      <Marquee items={home.winsMarqueeItems} speed={36} />
      <Marquee
        items={home.winsSecondaryItems}
        speed={42}
        reverse
        separator="·"
        className="mt-2 border-b border-pcb-edge/30"
        accents={["#7a859a", "#7a859a", "#7a859a", "#7a859a", "#7a859a"]}
      />
    </section>
  );
}

function PhotoStrip() {
  // Only competition / event photos here. Personal-build arm photos live on
  // /achievements, where the captions make their context clear.
  const photos = roboticsWins
    .filter((w) => w.image && !isPersonalBuild(w.placement))
    .slice(0, 6);
  return (
    <section className="py-12 px-5 md:px-10 max-w-7xl mx-auto">
      <div className="mono-label flex items-center gap-3 mb-6">
        <span className="h-px w-7 bg-gold/60" />
        <span>{home.photoStripEyebrow}</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {photos.map((p) => (
          <Link
            key={p.id}
            href="/achievements"
            className="group relative aspect-square bg-pcb-panel border border-pcb-edge/50 overflow-hidden hover:border-gold/50 transition-colors"
          >
            {p.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={p.image}
                alt={p.event}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
              />
            )}
            <div className="absolute inset-x-0 bottom-0 px-2 py-1.5 bg-gradient-to-t from-pcb-base to-transparent">
              <span className="font-mono text-[10px] text-pcb-ink">
                {p.event}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function OutroCTA() {
  return (
    <section
      id="say-hi"
      className="relative px-5 md:px-10 max-w-7xl mx-auto py-20 md:py-28"
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative bg-pcb-panel border border-pcb-edge/60 p-8 md:p-12 panel-edge"
      >
        <CornerBrackets className="opacity-60" color="#eab308" size={14} />
        <Fiducial position="tr" color="#eab308" size={10} />
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <div className="mono-label text-pcb-dim">{home.outroEyebrow}</div>
            <h2 className="mt-3 font-display display-tight text-pcb-ink text-3xl md:text-4xl leading-[1.05]">
              {home.outroTitle.line1}
              <br />
              {home.outroTitle.line2Pre} <span className="text-gold">{home.outroTitle.accent}</span>{home.outroTitle.line2Post}
            </h2>
            <p className="mt-5 text-pcb-muted text-[15px] leading-relaxed max-w-md">
              {home.outroBody}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 bg-gold text-pcb-base px-6 py-3 font-mono font-semibold text-sm hover:bg-gold-bright transition-colors"
              >
                <CornerBrackets
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  color="#08090c"
                  size={6}
                />
                {home.outroPrimaryCta}
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 border border-pcb-edge px-5 py-3 font-mono text-sm text-pcb-muted hover:border-gold/60 hover:text-gold transition-colors"
              >
                {home.outroSecondaryCta}
              </Link>
            </div>
          </div>
          <div className="space-y-3">
            {home.outroDirectRows.map((r) => (
              <DirectRow
                key={r.label}
                label={r.label}
                value={r.value}
                href={"href" in r ? r.href : undefined}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function DirectRow({ label, value, href }: { label: string; value: string; href?: string }) {
  const inner = (
    <>
      <span className="mono-label">{label}</span>
      <span className="font-mono text-pcb-ink text-[13.5px] truncate">{value}</span>
      {href && (
        <span className="font-mono text-gold text-xs opacity-0 group-hover:opacity-100 transition-opacity">
          ↗
        </span>
      )}
    </>
  );
  const cls =
    "group flex items-center justify-between gap-4 bg-pcb-surface/40 border border-pcb-edge/40 px-4 py-3 hover:border-gold/50 transition-colors";
  if (href) {
    return (
      <a href={href} className={cls}>
        {inner}
      </a>
    );
  }
  return <div className={cls}>{inner}</div>;
}


