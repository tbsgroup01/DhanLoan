import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiZap, FiShield, FiTrendingUp } from 'react-icons/fi';

const ModernLoanHero = () => {
  const [amount, setAmount] = useState(25000);

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-yellow-400 selection:text-black font-sans">
      {/* Background: Grainy Gradient Mesh */}
      <div className="absolute inset-0 opacity-40 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-900 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-900 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          
          {/* Left: Bold Typography */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-yellow-500 font-mono text-sm tracking-widest uppercase"
            >
              <FiZap /> <span>Instant Liquidity</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-8xl font-black tracking-tighter leading-none"
            >
              OWN YOUR <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-500">
                FUTURE.
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-slate-400 max-w-lg leading-relaxed border-l-2 border-yellow-500 pl-6"
            >
              We don't just lend money. We fuel transitions. From debt-heavy to debt-free in a few clicks.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-6"
            >
              <button className="px-10 py-5 bg-white text-black font-bold rounded-full hover:bg-yellow-400 transition-colors duration-300 flex items-center gap-3 group">
                Apply Now <FiTrendingUp className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </motion.div>
          </div>

          {/* Right: Interactive Glass Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-5"
          >
            <div className="relative p-1 bg-gradient-to-br from-white/20 to-transparent rounded-[2.5rem]">
              <div className="bg-[#0a0a0a] backdrop-blur-3xl rounded-[2.4rem] p-10 shadow-2xl space-y-10 border border-white/5">
                <div className="space-y-2">
                  <label className="text-slate-500 uppercase text-xs font-bold tracking-widest">Amount Needed</label>
                  <div className="flex justify-between items-end">
                    <span className="text-5xl font-mono font-bold">${amount.toLocaleString()}</span>
                  </div>
                  <input 
                    type="range" 
                    min="1000" 
                    max="100000" 
                    step="1000"
                    value={amount}
                    onChange={(e) => setAmount(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-yellow-500 mt-4"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                    <p className="text-xs text-slate-500 uppercase mb-1">Monthly Pay</p>
                    <p className="text-xl font-bold font-mono text-yellow-500">${(amount / 24).toFixed(0)}*</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                    <p className="text-xs text-slate-500 uppercase mb-1">Interest Rate</p>
                    <p className="text-xl font-bold font-mono">4.5% Fixed</p>
                  </div>
                </div>

                <button className="w-full py-4 border border-white/10 rounded-2xl font-bold text-slate-300 hover:bg-white hover:text-black transition-all">
                  Full Calculation Details
                </button>
              </div>
              
              {/* Floating Badge */}
              <motion.div 
                animate={{ rotate: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 6 }}
                className="absolute -top-8 -right-8 bg-yellow-500 text-black p-6 rounded-2xl shadow-2xl -rotate-6 hidden md:block"
              >
                <FiShield size={32} />
                <p className="mt-2 font-black leading-none">NO<br />CREDIT<br />HIT</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ModernLoanHero;