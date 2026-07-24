"use client";

import { cn } from "@/lib/utils";

export function Fiducial({
  className,
  position = "tl",
  size = 10,
  color = "#eab308",
}: {
  className?: string;
  position?: "tl" | "tr" | "bl" | "br";
  size?: number;
  color?: string;
}) {
  const positionClasses: Record<string, string> = {
    tl: "top-0 left-0",
    tr: "top-0 right-0",
    bl: "bottom-0 left-0",
    br: "bottom-0 right-0",
  };
  return (
    <span
      aria-hidden
      className={cn("absolute pointer-events-none", positionClasses[position], className)}
      style={{
        width: size,
        height: size,
        position: "absolute",
      }}
    >
      <span
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: "50%",
          height: 1,
          background: color,
          transform: "translateY(-50%)",
        }}
      />
      <span
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: "50%",
          width: 1,
          background: color,
          transform: "translateX(-50%)",
        }}
      />
    </span>
  );
}

export function CornerBrackets({
  className,
  color = "#eab308",
  size = 10,
  visible = ["tl", "tr", "bl", "br"],
  opacity = 0.6,
}: {
  className?: string;
  color?: string;
  size?: number;
  visible?: ("tl" | "tr" | "bl" | "br")[];
  opacity?: number;
}) {
  const draw = (corner: string) => {
    const map: Record<string, React.CSSProperties> = {
      tl: { top: 0, left: 0, borderTop: `1px solid ${color}`, borderLeft: `1px solid ${color}` },
      tr: { top: 0, right: 0, borderTop: `1px solid ${color}`, borderRight: `1px solid ${color}` },
      bl: { bottom: 0, left: 0, borderBottom: `1px solid ${color}`, borderLeft: `1px solid ${color}` },
      br: { bottom: 0, right: 0, borderBottom: `1px solid ${color}`, borderRight: `1px solid ${color}` },
    };
    return map[corner];
  };
  return (
    <span aria-hidden className={cn("absolute inset-0 pointer-events-none", className)}>
      {visible.map((c) => (
        <span
          key={c}
          style={{
            position: "absolute",
            width: size,
            height: size,
            opacity,
            ...draw(c),
          }}
        />
      ))}
    </span>
  );
}
