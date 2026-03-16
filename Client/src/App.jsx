import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

import CheckStatus from "./pages/CheckStatus";
import PaymentPage from "./pages/PaymentPage";
import StatusPage from "./pages/StatusPage";
import LoginPassword from "./pages/LoginPassword";
import Dashboard from "./pages/Dashboard";

import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import { getSiteSettings } from "./services/siteService";
import { loadTrackingTags } from "./utils/loadTags";
import AuthPage from "./pages/AuthPage";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import About from "./pages/About";

import ProtectedRoute from "./routes/ProtectedRoute";
import ServicesPage from "./pages/ServicesPage";
import ContactPage from "./pages/ContactPage";
import ApplyLoan from "./pages/ApplyLoan";
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

        <meta name="description" content={settings.meta_description} />

        <meta name="keywords" content={settings.meta_keywords} />

        {settings.favicon && (
          <link rel="icon" href={`http://loanapi.towsindia.com${settings.favicon}`} />
        )}
      </Helmet>

      <Toaster position="top-right" />

      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-1 pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/apply-loan" element={<ApplyLoan />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/status" element={<StatusPage />} />
            <Route path="/check-status" element={<CheckStatus />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/login-password" element={<LoginPassword />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>

        <Footer settings={settings} />
      </div>

      
    </BrowserRouter>
  );
}

export default App;
