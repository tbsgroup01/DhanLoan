import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Stepper from "../components/Stepper";

import Step1Identity from "../steps/Step1Identity";
import Step2Personal from "../steps/Step2Personal";
import Step3Loan from "../steps/Step3Loan";
import Step4Bank from "../steps/Step4Bank";
import Step5Submit from "../steps/Step5Submit";

export default function ApplyLoan() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for back

  const next = () => {
    setDirection(1);
    setStep((prev) => prev + 1);
  };
  
  const prev = () => {
    setDirection(-1);
    setStep((prev) => prev - 1);
  };

  // Animation variants for the steps
  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 50 : -50,
      opacity: 0,
    }),
  };

  return (
    <div id="apply-loan" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#fdfeff] px-4 py-8">
      {/* Animated Background Gradients */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0] 
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-blue-100/40 to-indigo-200/30 blur-[100px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90] 
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-tr from-rose-100/30 to-orange-100/30 blur-[100px]" 
        />
      </div>

      {/* Main Form Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-2xl bg-white/70 backdrop-blur-xl rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white p-6 sm:p-12"
      >
        <Stepper step={step} />

        <div className="relative mt-10 overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
            >
              {step === 1 && (
                <Step1Identity next={next} setFormData={setFormData} />
              )}

              {step === 2 && (
                <Step2Personal next={next} prev={prev} setFormData={setFormData} />
              )}

              {step === 3 && (
                <Step3Loan next={next} prev={prev} setFormData={setFormData} />
              )}

              {step === 4 && (
                <Step4Bank next={next} prev={prev} setFormData={setFormData} />
              )}

              {step === 5 && <Step5Submit formData={formData} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}