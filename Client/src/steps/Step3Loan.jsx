import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { FaMoneyBillWave, FaCalendarAlt, FaUniversity } from "react-icons/fa";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { saveStep3 } from "../services/loanService";


export default function Step3Loan({ next, prev, setFormData }) {

  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      amount: 200000,
      tenure: 24,
      loanType: "personal",
      interest: 13
    }
  });

  const [emi, setEmi] = useState(0);
  const [total, setTotal] = useState(0);
  const [interestPayable, setInterestPayable] = useState(0);

  const amount = watch("amount");
  const tenure = watch("tenure");
  const loanType = watch("loanType");
  const interest = watch("interest");

  // Auto interest
  useEffect(() => {

    if (loanType === "personal") setValue("interest", 13);
    if (loanType === "business") setValue("interest", 12);
    if (loanType === "home") setValue("interest", 11);
    if (loanType === "education") setValue("interest", 9);

  }, [loanType, setValue]);

  // EMI Calculation
  useEffect(() => {

    const P = Number(amount);
    const R = Number(interest) / 12 / 100;
    const N = Number(tenure);

    const emiValue =
      (P * R * Math.pow(1 + R, N)) /
      (Math.pow(1 + R, N) - 1);

    if (!isNaN(emiValue)) {

      const emiRounded = emiValue.toFixed(2);
      const totalPay = (emiRounded * N).toFixed(2);

      setEmi(emiRounded);
      setTotal(totalPay);
      setInterestPayable((totalPay - P).toFixed(2));

    }

  }, [amount, interest, tenure]);

  // Chart Data
  const chartData = [
    { name: "Principal", value: Number(amount) },
    { name: "Interest", value: Number(interestPayable) }
  ];

  const COLORS = ["#2563eb", "#f97316"];

  const onSubmit = async (data) => {

  const applicationId = localStorage.getItem("applicationId");

  data.emi = emi;
  data.total = total;

  await saveStep3({
    applicationId,
    ...data
  });

  setFormData(prev => ({ ...prev, ...data }));

  next();
};

  return (

    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

      <h1 className="text-3xl font-bold text-gray-800 text-center">
        Loan Details
      </h1>


      {/* MAIN GRID */}

      <div className="grid md:grid-cols-2 gap-8">


        {/* LEFT SIDE FORM */}

        <div className="space-y-6">


          {/* EMI CARD */}

          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl p-6 shadow">

            <p className="text-sm opacity-80">Monthly EMI</p>

            <h3 className="text-3xl font-bold mt-1">
              ₹ {emi}
            </h3>

            <div className="flex justify-between mt-4 text-sm">

              <div>
                <p className="opacity-80">Total Payable</p>
                <p className="font-semibold">₹ {total}</p>
              </div>

              <div className="text-right">
                <p className="opacity-80">Interest</p>
                <p className="font-semibold">{interest}%</p>
              </div>

            </div>

          </div>


          {/* Amount Slider */}

          <div>

            <label className="flex items-center gap-2 font-medium mb-2">
              <FaMoneyBillWave /> Loan Amount
            </label>

            <input
              type="range"
              min="10000"
              max="1000000"
              step="5000"
              {...register("amount")}
              className="w-full accent-blue-600"
            />

            <p className="text-blue-700 font-semibold mt-2">
              ₹ {Number(amount).toLocaleString()}
            </p>

          </div>


          {/* Tenure */}

          <div>

            <label className="flex items-center gap-2 font-medium mb-2">
              <FaCalendarAlt /> Tenure
            </label>

            <input
              type="range"
              min="6"
              max="60"
              step="6"
              {...register("tenure")}
              className="w-full accent-blue-600"
            />

            <p className="text-blue-700 font-semibold mt-2">
              {tenure} Months
            </p>

          </div>


          {/* Loan Type */}

          <div>

            <label className="flex items-center gap-2 font-medium mb-2">
              <FaUniversity /> Loan Type
            </label>

            <select
              {...register("loanType")}
              className="w-full border rounded-lg p-2"
            >

              <option value="personal">Personal Loan</option>
              <option value="business">Business Loan</option>
              <option value="home">Home Loan</option>
              <option value="education">Education Loan</option>

            </select>

          </div>

        </div>


        {/* RIGHT SIDE CHART */}

        <div className="bg-white  rounded-xl p-6 shadow-xl">

          <h3 className="text-center font-semibold mb-4">
            Payment Breakdown
          </h3>

          <div className="h-64">

            <ResponsiveContainer>

              <PieChart>

                <Pie
                  key={amount + interestPayable}
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  dataKey="value"
                >

                  {chartData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>


          <div className="flex justify-center gap-6 mt-4 text-sm">

            <span className="flex items-center gap-2">
              <span className="w-3 h-3 bg-blue-600 rounded-full"></span>
              Principal
            </span>

            <span className="flex items-center gap-2">
              <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
              Interest
            </span>

          </div>

        </div>


      </div>


      {/* BUTTONS */}

      <div className="flex justify-between">

        <button
          type="button"
          onClick={prev}
          className="px-6 py-2 bg-gray-200 rounded-lg"
        >
          Back
        </button>

        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg"
        >
          Continue
        </button>

      </div>

    </form>

  );

}