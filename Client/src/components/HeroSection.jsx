import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, ShieldCheck, Zap } from "lucide-react";
import PotliImg from "../assets/potli.png";
// 1. Corrected Import: useNavigate is the hook for navigation
import { Link, useNavigate } from "react-router-dom";

export default function HeroSection() {
  // 2. Initialize the navigate function
  const navigate = useNavigate();

  const features = [
    "Instant Approval",
    "No Hidden Charges",
    "Digital Verification",
  ];

  // 3. Logic to handle navigation and smooth scroll
  const handleApplyClick = () => {
    // If the section is on the same page, we can scroll directly
    const element = document.getElementById("apply-loan");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      // If we are on a different page, navigate to the route
      navigate("/#apply-loan");
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-[#020617] overflow-hidden flex items-center justify-center m-0 p-0">
      {/* --- BACKGROUND DESIGN --- */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      ></div>

      {/* Dynamic Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/30 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px]"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center w-full py-12 lg:py-0">
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-white space-y-8 text-center lg:text-left order-2 lg:order-1"
        >
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
            >
              <Zap size={14} className="text-yellow-400 fill-yellow-400" />
              <span className="text-blue-100 text-xs md:text-sm font-semibold tracking-wide uppercase">
                India's Most Trusted Digital Potli
              </span>
            </motion.div>

            <h1 className="text-5xl sm:text-6xl lg:text-6xl font-black leading-[1] tracking-tight text-white">
              Aapki Khushiyon Ki <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-emerald-400">
                Asli Potli
              </span>
            </h1>

            <p className="text-slate-400 text-lg md:text-xl max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Unlock financial freedom up to{" "}
              <span className="text-white font-bold text-2xl">₹40 Lacs</span>.
              Simple process, transparent rates, and{" "}
              <span className="text-emerald-400">zero stress.</span>
            </p>
          </div>

          {/* Features List */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-4">
            {features.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + idx * 0.1 }}
                className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl"
              >
                <CheckCircle2 size={18} className="text-emerald-400" />
                <span className="text-slate-200 text-sm font-medium">
                  {item}
                </span>
              </motion.div>
            ))}
          </div>

          {/* CTA Group */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5 pt-4">
            <button
              onClick={handleApplyClick}
              className="w-full sm:w-auto group relative px-10 py-5 bg-blue-600 rounded-2xl font-black text-lg transition-all hover:bg-blue-500 hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] active:scale-95 flex items-center justify-center gap-3"
            >
              APPLY FOR LOAN
              <ArrowRight
                size={22}
                className="group-hover:translate-x-2 transition-transform"
              />
            </button>

            <Link
              to="/check-status"
              className="w-full sm:w-auto group relative px-10 py-5 bg-white/5 backdrop-blur-sm border-2 border-white/10 rounded-2xl font-bold text-lg text-white overflow-hidden transition-all duration-300 hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] flex items-center justify-center gap-3"
            >
              {/* The Animated "Live" Dot */}
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>

              <span className="relative z-10">Check Loan Status</span>

              {/* Subtle Hover Reveal Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </Link>
          </div>

          {/* Trust Stats Bar */}
          <div className="pt-8 flex items-center justify-center lg:justify-start gap-8 border-t border-white/5">
            <div className="text-center lg:text-left">
              <p className="text-2xl font-bold text-white">10M+</p>
              <p className="text-slate-500 text-xs uppercase tracking-widest font-bold">
                Disbursed
              </p>
            </div>
            <div className="h-10 w-[1px] bg-white/10" />
            <div className="text-center lg:text-left">
              <p className="text-2xl font-bold text-white">4.9/5</p>
              <p className="text-slate-500 text-xs uppercase tracking-widest font-bold">
                Rating
              </p>
            </div>
          </div>
        </motion.div>

        {/* RIGHT CONTENT */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1 }}
          className="relative flex justify-center items-center order-1 lg:order-2"
        >
          {/* Circular Decorative Rings */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] border border-dashed border-blue-500/20 rounded-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute w-[250px] h-[250px] md:w-[400px] md:h-[400px] border border-dotted border-indigo-500/10 rounded-full"
            />
          </div>

          {/* Main Image with Floating Animation */}
          <motion.div
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative z-20 drop-shadow-[0_35px_60px_rgba(59,130,246,0.3)]"
          >
            <img
              src={PotliImg}
              alt="Potli"
              className="w-[300px] sm:w-[400px] lg:w-[550px] object-contain hover:scale-105 transition-transform duration-500"
            />

            {/* Floating Trust Card */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1 }}
              className="absolute -right-4 top-1/4 bg-slate-900/80 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl hidden md:flex items-center gap-4"
            >
              <div className="bg-emerald-500/20 p-2 rounded-full">
                <ShieldCheck className="text-emerald-400" size={24} />
              </div>
              <div>
                <p className="text-white font-bold text-sm leading-none text-left">
                  Verified
                </p>
                <p className="text-slate-400 text-[10px] mt-1">RBI Regulated</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
