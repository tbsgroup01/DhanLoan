import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { loginUser, registerUser } from "../services/loanService";
import {
  FaMobileAlt,
  FaLock,
  FaFingerprint,
  FaArrowRight,
} from "react-icons/fa";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    loanId: "",
    mobile: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAction = async () => {
    setError("");
    setLoading(true);
    try {
      const res = isLogin
        ? await loginUser({
            mobile: formData.mobile,
            password: formData.password,
          })
        : await registerUser({
            loan_id: formData.loanId,
            mobile: formData.mobile,
            password: formData.password,
          });

      if (res.token) {
        localStorage.setItem("token", res.token);

        // save user name
        if (res.name) {
          localStorage.setItem("userName", res.name);
        }

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
    <div className="min-h-screen flex items-center justify-center bg-[#0d1117] p-4 relative overflow-hidden">
      {/* --- BACKGROUND NEON BLOBS (Consistent with Dashboard) --- */}
      <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-purple-600/20 blur-[100px] -z-10" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-blue-600/20 blur-[100px] -z-10" />

      {/* --- GLASSMORPHISM LOGIN CARD --- */}
      <div className="relative w-full max-w-[440px] overflow-hidden rounded-[40px] border border-white/10 bg-white/5 shadow-2xl backdrop-blur-2xl">
        {/* Subtle Pink Inner Glow (Matching the Master Card) */}
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-pink-500/10 blur-3xl -z-10" />

        {/* Top Toggle Switch */}
        <div className="p-1.5 m-8 bg-black/20 rounded-2xl flex relative border border-white/5">
          <motion.div
            animate={{ x: isLogin ? 0 : "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute top-1.5 left-1.5 w-[calc(50%-12px)] h-[calc(100%-12px)] bg-white/10 backdrop-blur-md rounded-xl border border-white/10 shadow-xl"
          />
          <button
            onClick={() => {
              setIsLogin(true);
              setError("");
            }}
            className={`relative z-10 w-1/2 py-3 text-sm font-bold transition-colors ${isLogin ? "text-white" : "text-slate-500"}`}
          >
            Login
          </button>
          <button
            onClick={() => {
              setIsLogin(false);
              setError("");
            }}
            className={`relative z-10 w-1/2 py-3 text-sm font-bold transition-colors ${!isLogin ? "text-white" : "text-slate-500"}`}
          >
            Register
          </button>
        </div>

        <div className="px-10 pb-12">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-black text-white tracking-tighter">
              {isLogin ? "Access Portal" : "Client Enrollment"}
            </h2>
            <p className="text-slate-400 text-sm mt-2 font-medium">
              {isLogin
                ? "Secure login for loan management"
                : "Initialize your premium credit account"}
            </p>
          </div>

          <div className="space-y-6">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="relative group"
                >
                  <FaFingerprint className="absolute left-4 top-4 text-slate-500 group-focus-within:text-purple-400 transition-colors" />
                  <input
                    type="text"
                    placeholder="Loan ID (e.g. 8050 2020...)"
                    value={formData.loanId}
                    onChange={(e) =>
                      setFormData({ ...formData, loanId: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 p-4 pl-12 rounded-2xl outline-none focus:bg-white/10 focus:border-purple-500/50 transition-all text-sm text-white placeholder:text-slate-600"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative group">
              <FaMobileAlt className="absolute left-4 top-4 text-slate-500 group-focus-within:text-purple-400 transition-colors" />
              <input
                type="text"
                placeholder="Mobile Number"
                value={formData.mobile}
                onChange={(e) =>
                  setFormData({ ...formData, mobile: e.target.value })
                }
                className="w-full bg-white/5 border border-white/10 p-4 pl-12 rounded-2xl outline-none focus:bg-white/10 focus:border-purple-500/50 transition-all text-sm text-white placeholder:text-slate-600"
              />
            </div>

            <div className="relative group">
              <FaLock className="absolute left-4 top-4 text-slate-500 group-focus-within:text-purple-400 transition-colors" />
              <input
                type="password"
                placeholder="Secure Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full bg-white/5 border border-white/10 p-4 pl-12 rounded-2xl outline-none focus:bg-white/10 focus:border-purple-500/50 transition-all text-sm text-white placeholder:text-slate-600"
              />
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-400 text-xs font-bold text-center"
              >
                {error}
              </motion.p>
            )}

            <button
              onClick={handleAction}
              disabled={loading}
              className="w-full group relative bg-white text-black p-4 rounded-2xl font-bold text-xs tracking-[0.2em] overflow-hidden transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 mt-4 shadow-2xl"
            >
              <div className="relative z-10 flex items-center justify-center gap-2">
                {loading
                  ? "AUTHENTICATING..."
                  : isLogin
                    ? "SECURE LOGIN"
                    : "CREATE ACCOUNT"}
                {!loading && (
                  <FaArrowRight className="text-[10px] group-hover:translate-x-1 transition-transform" />
                )}
              </div>
              {/* Animated Gradient Background on Hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-200 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
