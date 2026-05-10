/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,ts}",
    "./.storybook/**/*.{ts,js}",
  ],
  theme: {
    extend: {
      colors: {
        gitkut: {
          bg: "#f9f9ff",
          wash: "#e7eeff",
          topbar: "#d4e1f5",
          topbarDeep: "#c5d4ef",
          card: "#ffffff",
          cardSoft: "#f0f3ff",
          line: "#b8cce9",
          lineSoft: "#d8e3fa",
          ink: "#111c2c",
          muted: "#535f70",
          softText: "#596576",
          primary: "#a03b56",
          primaryDark: "#771b38",
          pink: "#ff85a1",
          pinkSoft: "#ffd9df",
          bluePill: "#d6e3f8",
          yellow: "#fff9db",
          yellowLine: "#e5d48c",
        },
      },
      fontFamily: {
        sans: ["Arimo", "Arial", "Helvetica", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      boxShadow: {
        retro: "2px 2px 0 rgba(17, 28, 44, 0.06)",
        "retro-hover": "3px 3px 0 rgba(160, 59, 86, 0.12)",
        inset: "inset 0 1px 2px rgba(17, 28, 44, 0.08)",
      },
      maxWidth: {
        gitkut: "1140px",
      },
    },
  },
  plugins: [],
};
