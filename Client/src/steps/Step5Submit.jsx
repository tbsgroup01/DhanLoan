import { useState } from "react";
import {
  FaUser,
  FaMoneyBillWave,
  FaUniversity,
  FaCheckCircle,
  FaArrowRight,
  FaInfoCircle,
  FaTimes,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

export default function Step5Submit({ formData }) {
  const [showChargeModal, setShowChargeModal] = useState(false);
  const navigate = useNavigate();
  const processingFee = 500;

  const handlePaymentNavigation = () => {
    navigate("/payment", {
      state: { formData }
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="border-b pb-4">
        <h2 className="text-3xl font-black text-slate-800 tracking-tight">
          Review Application
        </h2>
        <p className="text-slate-500 font-medium text-sm">Please verify your details before final submission.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Details */}
        <ReviewCard 
          icon={<FaUser className="text-indigo-600" />} 
          title="Personal Details"
          data={[
            { label: "Full Name", value: formData.name },
            { label: "Mobile", value: formData.mobile },
            { label: "Email", value: formData.email },
          ]}
        />

        {/* Loan Details */}
        <ReviewCard 
          icon={<FaMoneyBillWave className="text-emerald-600" />} 
          title="Loan Requirements"
          data={[
            { label: "Loan Amount", value: `₹${formData.amount}`, highlight: true },
            { label: "Loan Type", value: formData.loanType },
          ]}
        />

        {/* Bank Details */}
        <div className="md:col-span-2">
          <ReviewCard 
            icon={<FaUniversity className="text-blue-600" />} 
            title="Disbursement Bank Account"
            data={[
              { label: "Bank Name", value: formData.bankName },
              { label: "Account Holder", value: formData.accountHolder },
              { label: "Account Number", value: "XXXXXXXX" + (formData.accountNumber?.slice(-4) || "0000") },
            ]}
          />
        </div>
      </div>

      {/* Warning/Info Note */}
      <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl flex gap-3 items-start">
        <FaInfoCircle className="text-amber-500 mt-1 flex-shrink-0" />
        <p className="text-xs text-amber-800 font-medium leading-relaxed">
          By clicking submit, you agree that the information provided is accurate. 
          A small processing fee is required to initiate the verification process.
        </p>
      </div>

      {/* Submit Button */}
      <button
        onClick={() => setShowChargeModal(true)}
        className="w-full bg-slate-900 hover:bg-black text-white py-5 rounded-2xl font-black text-lg transition-all shadow-xl active:scale-[0.98] flex items-center justify-center gap-3 group"
      >
        SUBMIT APPLICATION <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
      </button>

      {/* Modern Processing Charge Modal */}
      {showChargeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"></div>

          {/* Modal Content */}
          <div className="relative bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="bg-indigo-600 p-8 text-center text-white relative">
              <button 
                onClick={() => setShowChargeModal(false)}
                className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
              >
                <FaTimes size={18} />
              </button>
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/20">
                <FaMoneyBillWave size={32} />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tighter">One Last Step</h3>
              <p className="text-indigo-100 text-sm font-medium mt-1">Application Processing Fee</p>
            </div>

            <div className="p-8 text-center space-y-6">
              <div className="space-y-2">
                <p className="text-slate-500 text-sm font-medium">To proceed with your loan verification, a one-time charge is applicable:</p>
                <div className="text-5xl font-black text-slate-900 tracking-tighter">
                  ₹{processingFee}
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl flex items-center justify-center gap-2">
                <FaCheckCircle className="text-emerald-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Secure Payment Gateway</span>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={handlePaymentNavigation}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-black text-lg shadow-lg shadow-indigo-100 transition-all active:scale-95"
                >
                  PAY NOW & SUBMIT
                </button>
                <button
                  onClick={() => setShowChargeModal(false)}
                  className="w-full bg-white text-slate-400 hover:text-slate-600 py-2 rounded-xl font-bold text-sm transition-all"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* --- Reusable Card Component for Review --- */
function ReviewCard({ icon, title, data }) {
  return (
    <div className="bg-white border border-slate-100 rounded-[2rem] p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-5">
        <div className="p-3 bg-slate-50 rounded-2xl">
          {icon}
        </div>
        <h3 className="font-black text-slate-800 text-sm uppercase tracking-tight">{title}</h3>
      </div>
      
      <div className="space-y-4">
        {data.map((item, idx) => (
          <div key={idx} className="flex justify-between items-end border-b border-slate-50 pb-2">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.label}</span>
            <span className={`text-sm font-bold ${item.highlight ? 'text-indigo-600 text-lg' : 'text-slate-700'}`}>
              {item.value || "N/A"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}