import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  server: { host: "::", port: 8080 },
  plugins: [react()],
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
  // Bundle CJS-only deps into the prerender (SSR) build to avoid ESM interop issues.
  ssr: { noExternal: ["react-helmet-async", "react-router-dom", "react-router", "@remix-run/router"] },
});
