import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

import Stepper from "../components/Stepper";

import Step1Identity from "../steps/Step1Identity";
import Step3Loan from "../steps/Step3Loan";
import Step4Bank from "../steps/Step4Bank";
import Step5Submit from "../steps/Step5Submit";

export default function ApplyLoan() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    name: localStorage.getItem("name"),
    mobile: localStorage.getItem("mobile"),
    email: localStorage.getItem("email"),
  });

  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const applicationId = localStorage.getItem("applicationId");

    if (!applicationId) {
      navigate("/");
    }
  }, []);

  const next = () => {
    setDirection(1);
    setStep((prev) => prev + 1);
  };

  const prev = () => {
    setDirection(-1);
    setStep((prev) => prev - 1);
  };

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


    <div className="min-h-screen bg-slate-100 flex items-center justify-center  px-4 py-8">
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-3xl bg-white rounded-3xl shadow-xl p-5"
      >
        <Stepper step={step} />

        <div className="mt-10">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              {step === 1 && (
                <Step1Identity next={next} setFormData={setFormData} />
              )}

              {step === 2 && (
                <Step3Loan next={next} prev={prev} setFormData={setFormData} />
              )}

              {step === 3 && (
                <Step4Bank next={next} prev={prev} setFormData={setFormData} />
              )}

              {step === 4 && <Step5Submit formData={formData} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
