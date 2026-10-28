import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: "1rem", screens: { "2xl": "1240px" } },
    extend: {
      colors: {
        navy: { 950: "#06122A", 900: "#0A1D3F", 800: "#132B57", 700: "#1E3F7A", 600: "#2B55A0", 200: "#C9D5EA", 100: "#E6ECF6", 50: "#F4F7FB" },
        signal: { 500: "#E9B949", 400: "#F0CC74", 100: "#FBF3DF" },
        brick: { 700: "#8E1218", 600: "#A8161E", 500: "#C21D25", 50: "#FBEDEE" },
        ink: { 900: "#121826", 700: "#374151", 500: "#6B7280", 200: "#E5E7EB", 100: "#F3F4F6" },
        paper: "#F7F8FA",
      },
      fontFamily: {
        sans: ['"Inter Variable"', "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
        display: ['"Manrope Variable"', '"Inter Variable"', "system-ui", "sans-serif"],
      },
      boxShadow: { card: "0 1px 2px rgba(10,29,63,.04), 0 1px 3px rgba(10,29,63,.06)", lift: "0 12px 32px -12px rgba(10,29,63,.22)" },
    },
  },
  plugins: [],
} satisfies Config;
