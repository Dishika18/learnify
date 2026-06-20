import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          primary: "var(--color-page-bg)",
          sidebar: "var(--color-sidebar-bg)",
          card: "var(--color-card)",
          "card-hover": "var(--color-card-hover)",
          input: "var(--color-input-bg)",
        },
        border: {
          input: "var(--color-input-border)",
          default: "var(--color-border-default)",
          hover: "var(--color-border-hover)",
        },
        text: {
          primary: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
          muted: "var(--color-text-muted)",
          placeholder: "var(--color-text-placeholder)",
        },
        accent: {
          purple: "var(--color-accent-purple)",
          "purple-dim": "var(--color-accent-purple-dim)",
          blue: "var(--color-accent-blue)",
          "blue-dim": "var(--color-accent-blue-dim)",
          teal: "var(--color-accent-teal)",
          "teal-dim": "var(--color-accent-teal-dim)",
          amber: "var(--color-accent-amber)",
          "amber-dim": "var(--color-accent-amber-dim)",
          red: "var(--color-accent-red)",
          "red-dim": "var(--color-accent-red-dim)",
        },
        success: {
          green: "var(--color-success-green)",
        },
      },
      fontSize: {
        xs: ["var(--text-xs)", { lineHeight: "1.6" }],
        sm: ["var(--text-sm)", { lineHeight: "1.6" }],
        base: ["var(--text-base)", { lineHeight: "1.6" }],
        lg: ["var(--text-lg)", { lineHeight: "1.2" }],
        xl: ["var(--text-xl)", { lineHeight: "1.2" }],
        "2xl": ["var(--text-2xl)", { lineHeight: "1.2" }],
        "3xl": ["var(--text-3xl)", { lineHeight: "1.2" }],
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
