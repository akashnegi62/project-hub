import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#09090B",
        "background-alt": "#0C0C0E",
        "sidebar-bg": "#121214",
        "sidebar-bg-alt": "#161618",
        "card-bg": "#18181B",
        "card-bg-alt": "#1C1C1F",
        "card-border": "#27272A",
        "card-border-hover": "#3F3F46",
        "text-primary": "#FAFAFA",
        "text-secondary": "#A1A1AA",
        "text-muted": "#71717A",
        "accent-pill": "#27272A",
        "accent-active": "#3F3F46",
        "status-positive": "#22C55E",
        "status-positive-alt": "#4ADE80",
        "status-negative": "#EF4444",
        "status-negative-alt": "#F87171",
        "border-subtle": "#27272A",
        "hover-tint": "#1F1F23",
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        mono: ["JetBrains Mono", "SF Mono", "monospace"],
      },
      fontSize: {
        kpi: ["1.75rem", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" }],
        h2: ["1.125rem", { lineHeight: "1.3", letterSpacing: "-0.01em", fontWeight: "600" }],
        h3: ["0.875rem", { lineHeight: "1.4", fontWeight: "500" }],
        nav: ["0.875rem", { lineHeight: "1.5" }],
        micro: ["0.75rem", { lineHeight: "1.4" }],
        badge: ["0.75rem", { lineHeight: "1", fontWeight: "500" }],
      },
      borderRadius: {
        pill: "9999px",
      },
    },
  },
  plugins: [],
};
export default config;
