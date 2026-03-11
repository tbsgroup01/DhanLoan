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
  // We double the array to create a seamless infinite loop
  const duplicatedPartners = [...partners, ...partners];

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
        <h2 className="text-blue-600 font-bold tracking-[0.2em] uppercase text-sm mb-2">
          Our Partners
        </h2>
        <div className="w-20 h-1 bg-blue-600 mx-auto mt-4 rounded-full" />
      </div>

      {/* Marquee Container */}
      <div className="relative flex overflow-hidden group">
        {/* Left & Right Gradient Fades for a "Professional" look */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex whitespace-nowrap gap-16 md:gap-24 py-4"
          animate={{
            x: ["0%", "-50%"], // Moves half the total width (the original set)
          }}
          transition={{
            duration: 25, // Adjust speed here (higher = slower)
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {duplicatedPartners.map((partner, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center min-w-[150px] md:min-w-[200px] grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-10 md:h-12 w-auto object-contain"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
