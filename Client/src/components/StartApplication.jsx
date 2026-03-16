import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { startApplication } from "../services/loanService";
import { ShieldCheck, ArrowLeft, Smartphone } from "lucide-react";

const StartApplication = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
  });

  const [step, setStep] = useState(1); // Step 1: Form, Step 2: OTP
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const DUMMY_OTP = "123456";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleInitialSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call to send OTP
    setTimeout(() => {
      setLoading(false);
      setStep(2);
    }, 1000);
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (otp === DUMMY_OTP) {
      try {
        setLoading(true);
        const res = await startApplication(form);
        const applicationId = res.applicationId;

        localStorage.setItem("applicationId", applicationId);
        localStorage.setItem("name", form.name);
        localStorage.setItem("mobile", form.mobile);
        localStorage.setItem("email", form.email);


        navigate("/apply-loan");

        
      } catch (error) {
        console.error(error);
        alert("Something went wrong");
      } finally {
        setLoading(false);
      }
    } else {
      alert("Invalid OTP! Please use 123456");
    }
  };

  return (
    <div className="w-full sm:max-w-md rounded-2xl shadow-2xl p-8">
      {step === 1 ? (
        <>
          <div className="flex items-center gap-3 mb-8">
            <ShieldCheck className="text-emerald-500" size={28} />
            <span className="font-bold text-xl text-white tracking-tight">
              Secure Application
            </span>
          </div>

          <form onSubmit={handleInitialSubmit} className="space-y-8">
            <div className="group">
              <label className="block text-[10px] font-bold text-white uppercase tracking-[0.2em] mb-1 ml-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                className="w-full px-4 py-3 border-b-2 text-white border-white/10 bg-transparent outline-none focus:border-blue-500 transition-all"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="group">
              <label className="block text-[10px] font-bold text-white uppercase tracking-[0.2em] mb-1 ml-1">
                Mobile Number
              </label>
              <input
                type="tel"
                name="mobile"
                className="w-full px-4 py-3 border-b-2 text-white border-white/10 bg-transparent outline-none focus:border-blue-500 transition-all"
                value={form.mobile}
                onChange={handleChange}
                required
              />
            </div>

            <div className="group">
              <label className="block text-[10px] font-bold text-white uppercase tracking-[0.2em] mb-1 ml-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                className="w-full px-4 py-3 border-b-2 text-white border-white/10 bg-transparent outline-none focus:border-blue-500 transition-all"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 px-6 rounded-xl font-bold text-white shadow-lg transition-all duration-200 
                ${loading ? "bg-slate-600" : "bg-blue-600 hover:bg-blue-700 active:scale-[0.98]"}`}
            >
              {loading ? "Sending OTP..." : "Get Started"}
            </button>
          </form>
        </>
      ) : (
        <div className="space-y-6">
          <button
            onClick={() => setStep(1)}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm"
          >
            <ArrowLeft size={16} /> Edit Details
          </button>

          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Smartphone className="text-blue-500" size={32} />
            </div>
            <h3 className="text-xl font-bold text-white">Verify Mobile</h3>
            <p className="text-slate-400 text-sm mt-2">
              Enter the 6-digit code sent to <br />
              <span className="text-white font-medium">+91 {form.mobile}</span>
            </p>
          </div>

          <form onSubmit={handleVerifyOtp} className="space-y-6">
            <input
              type="text"
              maxLength="6"
              placeholder="0 0 0 0 0 0"
              className="w-full bg-white/5 border-2 border-white/10 rounded-xl py-4 text-center text-2xl font-black tracking-[0.5em] text-white focus:border-blue-500 outline-none transition-all"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold shadow-lg shadow-emerald-900/20 transition-all"
            >
              {loading ? "Verifying..." : "Verify & Continue"}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500">
            Didn't receive code?{" "}
            <button className="text-blue-400 font-bold hover:underline">
              Resend
            </button>
          </p>
        </div>
      )}

      <p className="text-center text-[11px] font-medium text-slate-400 mt-8 uppercase tracking-widest">
        End-to-End Encrypted Secure Connection
      </p>
    </div>
  );
};

export default StartApplication;
