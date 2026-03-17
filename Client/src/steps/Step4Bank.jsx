import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { FaUniversity, FaHashtag, FaUser, FaCheckCircle } from "react-icons/fa";
import { saveStep4 } from "../services/loanService";

export default function Step4Bank({ next, prev, setFormData }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm();

  const [bankInfo, setBankInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const ifsc = watch("ifsc");

  // Reset verification if the user changes the IFSC after verifying
  useEffect(() => {
    if (bankInfo) {
      setBankInfo(null);
      setValue("bankName", "");
      setValue("branch", "");
    }
  }, [ifsc]);

  const verifyBank = async () => {
    if (!ifsc || errors.ifsc) return alert("Enter a valid IFSC first");

    setLoading(true);
    try {
      const res = await fetch(`https://ifsc.razorpay.com/${ifsc}`);
      if (!res.ok) throw new Error();
      const data = await res.json();

      setBankInfo(data);
      setValue("bankName", data.BANK);
      setValue("branch", data.BRANCH);
    } catch {
      alert("Invalid IFSC Code. Please check and try again.");
      setBankInfo(null);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    const applicationId = localStorage.getItem("applicationId");
    await saveStep4({
      applicationId,
      ...data
    });
    setFormData(prev => ({ ...prev, ...data }));
    next();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <h2 className="text-xl sm:text-2xl font-semibold">Bank Details</h2>

      {/* Account Holder Name */}
      <div className="relative">
        <FaUser className="absolute left-0 top-3 text-gray-400" />
        <input
          placeholder=" "
          {...register("accountHolder", {
            required: "Account holder name required",
            pattern: {
              value: /^[A-Za-z\s]+$/,
              message: "Only alphabets allowed"
            }
          })}
          className="peer w-full border-b-2 border-gray-300 py-2 pl-7 outline-none focus:border-blue-600 transition"
        />
        <label className="absolute left-7 top-2 text-gray-500 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-600 peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:text-sm">
          Account Holder Name
        </label>
        {errors.accountHolder && <p className="text-red-500 text-sm mt-1">{errors.accountHolder.message}</p>}
      </div>

      {/* Account Number */}
      <div className="relative">
        <FaHashtag className="absolute left-0 top-3 text-gray-400" />
        <input
          placeholder=" "
          inputMode="numeric"
          {...register("accountNumber", {
            required: "Account number required",
            minLength: { value: 9, message: "Invalid account number" }
          })}
          onInput={(e) => { e.target.value = e.target.value.replace(/\D/g, ""); }}
          className="peer w-full border-b-2 border-gray-300 py-2 pl-7 outline-none focus:border-blue-600 transition"
        />
        <label className="absolute left-7 top-2 text-gray-500 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-600 peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:text-sm">
          Account Number
        </label>
        {errors.accountNumber && <p className="text-red-500 text-sm mt-1">{errors.accountNumber.message}</p>}
      </div>

      {/* IFSC */}
      <div className="relative">
        <FaUniversity className="absolute left-0 top-3 text-gray-400" />
        <input
          placeholder=" "
          {...register("ifsc", {
            required: "IFSC required",
            pattern: {
              value: /^[A-Z]{4}0[A-Z0-9]{6}$/,
              message: "Invalid IFSC format (e.g. SBIN0123456)"
            }
          })}
          onInput={(e) => { e.target.value = e.target.value.toUpperCase(); }}
          className="peer w-full border-b-2 border-gray-300 py-2 pl-7 outline-none uppercase focus:border-blue-600 transition"
        />
        <label className="absolute left-7 top-2 text-gray-500 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-600 peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:text-sm">
          IFSC Code
        </label>
        {errors.ifsc && <p className="text-red-500 text-sm mt-1">{errors.ifsc.message}</p>}
      </div>

      {/* Verify Button */}
      <button
        type="button"
        onClick={verifyBank}
        className={`w-full sm:w-auto px-6 py-2 rounded-lg transition text-white ${
          bankInfo ? "bg-green-600" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Verifying..." : bankInfo ? "Verified ✓" : "Verify Bank"}
      </button>

      {/* Bank Info Display */}
      {bankInfo && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 animate-in fade-in duration-300">
          <div className="flex items-center gap-2 mb-2 text-green-700 font-bold">
            <FaCheckCircle /> Bank Details Found
          </div>
          <p className="text-sm"><b>Bank:</b> {bankInfo.BANK}</p>
          <p className="text-sm"><b>Branch:</b> {bankInfo.BRANCH}</p>
          <p className="text-sm"><b>City:</b> {bankInfo.CITY}</p>
          {/* Hidden fields to include in react-hook-form data */}
          <input type="hidden" {...register("bankName")} />
          <input type="hidden" {...register("branch")} />
        </div>
      )}

      {/* Bottom Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 sm:justify-between pt-4">
        <button
          type="button"
          onClick={prev}
          className="w-full sm:w-auto px-8 py-3 bg-gray-200 text-gray-700 rounded-xl font-bold"
        >
          Back
        </button>

        <button
          type="submit"
          disabled={!bankInfo}
          className={`w-full sm:w-auto px-8 py-3 rounded-xl font-bold text-white transition-all ${
            bankInfo 
              ? "bg-slate-900 hover:bg-black cursor-pointer shadow-lg" 
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          {bankInfo ? "Continue" : "Verify IFSC to Continue"}
        </button>
      </div>
    </form>
  );
}