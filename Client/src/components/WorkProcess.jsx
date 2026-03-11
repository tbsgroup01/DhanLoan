import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Search, Banknote, ArrowRight } from 'lucide-react';

export default function WorkProcess() {
  const steps = [
    {
      icon: <FileText size={32} />,
      title: "Apply",
      desc: "Fill the simple digital form in 2 minutes.",
      color: "from-blue-400 to-blue-600",
      delay: 0.2
    },
    {
      icon: <Search size={32} />,
      title: "Review",
      desc: "Our AI & experts verify your documents instantly.",
      color: "from-indigo-400 to-indigo-600",
      delay: 0.4
    },
    {
      icon: <Banknote size={32} />,
      title: "Get Money",
      desc: "Funds credited to your bank account within hours.",
      color: "from-emerald-400 to-emerald-600",
      delay: 0.6
    }
  ];

  return (
    <section className="py-24 bg-[#0a192f] relative overflow-hidden">
      {/* Background Subtle Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-blue-400 font-bold tracking-[0.3em] uppercase text-sm"
          >
            Simple 3-Step Process
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-white mt-4"
          >
            How to get your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Asli Potli</span>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent -translate-y-12"></div>

          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: step.delay, duration: 0.5 }}
              viewport={{ once: true }}
              className="relative group"
            >
              {/* Card Container */}
              <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-8 rounded-[2rem] hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 border-b-4 border-b-transparent hover:border-b-blue-500">
                
                {/* Step Number Badge */}
                <div className={`absolute -top-4 -right-4 w-12 h-12 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center font-black text-white shadow-lg shadow-blue-500/20`}>
                  0{idx + 1}
                </div>

                {/* Icon Wrapper */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-500 shadow-xl`}>
                  {step.icon}
                </div>

                <h3 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
                  {step.title} 
                  {idx < 2 && <ArrowRight className="hidden md:block text-blue-500/50 group-hover:translate-x-2 transition-transform" size={20} />}
                </h3>
                
                <p className="text-gray-400 font-medium leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {/* Decorative Glow */}
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-emerald-500/20 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA for Process */}
        
      </div>
    </section>
  );
}