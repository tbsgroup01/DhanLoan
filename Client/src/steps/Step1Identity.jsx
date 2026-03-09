import { useForm } from "react-hook-form";
import { FaIdCard, FaCreditCard } from "react-icons/fa";
import { startApplication } from "../services/loanService";

export default function Step1Identity({ next, setFormData }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const res = await startApplication(data);

    localStorage.setItem("applicationId", res.applicationId);

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
          outline-none transition-all duration-300 focus:border-blue-600 text-sm sm:text-base"
        />

        <label
          className="absolute left-7 text-gray-500 transition-all duration-200
          top-2 text-sm
          peer-placeholder-shown:top-2
          peer-placeholder-shown:text-base
          peer-focus:-top-3
          peer-focus:text-xs
          peer-focus:text-blue-600
          peer-[:not(:placeholder-shown)]:-top-3
          peer-[:not(:placeholder-shown)]:text-xs"
        >
          Aadhar Number
        </label>

        {errors.aadhar && (
          <p className="text-red-500 text-xs sm:text-sm mt-1">
            {errors.aadhar.message}
          </p>
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
          outline-none transition-all duration-300 focus:border-blue-600 uppercase text-sm sm:text-base"
        />

        <label
          className="absolute left-7 text-gray-500 transition-all duration-200
          top-2 text-sm
          peer-placeholder-shown:top-2
          peer-placeholder-shown:text-base
          peer-focus:-top-3
          peer-focus:text-xs
          peer-focus:text-blue-600
          peer-[:not(:placeholder-shown)]:-top-3
          peer-[:not(:placeholder-shown)]:text-xs"
        >
          PAN Number
        </label>

        {errors.pan && (
          <p className="text-red-500 text-xs sm:text-sm mt-1">
            {errors.pan.message}
          </p>
        )}
      </div>

      {/* Button */}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2.5 rounded-lg
        hover:bg-blue-700 transition text-sm sm:text-base"
      >
        Continue
      </button>
    </form>
  );
}
