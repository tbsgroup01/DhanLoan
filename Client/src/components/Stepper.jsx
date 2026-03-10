import React from "react";
import { FaUser, FaIdCard, FaMoneyBillWave, FaUniversity, FaCheck } from "react-icons/fa";

const Stepper = ({ step }) => {
  const steps = [
    { id: 1, icon: <FaIdCard />, label: "Identity" },
    { id: 2, icon: <FaUser />, label: "Personal" },
    { id: 3, icon: <FaMoneyBillWave />, label: "Loan" },
    { id: 4, icon: <FaUniversity />, label: "Bank" },
    { id: 5, icon: <FaCheck />, label: "Submit" }
  ];

  const progressWidth = ((step - 1) / (steps.length - 1)) * 100;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-16">
      <div className="relative flex items-center justify-between">
        
        {/* BACKGROUND TRACK (The faint path ahead) */}
        <div className="absolute top-[24px] left-0 w-full h-[2px] bg-slate-100 -translate-y-1/2 rounded-full" />

        {/* PROGRESS LINE (The blue path behind) */}
        <div
          className="absolute top-[24px] left-0 h-[2px] bg-blue-500 -translate-y-1/2 transition-all duration-1000 ease-in-out shadow-[0_0_10px_rgba(59,130,246,0.3)]"
          style={{ width: `${progressWidth}%` }}
        />

        {/* STEPS */}
        {steps.map((item) => {
          const isCompleted = step > item.id;
          const isActive = step === item.id;

          return (
            <div key={item.id} className="relative z-10 flex flex-col items-center">
              
              {/* Icon Container */}
              <div
                className={`
                  w-12 h-12 flex items-center justify-center rounded-2xl
                  transition-all duration-500 border-2 relative
                  ${isCompleted 
                    ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-100" 
                    : isActive 
                    ? "bg-white border-emerald-500 text-emerald-600 scale-125 shadow-[0_10px_20px_-5px_rgba(16,185,129,0.4)]" 
                    : "bg-white border-slate-200 text-slate-400"}
                `}
              >
                {/* Green Pulse: Only for the Active Step */}
                {isActive && (
                  <span className="absolute inset-0 rounded-2xl bg-emerald-400 animate-ping opacity-25"></span>
                )}

                <div className="text-xl">
                  {isCompleted ? <FaCheck className="text-sm" /> : item.icon}
                </div>
              </div>

              {/* Step Labels */}
              <div className="absolute top-16 flex flex-col items-center w-32">
                <span className={`
                  text-[9px] uppercase tracking-[0.2em] font-black mb-1
                  ${isActive ? "text-emerald-600" : isCompleted ? "text-blue-600" : "text-slate-400"}
                `}>
                  Step 0{item.id}
                </span>
                <span className={`
                  text-sm font-bold whitespace-nowrap transition-colors duration-300
                  ${isActive ? "text-slate-900" : isCompleted ? "text-slate-700" : "text-slate-400"}
                `}>
                  {item.label}
                </span>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stepper;