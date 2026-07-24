"use client";

import { useEffect, useRef, useState } from "react";

const HEX = "0123456789ABCDEF";

export function HexScramble({
  text,
  className,
  duration = 600,
  trigger = "hover",
}: {
  text: string;
  className?: string;
  duration?: number;
  trigger?: "hover" | "always-on-mount" | "once";
}) {
  const [display, setDisplay] = useState(text);
  const rafRef = useRef<number | null>(null);

  const scramble = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const start = performance.now();
    const length = text.length;

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const next = text
        .split("")
        .map((ch, i) => {
          if (ch === " " || ch === "·" || ch === ".") return ch;
          const threshold = i / length;
          if (progress > threshold) return ch;
          return HEX[Math.floor(Math.random() * HEX.length)];
        })
        .join("");
      setDisplay(next);
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    if (trigger === "once") scramble();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (trigger === "hover") {
    return (
      <span className={className} onMouseEnter={scramble}>
        {display}
      </span>
    );
  }
  return <span className={className}>{display}</span>;
}
