import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaMapPin,
  FaBriefcase,
} from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";

import { saveStep2 } from "../services/loanService";

export default function Step2Personal({ next, prev, setFormData }) {
  const [mobileOTP, setMobileOTP] = useState("");
  const [emailOTP, setEmailOTP] = useState("");

  const [sentMobileOTP, setSentMobileOTP] = useState("");
  const [sentEmailOTP, setSentEmailOTP] = useState("");

  const [mobileVerified, setMobileVerified] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const sendMobileOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    setSentMobileOTP(otp);
    alert("Demo Mobile OTP: " + otp);
  };

  const verifyMobileOTP = () => {
    if (mobileOTP == sentMobileOTP) {
      setMobileVerified(true);
    } else {
      alert("Invalid OTP");
    }
  };

  const sendEmailOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    setSentEmailOTP(otp);
    alert("Demo Email OTP: " + otp);
  };

  const verifyEmailOTP = () => {
    if (emailOTP == sentEmailOTP) {
      setEmailVerified(true);
    } else {
      alert("Invalid OTP");
    }
  };

  const onSubmit = async (data) => {
    const applicationId = localStorage.getItem("applicationId");

    await saveStep2({
      applicationId,
      ...data,
    });

    setFormData((prev) => ({ ...prev, ...data }));

    next();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
      <h2 className="text-2xl font-semibold text-gray-800">Personal Details</h2>

      {/* GRID */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Full Name */}
        <div className="relative">
          <FaUser className="absolute left-0 top-3 text-gray-400" />

          <input
            type="text"
            placeholder=" "
            {...register("name", { required: "Full name is required" })}
            className="peer w-full border-b-2 border-gray-300 py-2 pl-7 outline-none focus:border-blue-600 transition"
          />

          <label
            className="absolute left-7 text-gray-500 transition-all
          top-2
          peer-placeholder-shown:top-2
          peer-placeholder-shown:text-base
          peer-focus:-top-3
          peer-focus:text-sm
          peer-focus:text-blue-600
          peer-[:not(:placeholder-shown)]:-top-3
          peer-[:not(:placeholder-shown)]:text-sm"
          >
            Full Name
          </label>

          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>
        {/* Mobile */}
        <div className="space-y-3">
          <div className="flex gap-3 items-end">
            <div className="relative flex-1">
              <FaPhone className="absolute left-0 top-3 text-gray-400" />

              <input
                type="text"
                maxLength={10}
                placeholder=" "
                {...register("mobile", { required: true })}
                className="peer w-full border-b-2 border-gray-300 py-2 pl-7 outline-none focus:border-blue-600 transition"
              />

              <label
                className="absolute left-7 text-gray-500 transition-all
              top-2
              peer-placeholder-shown:top-2
              peer-focus:-top-3
              peer-focus:text-sm
              peer-valid:-top-3
              peer-valid:text-sm"
              >
                Mobile Number
              </label>
            </div>

            {!mobileVerified && (
              <button
                type="button"
                onClick={sendMobileOTP}
                className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm"
              >
                Send OTP
              </button>
            )}
          </div>

          {!mobileVerified && sentMobileOTP && (
            <div className="flex gap-3">
              <input
                placeholder="Enter OTP"
                value={mobileOTP}
                onChange={(e) => setMobileOTP(e.target.value)}
                className="flex-1 border-b-2 border-gray-300 py-2 outline-none focus:border-blue-600"
              />

              <button
                type="button"
                onClick={verifyMobileOTP}
                className="px-4 py-2 bg-green-600 text-white rounded-md text-sm"
              >
                Verify
              </button>
            </div>
          )}

          {mobileVerified && (
            <p className="text-green-600 text-sm">✔ Mobile Verified</p>
          )}
        </div>

        {/* Occupation */}
        <div className="relative">
          <FaBriefcase className="absolute left-0 top-3 text-gray-400" />

          <select
            {...register("occupation", { required: "Occupation is required" })}
            defaultValue=""
            className="peer w-full border-b-2 border-gray-300 py-2 pl-7 pr-6 outline-none focus:border-blue-600 appearance-none bg-transparent"
          >
            <option value="" disabled hidden></option>

            <option value="student">Student</option>
            <option value="salaried">Salaried</option>
            <option value="self-employed">Self Employed</option>
            <option value="other">Other</option>
          </select>

          {/* Dropdown Arrow */}
          <FaChevronDown className="absolute right-0 top-3 text-gray-400 pointer-events-none" />

          <label
            className="absolute left-7 text-gray-500 transition-all
    top-2
    peer-focus:-top-3
    peer-focus:text-sm
    peer-focus:text-blue-600
    peer-valid:-top-3
    peer-valid:text-sm"
          >
            Occupation
          </label>

          {errors.occupation && (
            <p className="text-red-500 text-sm mt-1">
              {errors.occupation.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-3">
          <div className="flex gap-3 items-end">
            <div className="relative flex-1">
              <FaEnvelope className="absolute left-0 top-3 text-gray-400" />

              <input
                type="email"
                placeholder=" "
                {...register("email", { required: true })}
                className="peer w-full border-b-2 border-gray-300 py-2 pl-7 outline-none focus:border-blue-600 transition"
              />

              <label
                className="absolute left-7 text-gray-500 transition-all
              top-2
              peer-placeholder-shown:top-2
              peer-focus:-top-3
              peer-focus:text-sm
              peer-valid:-top-3
              peer-valid:text-sm"
              >
                Email Address
              </label>
            </div>

            {!emailVerified && (
              <button
                type="button"
                onClick={sendEmailOTP}
                className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm"
              >
                Send OTP
              </button>
            )}
          </div>

          {!emailVerified && sentEmailOTP && (
            <div className="flex gap-3">
              <input
                placeholder="Enter OTP"
                value={emailOTP}
                onChange={(e) => setEmailOTP(e.target.value)}
                className="flex-1 border-b-2 border-gray-300 py-2 outline-none focus:border-blue-600"
              />

              <button
                type="button"
                onClick={verifyEmailOTP}
                className="px-4 py-2 bg-green-600 text-white rounded-md text-sm"
              >
                Verify
              </button>
            </div>
          )}

          {emailVerified && (
            <p className="text-green-600 text-sm">✔ Email Verified</p>
          )}
        </div>
        {/* Address */}
        <div className="relative md:col-span-2">
          <FaMapMarkerAlt className="absolute left-0 top-3 text-gray-400" />

          <textarea
            placeholder=" "
            {...register("address", { required: true })}
            className="peer w-full border-b-2 border-gray-300 py-2 pl-7 outline-none resize-none focus:border-blue-600 transition"
          />

          <label
            className="absolute left-7 text-gray-500 transition-all
          top-2
          peer-placeholder-shown:top-2
          peer-focus:-top-3
          peer-focus:text-sm
          peer-valid:-top-3
          peer-valid:text-sm"
          >
            Full Address
          </label>
        </div>
        {/* Pincode */}
        <div className="relative">
          <FaMapPin className="absolute left-0 top-3 text-gray-400" />

          <input
            type="text"
            maxLength={6}
            placeholder=" "
            {...register("pincode", { required: true })}
            className="peer w-full border-b-2 border-gray-300 py-2 pl-7 outline-none focus:border-blue-600 transition"
          />

          <label
            className="absolute left-7 text-gray-500 transition-all
          top-2
          peer-placeholder-shown:top-2
          peer-focus:-top-3
          peer-focus:text-sm
          peer-valid:-top-3
          peer-valid:text-sm"
          >
            Pincode
          </label>
        </div>
      </div>

      {/* Buttons */}

      <div className="flex flex-col md:flex-row justify-between gap-4 pt-6">
        <button
          type="button"
          onClick={prev}
          className="px-6 py-2 bg-gray-200 rounded-md"
        >
          Back
        </button>

        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-md"
        >
          Continue
        </button>
      </div>
    </form>
  );
}
