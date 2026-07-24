"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { CornerBrackets } from "@/components/ui/CornerMarks";
import { fadeUp, stagger } from "@/lib/motion";

export interface Win {
  id: string;
  event: string;
  placement: string;
  year: number | string;
  image?: string;
  blurb: string;
}

/**
 * Win gallery . used by /cca and /achievements.
 * A grid of competition photos with overlay on hover.
 * Click to open an immersive lightbox with keyboard nav.
 */
export function WinGallery({
  wins,
  cols = 3,
  withLightbox = true,
}: {
  wins: Win[];
  cols?: 2 | 3;
  withLightbox?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <motion.div
        variants={stagger(0.07)}
        initial={reduceMotion ? false : "hidden"}
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className={
          cols === 2
            ? "grid grid-cols-1 sm:grid-cols-2 gap-5"
            : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        }
      >
        {wins.map((w, i) => (
          <motion.figure
            key={w.id}
            variants={fadeUp}
            className="group relative bg-pcb-panel border border-pcb-edge/60 panel-edge overflow-hidden hover:border-gold/50 transition-colors"
          >
            <CornerBrackets
              className="opacity-30 group-hover:opacity-80 transition-opacity"
              color="#eab308"
              size={9}
            />
            <button
              type="button"
              onClick={() => withLightbox && setOpen(i)}
              className="block w-full text-left"
              aria-label={`Open ${w.event}`}
            >
              <div className="relative aspect-[4/3] bg-pcb-surface overflow-hidden">
                {w.image ? (
                  <Image
                    src={w.image}
                    alt={w.event}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    priority={i < 3}
                  />
                ) : (
                  <div className="absolute inset-0 grid place-items-center bg-pcb-surface">
                    <div className="text-center">
                      <div className="font-display font-bold text-2xl text-pcb-dim">
                        {w.event.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="mono-label mt-2">drop a photo here</div>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-pcb-base/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-2 left-2 mono-label bg-pcb-base/70 px-1.5 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  {String(w.year)}
                </div>
                <div className="absolute bottom-2 right-2 font-mono text-gold text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  {withLightbox ? "OPEN →" : "→"}
                </div>
              </div>
            </button>
            <figcaption className="p-3.5 border-t border-pcb-edge/60">
              <div className="flex items-baseline justify-between gap-3">
                <div>
                  <div className="font-display font-semibold text-pcb-ink text-base">
                    {w.event}
                  </div>
                  <div className="text-pcb-muted text-xs mt-0.5">{w.placement}</div>
                </div>
                <span className="mono-label text-pcb-dim">
                  #{String(i + 1).padStart(2, "0")}
                </span>
              </div>
              {w.blurb && (
                <p className="text-pcb-muted text-[13px] leading-relaxed mt-2">
                  {w.blurb}
                </p>
              )}
            </figcaption>
          </motion.figure>
        ))}
      </motion.div>

      {withLightbox && (
        <WinLightbox
          wins={wins}
          openIndex={open}
          onClose={() => setOpen(null)}
          onPrev={() => setOpen((i) => (i === null ? null : (i - 1 + wins.length) % wins.length))}
          onNext={() => setOpen((i) => (i === null ? null : (i + 1) % wins.length))}
        />
      )}
    </>
  );
}

function WinLightbox({
  wins,
  openIndex,
  onClose,
  onPrev,
  onNext,
}: {
  wins: Win[];
  openIndex: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  useEffectEscAndArrows(onClose, onPrev, onNext, openIndex);
  const item = openIndex !== null ? wins[openIndex] : null;
  if (!item) return null;

  return (
    <motion.div
      key={openIndex}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] bg-pcb-base/90 backdrop-blur-md grid place-items-center p-4 md:p-10"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={item?.event ?? ""}
    >
      <motion.div
        initial={{ scale: 0.96, y: 8 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.96, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-w-5xl w-full bg-pcb-panel border border-pcb-edge/70"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-3 border-b border-pcb-edge/60">
          <div className="mono-label">
            <span className="text-pcb-dim">// </span>
            {(openIndex ?? 0) + 1} / {wins.length}
          </div>
          <button
            aria-label="Close"
            onClick={onClose}
            className="font-mono text-pcb-muted hover:text-gold text-xl px-1"
          >
            ×
          </button>
        </div>

        <div className="relative bg-pcb-surface aspect-[4/3] flex items-center justify-center overflow-hidden">
          {item.image ? (
            <Image
              src={item.image}
              alt={item.event}
              fill
              sizes="(min-width: 1024px) 80vw, 100vw"
              className="object-contain"
            />
          ) : (
            <div className="text-pcb-dim mono-label">no image uploaded</div>
          )}
        </div>

        <div className="px-5 py-4 border-t border-pcb-edge/60 flex items-start justify-between gap-4">
          <div>
            <div className="font-display font-semibold text-pcb-ink text-base">
              {item.event}
            </div>
            <div className="text-pcb-muted text-sm mt-0.5">
              {item.placement} · {item.year}
            </div>
            {item.blurb && (
              <p className="text-pcb-muted text-sm mt-2 max-w-2xl">
                {item.blurb}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              aria-label="Previous"
              onClick={onPrev}
              className="h-9 px-3 border border-pcb-edge/60 hover:border-gold/60 hover:text-gold text-pcb-ink font-mono text-sm"
            >
              ← PREV
            </button>
            <button
              aria-label="Next"
              onClick={onNext}
              className="h-9 px-3 border border-pcb-edge/60 hover:border-gold/60 hover:text-gold text-pcb-ink font-mono text-sm"
            >
              NEXT →
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

import { useEffect } from "react";
function useEffectEscAndArrows(
  onClose: () => void,
  onPrev: () => void,
  onNext: () => void,
  openIndex: number | null
) {
  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        onPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        onNext();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex, onClose, onPrev, onNext]);
}
