import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { notFoundElement, routes as indexable, utilityRoutes } from "@/routes";

const routes = [...indexable, ...utilityRoutes];

function ScrollManager() {
  const { pathname, hash, key } = useLocation();
  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView();
    } else {
      window.scrollTo(0, 0);
    }
    // `key` changes on every navigation, so tapping "Free quote" again re-scrolls to the form.
  }, [pathname, hash, key]);
  return null;
}

export default function App() {
  return (
    <Layout>
      <ScrollManager />
      <Routes>
        {routes.map((r) => (
          <Route key={r.path} path={r.path} element={r.element} />
        ))}
        {/* Accept URLs without a trailing slash too; canonical tags point at the slashed version. */}
        {routes.filter((r) => r.path !== "/").map((r) => (
          <Route key={`${r.path}-noslash`} path={r.path.slice(0, -1)} element={r.element} />
        ))}
        <Route path="*" element={notFoundElement} />
      </Routes>
    </Layout>
  );
}
