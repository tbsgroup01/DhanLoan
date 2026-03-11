import React from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiGlobe, FiAward, FiCheckCircle } from 'react-icons/fi';

const AboutHero = () => {
  return (
    <section className="relative py-24 bg-black overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-yellow-500/5 rounded-full blur-[120px] -translate-y-1/2 -z-10" />

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Image with Floating Elements */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative z-10 rounded-[3rem] overflow-hidden border border-white/10 group">
              <img 
                src="https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&w=800&q=80" 
                alt="Our Team" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            </div>

            {/* Floating Experience Card */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute -bottom-10 -right-6 md:right-10 z-20 bg-yellow-500 text-black p-8 rounded-[2rem] shadow-2xl"
            >
              <p className="text-5xl font-black leading-none">12+</p>
              <p className="text-sm font-bold uppercase tracking-widest mt-2">Years of<br/>Excellence</p>
            </motion.div>
          </motion.div>

          {/* Right Side: Content & Details */}
          <div className="space-y-10">
            <div className="space-y-4">
              <motion.span 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-yellow-500 font-mono text-sm tracking-[0.3em] uppercase"
              >
                Beyond the Numbers
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tighter"
              >
                Built for the <br /> 
                <span className="text-blue-500">Bold & Ambitious.</span>
              </motion.h2>
            </div>

            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-xl text-slate-400 leading-relaxed border-l-2 border-white/10 pl-8"
            >
              We founded Premium Finance on a simple defiance: that capital should be a bridge, not a barrier. Today, we empower thousands of visionaries with hyper-fluid liquidity.
            </motion.p>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DetailItem 
                icon={<FiGlobe className="text-yellow-500" />} 
                title="Global reach" 
                desc="Operating across 14 financial hubs." 
              />
              <DetailItem 
                icon={<FiUsers className="text-yellow-500" />} 
                title="Human-Centric" 
                desc="Real experts, not just algorithms." 
              />
              <DetailItem 
                icon={<FiAward className="text-yellow-500" />} 
                title="Verified Trust" 
                desc="A+ Rating by Global Finance Org." 
              />
              <DetailItem 
                icon={<FiCheckCircle className="text-yellow-500" />} 
                title="Zero hidden fees" 
                desc="What you see is what you pay." 
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

const DetailItem = ({ icon, title, desc }) => (
  <motion.div 
    whileHover={{ x: 5 }}
    className="flex gap-4 p-4 rounded-2xl hover:bg-white/5 transition-colors group"
  >
    <div className="mt-1 text-2xl group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <div>
      <h4 className="font-bold text-white text-lg tracking-tight">{title}</h4>
      <p className="text-slate-500 text-sm leading-snug mt-1">{desc}</p>
    </div>
  </motion.div>
);

export default AboutHero;