import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaCreditCard,
  FaQrcode,
  FaUpload,
  FaCheckCircle,
  FaShieldAlt,
  FaUniversity,
  FaArrowLeft,
  FaLock,
} from "react-icons/fa";

import { paymentSuccess } from "../services/loanService";
import { getPaymentSettings } from "../services/paymentService";

export default function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [method, setMethod] = useState("razorpay");
  const [loading, setLoading] = useState(false);

  const [utr, setUtr] = useState("");
  const [screenshot, setScreenshot] = useState(null);
  const [preview, setPreview] = useState(null);

  const [paymentSettings, setPaymentSettings] = useState(null);

  /* ===============================
      LOAD PAYMENT SETTINGS
  =============================== */
  useEffect(() => {
    const loadSettings = async () => {
      const data = await getPaymentSettings();
      setPaymentSettings(data);
    };
    loadSettings();
  }, []);

  if (!paymentSettings) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-slate-500 font-medium animate-pulse tracking-widest uppercase text-[10px]">Establishing Secure Connection</p>
      </div>
    );
  }

  const processingFee = paymentSettings.processing_fee || 0;

  const getQRUrl = () => {
    if (!paymentSettings?.qr_image) return null;
    const file = paymentSettings.qr_image.split("/").pop();
    return `http://localhost:3000/payment-config/${file}`;
  };

  /* ===============================
      LOGIC HANDLERS (UNTOUCHED)
  =============================== */
  const handleRazorpayPayment = async () => {
    if (loading) return;
    try {
      setLoading(true);
      const applicationId = localStorage.getItem("applicationId");
      const options = {
        key: paymentSettings.razorpay_key,
        amount: processingFee * 100,
        currency: "INR",
        name: "Loan Services",
        description: "Loan Processing Fee",
        handler: async (response) => {
          try {
            const res = await paymentSuccess({
              applicationId,
              razorpay_payment_id: response.razorpay_payment_id,
            });
            localStorage.setItem("loanId", res.loanId);
            navigate("/status");
          } catch {
            alert("Payment verification failed");
          }
        },
        theme: { color: "#4f46e5" },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch {
      alert("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  const handleScreenshotUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setScreenshot(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleManualSubmit = async () => {
    if (!utr) { alert("Enter transaction ID / UTR"); return; }
    if (!screenshot) { alert("Upload payment screenshot"); return; }
    setLoading(true);
    try {
      const applicationId = localStorage.getItem("applicationId");
      const res = await paymentSuccess(applicationId);
      localStorage.setItem("loanId", res.loanId);
      navigate("/status");
    } catch {
      alert("Payment submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: ORDER SUMMARY */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-12">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors font-bold text-xs uppercase tracking-widest mb-8"
          >
            <FaArrowLeft size={10} /> Go Back
          </button>

          <div className="space-y-2">
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Secure <br/>Checkout.</h1>
            <p className="text-slate-500 text-sm leading-relaxed">Complete your processing fee to finalize the application.</p>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-6">
            <div className="space-y-4">
               <div className="flex justify-between items-center text-sm font-bold uppercase tracking-tight">
                  <span className="text-slate-400">Processing Fee</span>
                  <span className="text-slate-900">₹{processingFee}.00</span>
               </div>
               <div className="flex justify-between items-center text-sm font-bold uppercase tracking-tight">
                  <span className="text-slate-400">Security & GST</span>
                  <span className="text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-lg italic">Included</span>
               </div>
            </div>
            
            <div className="pt-6 border-t border-dashed border-slate-200 flex justify-between items-end">
               <span className="font-black text-slate-900 uppercase tracking-tighter text-xl italic">Total</span>
               <span className="text-4xl font-black text-indigo-600 tracking-tighter">₹{processingFee}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 p-5 bg-white rounded-3xl border border-slate-100 shadow-sm">
             <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                <FaShieldAlt />
             </div>
             <div>
               <p className="text-[10px] text-slate-800 font-black uppercase tracking-widest">Encrypted Payment</p>
               <p className="text-[10px] text-slate-400 font-bold leading-tight">Your data is protected by industry standard SSL encryption.</p>
             </div>
          </div>
        </div>

        {/* RIGHT COLUMN: PAYMENT METHODS & FORMS */}
        <div className="lg:col-span-7 bg-white rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.06)] border border-slate-100 overflow-hidden">
          <div className="p-8 md:p-14">
            <h2 className="text-xl font-black mb-8 flex items-center gap-4 text-slate-800 uppercase tracking-tight">
               Payment Method
               <span className="h-1 w-12 bg-indigo-600 rounded-full"></span>
            </h2>

            <div className="grid grid-cols-1 gap-3 mb-12">
              <MethodCard
                active={method === "razorpay"}
                icon={<FaCreditCard />}
                label="Razorpay Checkout"
                sub="Cards, UPI, Wallets"
                onClick={() => setMethod("razorpay")}
              />
              <MethodCard
                active={method === "qr"}
                icon={<FaQrcode />}
                label="Scan QR Code"
                sub="GPay, PhonePe, Paytm"
                onClick={() => setMethod("qr")}
              />
              <MethodCard
                active={method === "bank"}
                icon={<FaUniversity />}
                label="Bank Transfer"
                sub="IMPS, NEFT, RTGS"
                onClick={() => setMethod("bank")}
              />
            </div>

            {/* DYNAMIC FORMS AREA */}
            <div className="min-h-[300px] animate-in fade-in slide-in-from-bottom-4 duration-500">
              {method === "razorpay" && (
                <div className="space-y-8">
                   <div className="bg-slate-50 p-10 rounded-[2.5rem] text-center border-2 border-dashed border-slate-200">
                      <p className="text-slate-500 font-bold text-sm tracking-tight">Clicking below will launch the secure Razorpay payment gateway.</p>
                   </div>
                   <button
                    disabled={loading}
                    onClick={handleRazorpayPayment}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-6 rounded-2xl font-black text-lg shadow-2xl shadow-indigo-100 transition-all hover:-translate-y-1 active:scale-95 disabled:opacity-50"
                  >
                    {loading ? "OPENING GATEWAY..." : `PROCEED TO PAY ₹${processingFee}`}
                  </button>
                </div>
              )}

              {method === "qr" && (
                <div className="space-y-10">
                  {getQRUrl() && (
                    <div className="flex flex-col items-center">
                      <div className="p-4 bg-white border-2 border-slate-100 rounded-[2.5rem] shadow-xl">
                        <img src={getQRUrl()} className="w-52 h-52 object-contain" alt="QR" />
                      </div>
                      <p className="mt-4 text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Scan and Pay Amount</p>
                    </div>
                  )}
                  <ManualSectionUI utr={utr} setUtr={setUtr} preview={preview} upload={handleScreenshotUpload} submit={handleManualSubmit} loading={loading} />
                </div>
              )}

              {method === "bank" && (
                <div className="space-y-10">
                  <div className="bg-slate-900 p-10 rounded-[2.5rem] text-white space-y-5 shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-700">
                       <FaUniversity size={100} />
                    </div>
                    <Detail label="Beneficiary" value={paymentSettings.account_name} />
                    <Detail label="Acc Number" value={paymentSettings.account_number} />
                    <Detail label="IFSC Code" value={paymentSettings.ifsc} />
                    <Detail label="Bank Name" value={paymentSettings.bank_name} />
                  </div>
                  <ManualSectionUI utr={utr} setUtr={setUtr} preview={preview} upload={handleScreenshotUpload} submit={handleManualSubmit} loading={loading} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===============================
    REUSABLE COMPONENTS
================================ */

function MethodCard({ active, icon, label, sub, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`group flex items-center justify-between p-6 rounded-[1.8rem] cursor-pointer transition-all duration-300 border-2
      ${active ? "border-indigo-600 bg-indigo-50/50 shadow-md" : "border-slate-100 bg-white hover:border-indigo-200"}`}
    >
      <div className="flex items-center gap-5">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${active ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600'}`}>
          {icon}
        </div>
        <div>
          <h4 className="font-black text-sm text-slate-800 leading-tight uppercase tracking-tighter">{label}</h4>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{sub}</p>
        </div>
      </div>
      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${active ? 'border-indigo-600 bg-indigo-600' : 'border-slate-200 group-hover:border-indigo-200'}`}>
         {active && <div className="w-2 h-2 bg-white rounded-full"></div>}
      </div>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div className="flex justify-between items-center border-b border-white/10 pb-3 relative z-10">
      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</span>
      <span className="font-bold text-sm tracking-wide">{value || "---"}</span>
    </div>
  );
}

function ManualSectionUI({ utr, setUtr, preview, upload, submit, loading }) {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 italic">Transaction Reference (UTR)</label>
        <input
          type="text"
          placeholder="Enter 12-digit reference ID"
          value={utr}
          onChange={(e) => setUtr(e.target.value)}
          className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-5 outline-none focus:border-indigo-600 focus:bg-white transition-all font-mono text-sm shadow-inner"
        />
      </div>

      <label className="border-3 border-dashed border-slate-200 p-10 rounded-[2.5rem] cursor-pointer flex flex-col items-center hover:bg-slate-50 transition-all group">
        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-xl mb-4 group-hover:scale-110 transition-transform">
           <FaUpload className="text-slate-300 group-hover:text-indigo-600 transition-colors" />
        </div>
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Upload Payment Screenshot</span>
        <input type="file" className="hidden" accept="image/*" onChange={upload} />
      </label>

      {preview && (
        <div className="flex items-center gap-5 p-6 bg-emerald-50 rounded-[2rem] border border-emerald-100 animate-in zoom-in-95">
          <img src={preview} className="w-20 h-20 rounded-2xl object-cover shadow-xl border-4 border-white" />
          <div>
            <p className="text-sm font-black text-emerald-900 tracking-tight flex items-center gap-2 italic">
               <FaCheckCircle /> Document Attached
            </p>
            <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest opacity-60">Ready to finalize</p>
          </div>
        </div>
      )}

      <button
        disabled={loading}
        onClick={submit}
        className="w-full bg-slate-900 hover:bg-black text-white py-6 rounded-[1.8rem] font-black text-lg transition-all shadow-2xl active:scale-95 disabled:opacity-50 uppercase tracking-tighter"
      >
        {loading ? "Processing Submission..." : "Complete Submission"}
      </button>
      
      <div className="flex items-center justify-center gap-2 text-slate-400">
         <FaLock size={8} />
         <span className="text-[9px] font-bold uppercase tracking-widest">Secured by industry standard encryption</span>
      </div>
    </div>
  );
}