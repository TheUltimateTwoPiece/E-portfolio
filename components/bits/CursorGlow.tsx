"use client";

import { useEffect, useRef } from "react";

/**
 * Soft gold cursor glow that follows the mouse with a damping factor.
 * Sits behind everything (z-0) and dims on touch / coarse pointers.
 */
export function CursorGlow() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const loop = () => {
      current.x += (target.x - current.x) * 0.12;
      current.y += (target.y - current.y) * 0.12;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-0 hidden lg:block"
        style={{
          width: 280,
          height: 280,
          marginLeft: -140,
          marginTop: -140,
          background:
            "radial-gradient(circle, rgba(234,179,8,0.10) 0%, rgba(234,179,8,0) 65%)",
        }}
      />
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[60] hidden lg:block"
        style={{
          width: 6,
          height: 6,
          marginLeft: -3,
          marginTop: -3,
          background: "#eab308",
          boxShadow: "0 0 12px rgba(234,179,8,0.6)",
        }}
      />
    </>
  );
}
