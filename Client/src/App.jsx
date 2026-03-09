import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

import ApplyLoan from "./pages/ApplyLoan";
import CheckStatus from "./pages/CheckStatus";
import PaymentPage from "./pages/PaymentPage";
import StatusPage from "./pages/StatusPage";

import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import { getSiteSettings } from "./services/siteService";
import { loadTrackingTags } from "./utils/loadTags";

function App() {

  const [settings, setSettings] = useState(null);

  useEffect(() => {

    getSiteSettings().then((data) => {
      setSettings(data);
    });

  }, []);

  useEffect(() => {
    loadTrackingTags();
  }, []);

  if (!settings) return null;

  return (

    <BrowserRouter>

      {/* ===== SEO SETTINGS ===== */}

      <Helmet>

        <title>{settings.site_title}</title>

        <meta
          name="description"
          content={settings.meta_description}
        />

        <meta
          name="keywords"
          content={settings.meta_keywords}
        />

        {settings.favicon && (
          <link
            rel="icon"
            href={`http://localhost:3000${settings.favicon}`}
          />
        )}

      </Helmet>

      <Toaster position="top-right" />

      <Navbar settings={settings} />

      <Routes>
        <Route path="/" element={<ApplyLoan />} />
        <Route path="/status" element={<StatusPage />} />
        <Route path="/check-status" element={<CheckStatus />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;