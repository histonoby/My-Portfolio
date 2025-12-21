import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ダーク・サイバーパンク風カラーパレット
        cyber: {
          dark: "#0a0a0f",
          darker: "#050508",
          navy: "#0d1117",
          accent: "#00ffaa",
          blue: "#00d4ff",
          purple: "#a855f7",
          pink: "#ff0080",
        },
      },
      fontFamily: {
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
        display: ["Orbitron", "sans-serif"],
      },
      animation: {
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "typing": "typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite",
        "float": "float 6s ease-in-out infinite",
        "glitch": "glitch 1s linear infinite",
        "scan-line": "scan-line 8s linear infinite",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": {
            boxShadow: "0 0 20px rgba(0, 255, 170, 0.3)",
          },
          "50%": {
            boxShadow: "0 0 40px rgba(0, 255, 170, 0.6)",
          },
        },
        "typing": {
          from: { width: "0" },
          to: { width: "100%" },
        },
        "blink-caret": {
          "from, to": { borderColor: "transparent" },
          "50%": { borderColor: "#00ffaa" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "glitch": {
          "0%": { textShadow: "2px 0 #ff0080, -2px 0 #00ffaa" },
          "25%": { textShadow: "-2px 0 #ff0080, 2px 0 #00ffaa" },
          "50%": { textShadow: "2px 0 #00d4ff, -2px 0 #ff0080" },
          "75%": { textShadow: "-2px 0 #00d4ff, 2px 0 #ff0080" },
          "100%": { textShadow: "2px 0 #ff0080, -2px 0 #00ffaa" },
        },
        "scan-line": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
      },
      backgroundImage: {
        "grid-pattern": 
          "linear-gradient(rgba(0, 255, 170, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 170, 0.03) 1px, transparent 1px)",
        "circuit-pattern":
          "radial-gradient(circle at 25% 25%, rgba(0, 255, 170, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(0, 212, 255, 0.1) 0%, transparent 50%)",
      },
    },
  },
  plugins: [],
};

export default config;

