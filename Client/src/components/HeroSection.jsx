import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import StartApplication from "../components/StartApplication";

export default function HeroSection() {
  const features = [
    "Instant Approval",
    "No Hidden Charges",
    "Digital Verification",
  ];

  return (
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

        {/* LEFT CONTENT - Set to order-1 for mobile first display */}
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
              <span className="text-white font-bold text-xl sm:text-2xl">₹40 Lacs</span>.
              Simple process, transparent rates, and{" "}
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
          </div>

          {/* TRUST STATS */}
          <div className="pt-8 flex items-center justify-center lg:justify-start gap-6 sm:gap-8 border-t border-white/5">
            <div className="text-center lg:text-left">
              <p className="text-xl sm:text-2xl font-bold text-white">10M+</p>
              <p className="text-slate-500 text-[10px] uppercase tracking-widest font-bold">
                Disbursed
              </p>
            </div>

            <div className="h-10 w-[1px] bg-white/10" />

            <div className="text-center lg:text-left">
              <p className="text-xl sm:text-2xl font-bold text-white">4.9/5</p>
              <p className="text-slate-500 text-[10px] uppercase tracking-widest font-bold">
                Rating
              </p>
            </div>
          </div>
        </motion.div>

        {/* RIGHT SIDE FORM - Set to order-2 for mobile display below text */}
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
  );
}