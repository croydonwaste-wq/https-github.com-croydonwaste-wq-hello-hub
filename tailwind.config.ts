import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: "1rem", screens: { "2xl": "1240px" } },
    extend: {
      colors: {
        navy: { 950: "#071733", 900: "#0B2147", 800: "#11306A", 700: "#1A4290", 600: "#2456B8", 100: "#E4ECFA", 50: "#F2F6FD" },
        signal: { 500: "#FFC629", 400: "#FFD45C", 100: "#FFF4D1" },
        brick: { 700: "#A8170F", 600: "#C81E14", 500: "#E0291E", 50: "#FDECEA" },
        ink: { 900: "#121826", 700: "#374151", 500: "#6B7280", 200: "#E5E7EB", 100: "#F3F4F6" },
        paper: "#FAF8F3",
      },
      fontFamily: {
        sans: ['"Inter Variable"', "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
        display: ['"Archivo"', '"Inter Variable"', "system-ui", "sans-serif"],
      },
      boxShadow: { card: "0 1px 2px rgba(7,23,51,.06), 0 8px 24px -12px rgba(7,23,51,.18)" },
    },
  },
  plugins: [],
} satisfies Config;
