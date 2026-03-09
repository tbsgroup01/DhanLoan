import { useState } from "react";
import Stepper from "../components/Stepper";

import Step1Identity from "../steps/Step1Identity";
import Step2Personal from "../steps/Step2Personal";
import Step3Loan from "../steps/Step3Loan";
import Step4Bank from "../steps/Step4Bank";
import Step5Submit from "../steps/Step5Submit";

export default function ApplyLoan() {

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const next = () => setStep((prev) => prev + 1);
  const prev = () => setStep((prev) => prev - 1);

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">

      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6 sm:p-8">

        <Stepper step={step} />

        <div
          key={step}
          className="mt-6 transition-all duration-300"
        >

          {step === 1 && (
            <Step1Identity
              next={next}
              setFormData={setFormData}
            />
          )}

          {step === 2 && (
            <Step2Personal
              next={next}
              prev={prev}
              setFormData={setFormData}
            />
          )}

          {step === 3 && (
            <Step3Loan
              next={next}
              prev={prev}
              setFormData={setFormData}
            />
          )}

          {step === 4 && (
            <Step4Bank
              next={next}
              prev={prev}
              setFormData={setFormData}
            />
          )}

          {step === 5 && (
            <Step5Submit formData={formData} />
          )}

        </div>

      </div>

    </div>
  );
}