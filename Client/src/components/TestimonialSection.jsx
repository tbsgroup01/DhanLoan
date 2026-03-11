import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Star, ArrowLeft, ArrowRight } from 'lucide-react';

const reviews = [
  { id: 1, name: "Pusal Enum", role: "Marketing Executive", comment: "The instant approval feature saved my business during a cash flow crunch. Truly seamless.", rating: 5, img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" },
  { id: 2, name: "Spark Bones", role: "Product Designer", comment: "Minimal documentation and digital verification took less than 5 minutes. Best experience ever.", rating: 5, img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka" },
  { id: 3, name: "Rahul Sharma", role: "Business Owner", comment: "No hidden charges, everything was clear. Truly the 'Asli Potli' of happiness for my family.", rating: 5, img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul" },
  { id: 4, name: "Sarah Jenkins", role: "Financial Analyst", comment: "I appreciate their risk assessment and fast processing. Highly secure and reliable platform.", rating: 5, img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" }
];

export default function PremiumTestimonials() {
  const [index, setIndex] = useState(0);

  // 2 cards move karenge ek saath taaki exact 2 hi dikhen
  const next = () => {
    if (index < reviews.length - 2) setIndex(index + 2);
  };
  
  const prev = () => {
    if (index > 0) setIndex(index - 2);
  };

  return (
    <section className="py-24 bg-[#0a192f] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-white text-4xl md:text-5xl font-black mb-4 leading-tight">
              Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Thousands</span>
            </h2>
            <p className="text-gray-400 text-lg">Real stories from our valued members</p>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={prev}
              disabled={index === 0}
              className={`p-4 rounded-2xl border border-white/10 transition-all ${index === 0 ? 'opacity-20 cursor-not-allowed' : 'hover:bg-white/10 text-white'}`}
            >
              <ArrowLeft size={24} />
            </button>
            <button 
              onClick={next}
              disabled={index >= reviews.length - 2}
              className={`p-4 rounded-2xl bg-blue-600 transition-all ${index >= reviews.length - 2 ? 'opacity-20 cursor-not-allowed' : 'hover:bg-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.4)] text-white'}`}
            >
              <ArrowRight size={24} />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative overflow-hidden rounded-[3rem]">
          <motion.div 
            className="flex"
            animate={{ x: `-${(index / reviews.length) * 100}%` }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            style={{ width: `${(reviews.length / 2) * 100}%` }} // Container width adjusted for 2 cards per view
          >
            {reviews.map((rev) => (
              <div 
                key={rev.id} 
                className="px-3" // Spacing between cards
                style={{ width: `${100 / reviews.length}%` }}
              >
                <motion.div
                  whileHover={{ y: -10 }}
                  className="bg-[#112240]/60 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] border border-white/5 h-full flex flex-col group transition-all hover:border-blue-500/30"
                >
                  <div className="flex items-start justify-between mb-8">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <Quote size={40} className="text-blue-500/10 group-hover:text-blue-500/30 transition-colors" />
                  </div>

                  <p className="text-gray-300 text-xl leading-relaxed mb-10 italic flex-grow">
                    "{rev.comment}"
                  </p>

                  <div className="flex items-center gap-5 pt-8 border-t border-white/5">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-blue-500/20 shadow-lg">
                      <img src={rev.img} alt={rev.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-xl">{rev.name}</h4>
                      <p className="text-blue-400 font-medium tracking-wide">{rev.role}</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-10">
           {[...Array(reviews.length / 2)].map((_, i) => (
             <div 
               key={i}
               className={`h-2 transition-all duration-300 rounded-full ${index / 2 === i ? 'w-8 bg-blue-500' : 'w-2 bg-white/20'}`}
             />
           ))}
        </div>
      </div>
    </section>
  );
}