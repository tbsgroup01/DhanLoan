import React from "react";
import { motion } from "framer-motion";

import BobIcon from "../assets/bob.png";
import CentralBankIcon from "../assets/central.png";
import BajajIcon from "../assets/bajaj.png";
import KotakIcon from "../assets/kotak.png";
import ICICIIcon from "../assets/icici.png";

const partners = [
  { name: "Bank of Baroda", logo: BobIcon },
  { name: "Central Bank", logo: CentralBankIcon },
  { name: "Bajaj Finserv", logo: BajajIcon },
  { name: "Kotak Mahindra", logo: KotakIcon },
  { name: "ICICI Bank", logo: ICICIIcon },
];

export default function PartnerMarquee() {
  // Triple the array to ensure seamless looping without gaps
  const duplicatedPartners = [...partners, ...partners, ...partners];

  return (
    <section className="py-24 bg-[#020617] overflow-hidden relative">
      {/* Dynamic Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center relative z-10">
        <h2 className="text-blue-500 font-extrabold tracking-[0.3em] uppercase text-[10px] md:text-xs mb-4">
          Trusted Institutional Network
        </h2>
        <h3 className="text-white text-2xl md:text-3xl font-bold tracking-tight opacity-90">
          Our Strategic Banking Partners
        </h3>
        <div className="mt-6 w-24 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto" />
      </div>

      <div className="relative flex items-center overflow-hidden">
        {/* Premium Edge Fades - Increased width for smoother transition */}
        <div className="absolute inset-y-0 left-0 w-40 md:w-80 bg-gradient-to-r from-[#020617] via-[#020617]/90 to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-40 md:w-80 bg-gradient-to-l from-[#020617] via-[#020617]/90 to-transparent z-20 pointer-events-none" />

        <motion.div
          className="flex whitespace-nowrap gap-16 md:gap-32 py-4"
          animate={{ x: ["0%", "-33.33%"] }}
          transition={{
            duration: 40, 
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {duplicatedPartners.map((partner, idx) => (
            <div
              key={idx}
              className="group flex items-center justify-center min-w-[120px] md:min-w-[180px] transition-all duration-500"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-9 md:h-14 w-auto object-contain transition-all duration-500 
                           grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 
                           scale-100 group-hover:scale-110"
                style={{
                  /* Standard color behavior: subtle brightness boost to pop against dark background */
                  filter: "brightness(1.1) contrast(1.1)",
                }}
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Structured Bottom Border */}
      <div className="mt-12 max-w-4xl mx-auto h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
    </section>
  );
}