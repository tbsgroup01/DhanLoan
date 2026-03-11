import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Quote, Star, ArrowLeft, ArrowRight } from "lucide-react";

const reviews = [
  { id: 1, name: "Pusal Enum", role: "Marketing Executive", comment: "The instant approval feature saved my business during a cash flow crunch. Truly seamless.", rating: 5, img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" },
  { id: 2, name: "Spark Bones", role: "Product Designer", comment: "Minimal documentation and digital verification took less than 5 minutes. Best experience ever.", rating: 5, img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka" },
  { id: 3, name: "Rahul Sharma", role: "Business Owner", comment: "No hidden charges, everything was clear. Truly the 'Asli Potli' of happiness for my family.", rating: 5, img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul" },
  { id: 4, name: "Sarah Jenkins", role: "Financial Analyst", comment: "I appreciate their risk assessment and fast processing. Highly secure and reliable platform.", rating: 5, img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" }
];

export default function PremiumTestimonials() {

  const [index, setIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(2);

  // detect screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setCardsPerView(1);
      } else {
        setCardsPerView(2);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const next = () => {
    if (index < reviews.length - cardsPerView) {
      setIndex(index + cardsPerView);
    }
  };

  const prev = () => {
    if (index > 0) {
      setIndex(index - cardsPerView);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-[#0a192f] relative overflow-hidden">

      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 md:mb-16 gap-6">

          <div className="text-center md:text-left">
            <h2 className="text-white text-3xl md:text-5xl font-black mb-4">
              Trusted by{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                Thousands
              </span>
            </h2>
            <p className="text-gray-400 text-base md:text-lg">
              Real stories from our valued members
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={prev}
              disabled={index === 0}
              className="p-3 md:p-4 rounded-xl md:rounded-2xl border border-white/10 text-white hover:bg-white/10 disabled:opacity-30"
            >
              <ArrowLeft size={22} />
            </button>

            <button
              onClick={next}
              disabled={index >= reviews.length - cardsPerView}
              className="p-3 md:p-4 rounded-xl md:rounded-2xl bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-30"
            >
              <ArrowRight size={22} />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative overflow-hidden">

          <motion.div
            className="flex"
            animate={{ x: `-${index * (100 / cardsPerView)}%` }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          >

            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="px-3"
                style={{ width: `${100 / cardsPerView}%` }}
              >

                <motion.div
                  whileHover={{ y: -8 }}
                  className="bg-[#112240]/60 backdrop-blur-xl p-6 md:p-10 rounded-[2rem] border border-white/5 h-full flex flex-col hover:border-blue-500/30 transition-all"
                >

                  {/* rating */}
                  <div className="flex justify-between mb-6">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <Quote size={34} className="text-blue-500/20" />
                  </div>

                  {/* comment */}
                  <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-8 italic flex-grow">
                    "{rev.comment}"
                  </p>

                  {/* user */}
                  <div className="flex items-center gap-4 pt-6 border-t border-white/5">

                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl overflow-hidden border border-blue-500/20">
                      <img src={rev.img} alt={rev.name} className="w-full h-full object-cover"/>
                    </div>

                    <div>
                      <h4 className="text-white font-bold text-base md:text-lg">
                        {rev.name}
                      </h4>
                      <p className="text-blue-400 text-sm">{rev.role}</p>
                    </div>

                  </div>

                </motion.div>

              </div>
            ))}

          </motion.div>

        </div>

      </div>
    </section>
  );
}