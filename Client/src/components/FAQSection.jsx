import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle, MessageCircle, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const faqs = [
  {
    question: "What are the eligibility criteria for a personal loan?",
    answer: "To apply, you should be a resident of India, aged between 21 and 60 years, with a stable source of income. We consider both salaried individuals and self-employed professionals."
  },
  {
    question: "How long does the loan approval process take?",
    answer: "Our AI-driven verification system processes applications in real-time. Most users receive an approval decision within 5 to 15 minutes of submitting their digital documents."
  },
  {
    question: "Are there any hidden charges or processing fees?",
    answer: "Transparency is our core value. All applicable fees, including processing charges and interest rates, are clearly disclosed upfront during the application process. No hidden surprises."
  },
  {
    question: "Can I apply for a loan with a low credit score?",
    answer: "While a higher credit score is beneficial, we use a holistic approach to evaluate applications. We look at multiple data points to provide financial assistance even if your credit history is limited."
  },
  {
    question: "Is it possible to foreclose my loan before the tenure ends?",
    answer: "Yes, you can foreclose your loan at any time. We offer flexible repayment options to ensure you can manage your finances without unnecessary stress or heavy penalties."
  }
];

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section className="py-24 bg-[#f8fafc] relative overflow-hidden">
      {/* Soft Background Accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[120px] -z-10"></div>

      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-blue-100 text-blue-600 rounded-full text-xs font-bold uppercase tracking-widest mb-6 shadow-sm"
          >
            <HelpCircle size={14} /> Support Center
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
            Frequently Asked <span className="text-blue-600">Questions</span>
          </h2>
          <p className="text-slate-500 text-lg font-medium">Everything you need to know about our lending process.</p>
        </div>

        <div className="grid gap-4">
          {faqs.map((faq, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`group border rounded-2xl transition-all duration-300 ${
                activeIndex === idx 
                ? 'border-blue-500 bg-white shadow-xl shadow-blue-100' 
                : 'border-slate-200 bg-white/50 hover:bg-white hover:border-blue-300 shadow-sm'
              }`}
            >
              <button
                onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className={`text-lg font-bold tracking-tight ${activeIndex === idx ? 'text-blue-600' : 'text-slate-800'}`}>
                  {faq.question}
                </span>
                <div className={`shrink-0 ml-4 p-1.5 rounded-xl transition-all duration-300 ${
                  activeIndex === idx ? 'bg-blue-600 text-white rotate-180' : 'bg-slate-100 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600'
                }`}>
                  {activeIndex === idx ? <Minus size={18} /> : <Plus size={18} />}
                </div>
              </button>

              <AnimatePresence>
                {activeIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  >
                    <div className="px-6 pb-6 text-slate-600 leading-relaxed font-medium border-t border-slate-50 pt-5">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Professional Support Footer */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-16 p-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2.5rem] shadow-2xl shadow-blue-200"
        >
          <div className="bg-white rounded-[2.4rem] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-slate-900 mb-1">Still have questions?</h3>
              <p className="text-slate-500 font-medium">Our financial experts are available 24/7 to assist you.</p>
            </div>
            <Link to="/contact" className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors duration-300">
              Contact Support <ChevronRight size={16} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}