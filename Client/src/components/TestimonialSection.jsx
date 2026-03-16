import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star, ArrowLeft, ArrowRight } from "lucide-react";

const reviews = [
  { id: 1, name: "Pusal Enum", role: "Marketing Executive", comment: "The instant approval feature saved my business during a cash flow crunch. Truly seamless.", rating: 5, img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" },
  { id: 2, name: "Spark Bones", role: "Product Designer", comment: "Minimal documentation and digital verification took less than 5 minutes. Best experience ever.", rating: 5, img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka" },
  { id: 3, name: "Rahul Sharma", role: "Business Owner", comment: "No hidden charges, everything was clear. Truly the 'Asli Potli' of happiness for my family.", rating: 5, img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul" },
  { id: 4, name: "Sarah Jenkins", role: "Financial Analyst", comment: "I appreciate their risk assessment and fast processing. Highly secure and reliable platform.", rating: 5, img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" }
];

export default function PremiumTestimonials() {
  const [index, setIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(1);

  // Responsive adjustments
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setCardsPerView(2);
      else setCardsPerView(1);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Shift by 1 card at a time for smoother navigation
  const next = () => {
    if (index < reviews.length - cardsPerView) {
      setIndex((prev) => prev + 1);
    }
  };

  const prev = () => {
    if (index > 0) {
      setIndex((prev) => prev - 1);
    }
  };

  return (
    <section className="py-20 md:py-28 bg-[#020617] relative overflow-hidden">
      {/* Premium Glow Effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
          <div className="max-w-xl text-center md:text-left">
            <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest">
              Success Stories
            </div>
            <h2 className="text-white text-4xl md:text-6xl font-black leading-tight tracking-tighter">
              Trusted by <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-emerald-400">
                Thousands
              </span>
            </h2>
          </div>

          {/* Navigation Controls */}
          <div className="flex gap-4 w-full md:w-auto justify-center">
            <button
              onClick={prev}
              disabled={index === 0}
              className="group p-4 rounded-2xl border border-white/5 bg-white/5 text-white transition-all hover:bg-white/10 hover:border-blue-500/50 disabled:opacity-20 disabled:cursor-not-allowed"
            >
              <ArrowLeft size={24} className="group-active:scale-90 transition-transform" />
            </button>
            <button
              onClick={next}
              disabled={index >= reviews.length - cardsPerView}
              className="group p-4 rounded-2xl bg-blue-600 text-white transition-all hover:bg-blue-500 shadow-lg shadow-blue-600/20 disabled:opacity-20 disabled:cursor-not-allowed"
            >
              <ArrowRight size={24} className="group-active:scale-90 transition-transform" />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <div className="overflow-visible">
            <motion.div
              className="flex gap-0"
              animate={{ x: `-${index * (100 / cardsPerView)}%` }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
              {reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="px-2 md:px-4 shrink-0"
                  style={{ width: `${100 / cardsPerView}%` }}
                >
                  <motion.div
                    whileHover={{ y: -10 }}
                    className="bg-slate-900/40 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] border border-white/5 h-full flex flex-col relative overflow-hidden group hover:border-blue-500/30 transition-colors"
                  >
                    {/* Floating Quote Icon */}
                    <Quote size={80} className="absolute -top-4 -right-4 text-blue-500/5 rotate-12" />

                    {/* Stars */}
                    <div className="flex gap-1.5 mb-8">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} className="fill-emerald-400 text-emerald-400" />
                      ))}
                    </div>

                    {/* Comment */}
                    <p className="text-slate-200 text-lg md:text-xl leading-relaxed mb-10 font-medium italic relative z-10">
                      "{rev.comment}"
                    </p>

                    {/* User Info */}
                    <div className="mt-auto flex items-center gap-5 pt-8 border-t border-white/5">
                      <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl overflow-hidden border-2 border-blue-500/20 shadow-xl group-hover:border-blue-400/50 transition-colors">
                        <img src={rev.img} alt={rev.name} className="w-full h-full object-cover bg-slate-800" />
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-lg md:text-xl tracking-tight">
                          {rev.name}
                        </h4>
                        <p className="text-blue-400 text-sm font-semibold uppercase tracking-wider">
                          {rev.role}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>
          
          {/* Progress Indicator Dots */}
          <div className="flex justify-center gap-2 mt-10">
            {Array.from({ length: reviews.length - (cardsPerView - 1) }).map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === i ? "w-8 bg-blue-500" : "w-2 bg-slate-700 hover:bg-slate-600"
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}