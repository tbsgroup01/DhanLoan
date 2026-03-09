
import { FaUser, FaMoneyBill, FaUniversity, FaCheck } from "react-icons/fa";

const Stepper = ({ step }) => {

  const steps = [
    { id: 1, icon: <FaUser />, label: "Identity" },
    { id: 2, icon: <FaUser />, label: "Personal" },
    { id: 3, icon: <FaMoneyBill />, label: "Loan" },
    { id: 4, icon: <FaUniversity />, label: "Bank" },
    { id: 5, icon: <FaCheck />, label: "Submit" }
  ];

  const progressWidth = ((step - 1) / (steps.length - 1)) * 100;

  return (

    <div className="relative mb-12">

      {/* Custom Pulse Animation */}
      <style>
        {`
        @keyframes stepPulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        `}
      </style>

      {/* Background line */}
      <div className="absolute top-6 left-0 w-full h-[3px] bg-gray-200"></div>

      {/* Progress line */}
      <div
        className="absolute top-6 left-0 h-[3px] bg-blue-600 transition-all duration-500 ease-in-out"
        style={{ width: `${progressWidth}%` }}
      />

      <div className="flex justify-between relative z-10">

        {steps.map((item) => {

          const active = step >= item.id;
          const current = step === item.id;

          return (

            <div key={item.id} className="flex flex-col items-center w-full">

              {/* Circle */}
              <div
                className={`
                w-12 h-12 flex items-center justify-center rounded-full
                border-2 transition-all duration-300 ease-in-out
                ${active
                  ? "bg-blue-600 text-white border-blue-600 shadow-lg"
                  : "bg-white text-gray-400 border-gray-300"}
                ${current ? "animate-[stepPulse_1s_ease-in-out_infinite]" : ""}
                `}
              >

                {step > item.id ? (
                  <FaCheck className="text-sm" />
                ) : (
                  item.icon
                )}

              </div>

              {/* Label */}
              <p
                className={`
                text-sm mt-3 transition-all duration-300
                ${active
                  ? "text-blue-600 font-medium"
                  : "text-gray-400"}
                `}
              >
                {item.label}
              </p>

            </div>

          );

        })}

      </div>

    </div>

  );
};

export default Stepper;

