import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { SiteProvider } from "./context/SiteContext.jsx";
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SiteProvider>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </SiteProvider>
  </StrictMode>,
);
