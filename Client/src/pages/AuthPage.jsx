import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { loginUser, registerUser } from "../services/loanService";
import { FaMobileAlt, FaLock, FaFingerprint, FaArrowRight } from "react-icons/fa";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ loanId: "", mobile: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAction = async () => {
    setError("");
    setLoading(true);
    
    try {
      const res = isLogin 
        ? await loginUser({ mobile: formData.mobile, password: formData.password })
        : await registerUser({ loan_id: formData.loanId, mobile: formData.mobile, password: formData.password });

      if (res.token) {
        localStorage.setItem("token", res.token);
        navigate("/dashboard");
      } else {
        setError(res.message || "Authentication failed");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] p-4">
      {/* Main Card Container */}
      <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] w-full max-w-[440px] overflow-hidden border border-gray-50">
        
        {/* Top Toggle Switch */}
        <div className="p-2 m-6 bg-gray-100 rounded-2xl flex relative">
          <motion.div 
            animate={{ x: isLogin ? 0 : "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute top-2 left-2 w-[calc(50%-8px)] h-[calc(100%-16px)] bg-white rounded-xl shadow-sm"
          />
          <button 
            onClick={() => { setIsLogin(true); setError(""); }}
            className={`relative z-10 w-1/2 py-3 text-sm font-bold transition-colors ${isLogin ? "text-slate-900" : "text-slate-400"}`}
          >
            Login
          </button>
          <button 
            onClick={() => { setIsLogin(false); setError(""); }}
            className={`relative z-10 w-1/2 py-3 text-sm font-bold transition-colors ${!isLogin ? "text-slate-900" : "text-slate-400"}`}
          >
            Register
          </button>
        </div>

        <div className="px-8 pb-10">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">
              {isLogin ? "Welcome Back" : "Get Started"}
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              {isLogin ? "Enter your details to access your loan" : "Create a secure account for your loan"}
            </p>
          </div>

          <div className="space-y-5">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="relative group"
                >
                  <FaFingerprint className="absolute left-4 top-4 text-slate-300 group-focus-within:text-blue-500 transition-colors" />
                  <input
                    type="text"
                    placeholder="Loan ID"
                    value={formData.loanId}
                    onChange={(e) => setFormData({...formData, loanId: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-100 p-3.5 pl-12 rounded-2xl outline-none focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-200 transition-all text-sm"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative group">
              <FaMobileAlt className="absolute left-4 top-4 text-slate-300 group-focus-within:text-blue-500 transition-colors" />
              <input
                type="text"
                placeholder="Mobile Number"
                value={formData.mobile}
                onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                className="w-full bg-slate-50 border border-slate-100 p-3.5 pl-12 rounded-2xl outline-none focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-200 transition-all text-sm"
              />
            </div>

            <div className="relative group">
              <FaLock className="absolute left-4 top-4 text-slate-300 group-focus-within:text-blue-500 transition-colors" />
              <input
                type="password"
                placeholder={isLogin ? "Password" : "Create Password"}
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full bg-slate-50 border border-slate-100 p-3.5 pl-12 rounded-2xl outline-none focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-200 transition-all text-sm"
              />
            </div>

            {error && (
              <motion.p 
                initial={{ opacity: 0, x: -10 }} 
                animate={{ opacity: 1, x: 0 }} 
                className="text-red-500 text-xs font-bold px-2"
              >
                {error}
              </motion.p>
            )}

            <button
              onClick={handleAction}
              disabled={loading}
              className="w-full group relative bg-slate-900 text-white p-4 rounded-2xl font-bold text-sm tracking-widest overflow-hidden transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-70 shadow-xl shadow-slate-200"
            >
              <div className="relative z-10 flex items-center justify-center gap-2">
                {loading ? "PROCESSING..." : isLogin ? "LOGIN" : "CREATE ACCOUNT"}
                {!loading && <FaArrowRight className="text-[10px] group-hover:translate-x-1 transition-transform" />}
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}