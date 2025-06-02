import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { HashRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import DistressCall from "./pages/DistressCall.tsx";
import { useEffect } from "react";

// Define window.gtag for TypeScript
declare global {
  interface Window {
    gtag?: (event: string, action: string, params?: Record<string, unknown>) => void;
  }
}

const AnalyticsPageViewTracker = () => {
  const location = useLocation();

  useEffect(() => {
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: location.pathname + location.search,
        page_location: window.location.href, // Using window.location.href for HashRouter
        page_title: document.title,
      });
    }
  }, [location.pathname, location.search]);

  return null; // This component does not render anything
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  // Using HashRouter to get around GitHub Pages being the primary router for URL paths
  <HashRouter>
    <AnalyticsPageViewTracker />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="distresscall" element={<DistressCall />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </HashRouter>,
);
