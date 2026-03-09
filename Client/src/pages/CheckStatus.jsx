import { useState } from "react";
import { checkLoanStatus } from "../services/loanService";

export default function CheckStatus() {

  const [loanId, setLoanId] = useState("");
  const [result, setResult] = useState(null);

  const handleCheck = async () => {

    const data = await checkLoanStatus(loanId);

    setResult(data);

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-6">

        <h2 className="text-2xl font-bold text-center">
          Check Loan Status
        </h2>


        <input
          type="text"
          placeholder="Enter Loan ID"
          value={loanId}
          onChange={(e) => setLoanId(e.target.value)}
          className="w-full border p-3 rounded-lg"
        />


        <button
          onClick={handleCheck}
          className="w-full bg-blue-600 text-white py-3 rounded-lg"
        >
          Check Status
        </button>


        {result && (

          <div className="border rounded-lg p-4 space-y-2">

            <p>
              <b>Loan ID:</b> {result.loan_id}
            </p>

            <p>
              <b>Status:</b> {result.status}
            </p>

            <p>
              <b>Loan Amount:</b> ₹{result.amount}
            </p>


            {result.status === "approved" && (

              <p className="text-green-600 font-semibold">
                Your loan has been approved 🎉
              </p>

            )}


            {result.status === "rejected" && (

              <div className="text-red-600">

                <p className="font-semibold">
                  Loan Rejected
                </p>

                <p>
                  Reason: {result.rejection_reason}
                </p>

              </div>

            )}

          </div>

        )}

      </div>

    </div>

  );

}