import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import DistressCall from "./pages/DistressCall.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // Using HashRouter to get around GitHub Pages being the primary router for URL paths
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="distresscall" element={<DistressCall />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </HashRouter>,
);
