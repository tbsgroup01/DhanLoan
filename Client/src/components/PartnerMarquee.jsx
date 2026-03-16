import React from "react";
import { motion } from "framer-motion";

import BobIcon from "../assets/bob.png";
import CentralBankIcon from "../assets/central.png";
import BajajIcon from "../assets/bajaj.png";
import KotakIcon from "../assets/kotak.png";
import ICICIIcon from "../assets/icici.png";

// Replace these with your actual logo imports or URLs
const partners = [
  { name: "Bank of India", logo: BobIcon },
  { name: "Central Bank", logo: CentralBankIcon },
  { name: "Bajaj Finserv", logo: BajajIcon },
  { name: "Kotak Mahindra", logo: KotakIcon },
  { name: "ICICI Bank", logo: ICICIIcon },
  
];


export default function PartnerMarquee() {
  const duplicatedPartners = [...partners, ...partners, ...partners];

  return (
    <section className="py-20 bg-[#020617] overflow-hidden relative">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center relative z-10">
        <h2 className="text-[#4E3AF6] font-bold tracking-[0.4em] uppercase text-[10px] md:text-xs mb-3">
          Institutional Partners
        </h2>
        <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent mx-auto" />
      </div>

      <div className="relative flex overflow-hidden group">
        {/* Edge Fades - Matched to #020617 */}
        <div className="absolute inset-y-0 left-0 w-32 md:w-72 bg-gradient-to-r from-[#020617] via-[#020617]/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 md:w-72 bg-gradient-to-l from-[#020617] via-[#020617]/80 to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex whitespace-nowrap gap-20 md:gap-40 py-10"
          animate={{ x: ["0%", "-33.33%"] }}
          transition={{
            duration: 35, // Slightly slower for a smoother, high-end feel
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {duplicatedPartners.map((partner, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center min-w-[140px] md:min-w-[200px]"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-8 md:h-12 w-auto object-contain transition-all duration-700 opacity-60 hover:opacity-100 scale-95 hover:scale-105"
                style={{
                  /* Forces logo to pure white and adds a crisp white glow */
                  filter: "brightness(0) invert(1) drop-shadow(0px 0px 15px rgba(255, 255, 255, 0.4))",
                }}
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Subtle bottom divider for structure */}
      <div className="absolute bottom-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </section>
  );
}