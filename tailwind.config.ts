import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Premium PCB palette — ENIG gold accents on dark solder mask, not neon.
        pcb: {
          base: "#08090c",
          panel: "#0d1117",
          surface: "#11161f",
          raised: "#161c26",
          trace: "#21262d",
          edge: "#30363d",
          line: "#3d4757",
          ink: "#e6edf3",
          paper: "#f0f3f8",
          muted: "#aab3c0",
          dim: "#7a859a",
        },
        // ENIG gold — premium PCB finish
        gold: {
          DEFAULT: "#eab308",
          bright: "#fbbf24",
          dim: "#ca8a04",
          deep: "#854d0e",
          glow: "rgba(234, 179, 8, 0.35)",
        },
        // Copper — secondary trace color
        copper: {
          DEFAULT: "#d97706",
          bright: "#f59e0b",
          dim: "#b45309",
        },
        // Solder silver — fine details
        solder: {
          DEFAULT: "#c9d1d9",
          bright: "#e6edf3",
          dim: "#8b949e",
        },
        // Subtle code-blue — used sparingly
        code: {
          DEFAULT: "#79c0ff",
          dim: "#58a6ff",
          deep: "#1f6feb",
        },
      },
      fontFamily: {
        // Monospace used for display AND labels — distinctive engineering voice
        display: ["var(--font-mono)", "ui-monospace", "monospace"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        "panel":
          "0 1px 0 0 rgba(255,255,255,0.04) inset, 0 24px 48px -24px rgba(0,0,0,0.75)",
        "gold-glow":
          "0 0 0 1px rgba(234,179,8,0.35), 0 0 28px -6px rgba(234,179,8,0.45)",
        "solder-line": "0 1px 0 0 rgba(255,255,255,0.04) inset",
      },
      keyframes: {
        "pulse-glow": {
          "0%,100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        "cursor-blink": {
          "0%,50%": { opacity: "1" },
          "51%,100%": { opacity: "0" },
        },
        "wave-drift": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "pad-pulse": {
          "0%,100%": { opacity: "0", transform: "scale(0.6)" },
          "50%": { opacity: "1", transform: "scale(1)" },
        },
        "scanline": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        "trace-flow": {
          "0%": { strokeDashoffset: "0" },
          "100%": { strokeDashoffset: "-240" },
        },
        "fiducial-pulse": {
          "0%, 100%": { opacity: "0.45" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "pulse-glow": "pulse-glow 2.4s ease-in-out infinite",
        "cursor-blink": "cursor-blink 1s steps(2) infinite",
        "wave-drift": "wave-drift 30s linear infinite",
        "scanline": "scanline 8s linear infinite",
        "trace-flow": "trace-flow 7s linear infinite",
        "fiducial-pulse": "fiducial-pulse 4s ease-in-out infinite",
      },
      backgroundImage: {
        "dot-fine":
          "radial-gradient(circle at 1px 1px, rgba(234,179,8,0.07) 1px, transparent 0)",
      },
      backgroundSize: {
        "dot-24": "24px 24px",
      },
    },
  },
  plugins: [],
};
export default config;
