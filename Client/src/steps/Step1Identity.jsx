import { useForm } from "react-hook-form";
import { FaIdCard, FaCreditCard, FaBriefcase, FaHome } from "react-icons/fa";
import { saveStep2 } from "../services/loanService";

export default function Step1Identity({ next, setFormData }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const applicationId = localStorage.getItem("applicationId");

    const payload = {
      applicationId,
      ...data,
    };

    await saveStep2(payload);

    setFormData((prev) => ({ ...prev, ...data }));

    next();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
        Identity Verification
      </h2>

      {/* Aadhar */}

      <div className="relative">
        <FaIdCard className="absolute left-0 top-3 text-gray-400 text-sm" />

        <input
          type="text"
          maxLength={12}
          inputMode="numeric"
          placeholder=" "
          {...register("aadhar", {
            required: "Aadhar is required",
            pattern: {
              value: /^[0-9]{12}$/,
              message: "Aadhar must be 12 digits",
            },
          })}
          onInput={(e) => {
            e.target.value = e.target.value.replace(/\D/g, "");
          }}
          className="peer w-full border-b-2 border-gray-300 bg-transparent py-2 pl-7
          outline-none transition-all duration-300 focus:border-blue-600"
        />

        <label
          className="absolute left-7 text-gray-500 transition-all duration-200
        top-2 text-sm
        peer-focus:-top-3 peer-focus:text-xs peer-focus:text-blue-600
        peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:text-xs"
        >
          Aadhar Number
        </label>

        {errors.aadhar && (
          <p className="text-red-500 text-sm mt-1">{errors.aadhar.message}</p>
        )}
      </div>

      {/* PAN */}

      <div className="relative">
        <FaCreditCard className="absolute left-0 top-3 text-gray-400 text-sm" />

        <input
          type="text"
          maxLength={10}
          placeholder=" "
          {...register("pan", {
            required: "PAN is required",
            pattern: {
              value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
              message: "PAN format must be AAAAA9999A",
            },
          })}
          onInput={(e) => {
            e.target.value = e.target.value.toUpperCase();
          }}
          className="peer w-full border-b-2 border-gray-300 bg-transparent py-2 pl-7
          outline-none transition-all duration-300 focus:border-blue-600 uppercase"
        />

        <label
          className="absolute left-7 text-gray-500 transition-all duration-200
        top-2 text-sm
        peer-focus:-top-3 peer-focus:text-xs peer-focus:text-blue-600
        peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:text-xs"
        >
          PAN Number
        </label>

        {errors.pan && (
          <p className="text-red-500 text-sm mt-1">{errors.pan.message}</p>
        )}
      </div>

      {/* Occupation Dropdown */}
      <div className="relative group">
        {/* Icon */}
        <FaBriefcase className="absolute left-0 top-3 text-slate-400 text-sm pointer-events-none" />

        <select
          {...register("occupation", {
            required: "Occupation is required",
          })}
          defaultValue=""
          className="peer w-full border-b-2 border-slate-300 bg-transparent py-2 pl-7 pr-4
               outline-none transition-all duration-300 focus:border-blue-500 
               text-gray-800 appearance-none cursor-pointer"
        >
          <option value="" disabled hidden></option>
          <option value="salaried" className="bg-[#1e293b] text-white">
            Salaried
          </option>
          <option value="self-employed" className="bg-[#1e293b] text-white">
            Self-Employed
          </option>
          <option value="business" className="bg-[#1e293b] text-white">
            Business Owner
          </option>
          <option value="student" className="bg-[#1e293b] text-white">
            Student
          </option>
          <option value="other" className="bg-[#1e293b] text-white">
            Other
          </option>
        </select>

        {/* Custom Dropdown Arrow */}
        <div className="absolute right-0 top-4 pointer-events-none text-slate-400 peer-focus:text-blue-500 transition-colors">
          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </div>

        {/* Floating Label */}
        <label
          className="absolute left-7 text-slate-500 transition-all duration-200
    top-2 text-sm pointer-events-none
    peer-focus:-top-4 peer-focus:text-xs peer-focus:text-blue-500
    peer-[:not(:invalid)]:-top-4 peer-[:not(:invalid)]:text-xs
    peer-valid:-top-4 peer-valid:text-xs"
        >
          Occupation
        </label>

        {errors.occupation && (
          <p className="text-red-400 text-[10px] font-bold uppercase tracking-wider mt-2 ml-1">
            {errors.occupation.message}
          </p>
        )}
      </div>

      {/* Address */}

      <div className="relative">
        <FaHome className="absolute left-0 top-3 text-gray-400 text-sm" />

        <textarea
          rows="3"
          placeholder=" "
          {...register("address", {
            required: "Address is required",
          })}
          className="peer w-full border-b-2 border-gray-300 bg-transparent py-2 pl-7
          outline-none transition-all duration-300 focus:border-blue-600 resize-none"
        />

        <label
          className="absolute left-7 text-gray-500 transition-all duration-200
        top-2 text-sm
        peer-focus:-top-3 peer-focus:text-xs peer-focus:text-blue-600
        peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:text-xs"
        >
          Address
        </label>

        {errors.address && (
          <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
        )}
      </div>

      {/* Button */}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2.5 rounded-lg
        hover:bg-blue-700 transition"
      >
        Continue
      </button>
    </form>
  );
}
