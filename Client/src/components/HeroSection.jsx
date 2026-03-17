import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ArrowRight, Zap, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import StartApplication from "../components/StartApplication";
import { submitRecovery } from "../services/loanService";

export default function HeroSection() {
  const features = [
    "Instant Approval",
    "No Hidden Charges",
    "Digital Verification",
  ];

  // UI States
  const [isRecoveryOpen, setIsRecoveryOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  // Form State
  const [recoveryData, setRecoveryData] = useState({
    name: "",
    mobile: "",
    loan_id: "",
    pendingAmount: "",
    totalAmount: "",
  });

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecoveryData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Submit Logic
  const handleRecoverySubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await submitRecovery(recoveryData);
      setStatus({ type: "success", message: "Recovery request submitted successfully!" });
      
      // Auto-close modal after success
      setTimeout(() => {
        setIsRecoveryOpen(false);
        setStatus({ type: "", message: "" });
        setRecoveryData({ name: "", mobile: "", loan_id: "", pendingAmount: "", totalAmount: "" });
      }, 2000);
    } catch (error) {
      setStatus({ type: "error", message: error.message || "Something went wrong." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="relative overflow-hidden w-full min-h-screen bg-[#020617] overflow-x-hidden flex items-center justify-center py-20 lg:py-0">
        {/* GRID BACKGROUND */}
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              "linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* GLOW EFFECTS */}
        <div className="absolute top-[-5%] left-[-5%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-blue-600/30 rounded-full blur-[80px] md:blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-5%] right-[-5%] w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-emerald-500/10 rounded-full blur-[80px] md:blur-[100px]"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 lg:gap-8 items-center w-full">
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white space-y-8 text-center lg:text-left order-1 lg:order-1"
          >
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                <Zap size={14} className="text-yellow-400 fill-yellow-400" />
                <span className="text-blue-100 text-[10px] sm:text-xs font-semibold tracking-wide uppercase">
                  India's Most Trusted Digital Potli
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-[1.1] tracking-tight text-white">
                Aapki Khushiyon Ki <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-emerald-400">
                  Asli Potli
                </span>
              </h1>

              <p className="text-slate-400 text-base sm:text-lg max-w-lg mx-auto lg:mx-0 leading-relaxed">
                Unlock financial freedom up to{" "}
                <span className="text-white font-bold text-xl sm:text-2xl">
                  ₹40 Lacs
                </span>
                . Simple process, transparent rates, and{" "}
                <span className="text-emerald-400">zero stress.</span>
              </p>
            </div>

            {/* FEATURES */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4">
              {features.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 sm:px-4 py-2 rounded-xl whitespace-nowrap"
                >
                  <CheckCircle2 size={16} className="text-emerald-400" />
                  <span className="text-slate-200 text-xs sm:text-sm font-medium">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5 pt-4">
              <Link
                to="/check-status"
                className="w-full sm:w-auto group relative px-8 sm:px-10 py-4 sm:py-5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl font-bold text-base sm:text-lg text-white transition-all hover:border-blue-500/50 flex items-center justify-center gap-3"
              >
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                Check Loan Status
                <ArrowRight size={18} />
              </Link>
              <button
                onClick={() => setIsRecoveryOpen(true)}
                className="w-full sm:w-auto group relative px-8 sm:px-10 py-4 sm:py-5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl font-bold text-base sm:text-lg text-white transition-all hover:border-blue-500/50 flex items-center justify-center gap-3"
              >
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
                Loan Recovery
                <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>

          {/* RIGHT SIDE FORM */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center items-center order-2 lg:order-2"
          >
            <div className="relative w-full max-w-[90%] sm:max-w-md">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 blur-xl opacity-20 rounded-3xl"></div>
              <div className="relative bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl">
                <StartApplication />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* LOAN RECOVERY MODAL */}
      <AnimatePresence>
        {isRecoveryOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-[95%] max-w-md overflow-hidden rounded-3xl border border-white/20 bg-slate-900/90 p-8 shadow-2xl backdrop-blur-xl"
            >
              {/* DECORATIVE GLOW */}
              <div className="absolute -top-24 -left-24 h-48 w-48 rounded-full bg-blue-500/20 blur-3xl" />
              
              <button
                onClick={() => setIsRecoveryOpen(false)}
                className="absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-white/50 hover:text-white transition-all"
              >
                ✕
              </button>

              <div className="relative mb-6">
                <h2 className="text-2xl font-bold text-white">
                  Loan Recovery <span className="text-blue-400">Portal</span>
                </h2>
                <p className="text-sm text-slate-400">Verify your details to initiate recovery.</p>
              </div>

              {/* STATUS MESSAGE */}
              {status.message && (
                <div className={`mb-4 p-3 rounded-lg text-sm font-medium ${
                  status.type === "success" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"
                }`}>
                  {status.message}
                </div>
              )}

              <form onSubmit={handleRecoverySubmit} className="relative space-y-4">
                <div className="group">
                  <label className="mb-1 block text-xs font-medium uppercase text-slate-400">Full Name</label>
                  <input
                    name="name"
                    required
                    value={recoveryData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white outline-none focus:border-blue-500/50 focus:bg-white/10"
                  />
                </div>

                <div className="group">
                  <label className="mb-1 block text-xs font-medium uppercase text-slate-400">Phone Number</label>
                  <input
                    name="mobile"
                    type="tel"
                    required
                    value={recoveryData.mobile}
                    onChange={handleChange}
                    placeholder="Registered mobile number"
                    className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white outline-none focus:border-blue-500/50 focus:bg-white/10"
                  />
                </div>

                <div className="group">
                  <label className="mb-1 block text-xs font-medium uppercase text-slate-400">Loan Number</label>
                  <input
                    name="loan_id"
                    required
                    value={recoveryData.loan_id}
                    onChange={handleChange}
                    placeholder="LN-XXXXXX"
                    className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white outline-none focus:border-blue-500/50 focus:bg-white/10"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="group">
                    <label className="mb-1 block text-xs font-medium uppercase text-slate-400">Pending</label>
                    <input
                      name="pendingAmount"
                      type="number"
                      required
                      value={recoveryData.pendingAmount}
                      onChange={handleChange}
                      placeholder="₹0"
                      className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white outline-none focus:border-blue-500/50"
                    />
                  </div>
                  <div className="group">
                    <label className="mb-1 block text-xs font-medium uppercase text-slate-400">Total Loan</label>
                    <input
                      name="totalAmount"
                      type="number"
                      required
                      value={recoveryData.totalAmount}
                      onChange={handleChange}
                      placeholder="₹0"
                      className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white outline-none focus:border-blue-500/50"
                    />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  disabled={loading}
                  type="submit"
                  className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-4 font-bold text-white shadow-xl shadow-blue-900/20 flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {loading ? <Loader2 className="animate-spin" size={20} /> : "Submit Request"}
                </motion.button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}