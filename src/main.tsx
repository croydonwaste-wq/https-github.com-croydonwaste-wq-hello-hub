import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import { routes, utilityRoutes } from "./routes";
import "./index.css";

const container = document.getElementById("root")!;
const app = (
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);

// Pages are prerendered at build time, so hydrate the matching markup. If a host serves
// another page's HTML (e.g. an SPA fallback for an unknown URL), render fresh instead.
const path = window.location.pathname.endsWith("/") ? window.location.pathname : `${window.location.pathname}/`;
const prerendered = container.hasChildNodes() && ([...routes, ...utilityRoutes].some((r) => r.path === path) || document.title.startsWith("Page not found"));
if (prerendered) hydrateRoot(container, app);
else {
  container.innerHTML = "";
  createRoot(container).render(app);
}
