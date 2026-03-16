import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { requestLoginOtp, verifyLoginOtp } from "../services/loanService";
import {
  FaMobileAlt,
  FaFingerprint,
  FaArrowRight,
  FaShieldAlt,
} from "react-icons/fa";

import AuthImg from "../assets/auth-img.png"

export default function AuthPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ loanId: "", mobile: "", otp: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRequestOtp = async () => {
    setError("");
    if (!formData.loanId || !formData.mobile) {
      setError("Please enter both Loan ID and Mobile Number.");
      return;
    }
    setLoading(true);
    try {
      const res = await requestLoginOtp(formData.loanId, formData.mobile);
      if (res.success) setStep(2);
      else setError(res.message || "Invalid credentials.");
    } catch (err) {
      setError("Server connection failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setError("");
    if (formData.otp.length < 4) {
      setError("Please enter a valid OTP.");
      return;
    }
    setLoading(true);
    try {
      const res = await verifyLoginOtp(formData.loanId, formData.otp);
      if (res.token) {
        localStorage.setItem("token", res.token);
        if (res.name) localStorage.setItem("userName", res.name);
        navigate("/dashboard");
      } else {
        setError(res.message || "Invalid OTP.");
      }
    } catch (err) {
      setError("Verification failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 font-sans bg-[#061336] overflow-hidden relative" >

      {/* BACKGROUND DECORATION */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(#4E3AF6 1px, transparent 1px), linear-gradient(90deg, #0a0a0a 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* GLOW EFFECTS - Updated to match #4E3AF6 */}
      <div className="absolute top-[-5%] left-[-5%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[#4E3AF6]/20 rounded-full blur-[80px] md:blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-5%] right-[-5%] w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-indigo-500/10 rounded-full blur-[80px] md:blur-[100px]"></div>

      {/* Main Container */}
      <div className="w-full max-w-[1000px] flex flex-col md:flex-row rounded-[32px] shadow-2xl overflow-hidden min-h-[600px] z-10">
        
        {/* LEFT SIDE: ILLUSTRATION */}
        <div className="w-full md:w-1/2 bg-gray-300 p-12 flex flex-col items-center justify-center text-center">
          <img 
            src={AuthImg} 
            alt="Secure Login" 
            className="w-full max-w-[300px] mb-8"
          />
          <h3 className="text-2xl font-bold text-slate-800">Secure Access</h3>
          <p className="text-slate-500 mt-2 max-w-xs">
            Manage your loan profile with one-time security codes.
          </p>
        </div>

        {/* RIGHT SIDE: FORM (Updated to #4E3AF6 Gradient) */}
        <div 
          className="w-full md:w-1/2 relative p-8 md:p-16 flex flex-col justify-center"
          style={{ 
            background: 'linear-gradient(135deg, #4E3AF6 0%, #3a29c2 100%)' 
          }}
        >
          
          {/* Grid Overlay Effect */}
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none" 
            style={{ 
              background: `radial-gradient(circle, #fff 0.8px, transparent 0.8px)`,
              backgroundSize: '24px 24px'
            }} 
          />

          <div className="relative z-10">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white tracking-tight">
                {step === 1 ? "Sign in to account" : "Verify OTP"}
              </h2>
              <p className="text-indigo-100 mt-2">
                {step === 1 
                  ? "Welcome back! Please enter your details." 
                  : "Check your phone for the 6-digit code."}
              </p>
            </div>

            <div className="space-y-4">
              <AnimatePresence mode="wait">
                {step === 1 ? (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="space-y-4"
                  >
                    <div className="relative">
                      <FaFingerprint className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-200" />
                      <input
                        type="text"
                        placeholder="Loan ID"
                        value={formData.loanId}
                        onChange={(e) => setFormData({ ...formData, loanId: e.target.value })}
                        className="w-full bg-white/10 border border-white/20 p-4 pl-12 rounded-xl outline-none focus:bg-white/20 focus:border-white transition-all text-white placeholder:text-indigo-200"
                      />
                    </div>

                    <div className="relative">
                      <FaMobileAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-200" />
                      <input
                        type="tel"
                        placeholder="Mobile Number"
                        value={formData.mobile}
                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                        className="w-full bg-white/10 border border-white/20 p-4 pl-12 rounded-xl outline-none focus:bg-white/20 focus:border-white transition-all text-white placeholder:text-indigo-200"
                      />
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="space-y-4"
                  >
                    <div className="relative">
                      <FaShieldAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-200" />
                      <input
                        type="text"
                        placeholder="Enter OTP"
                        maxLength={6}
                        value={formData.otp}
                        onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                        className="w-full bg-white/10 border border-white/20 p-4 pl-12 rounded-xl outline-none focus:bg-white/20 focus:border-white transition-all text-white text-center text-xl tracking-[0.3em] font-bold"
                      />
                    </div>
                    <button 
                      onClick={() => setStep(1)}
                      className="text-sm text-indigo-100 underline decoration-indigo-100/30 underline-offset-4 hover:text-white"
                    >
                      Use different details
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {error && (
                <p className="text-red-200 text-sm font-medium bg-red-900/20 p-3 rounded-lg border border-red-500/30">
                  {error}
                </p>
              )}

              <button
                onClick={step === 1 ? handleRequestOtp : handleVerifyOtp}
                disabled={loading}
                className="w-full bg-white text-[#4E3AF6] p-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-50 transition-all active:scale-[0.98] disabled:opacity-50 mt-4 shadow-lg shadow-indigo-900/40"
              >
                {loading ? "Processing..." : step === 1 ? "GET OTP" : "VERIFY & LOGIN"}
                {!loading && <FaArrowRight className="text-sm" />}
              </button>
            </div>

            <h1 className="mt-12 text-center text-red-500 text-3xl  uppercase ">
              Dummy OTP is : 123456
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}