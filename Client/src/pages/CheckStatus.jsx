import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkLoanStatus } from "../services/loanService";

export default function CheckStatus() {
  const [loanId, setLoanId] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleCheck = async () => {
    // Reset states
    setError("");
    setResult(null);

    if (!loanId.trim()) {
      setError("Please enter a valid Loan ID to continue.");
      return;
    }

    setLoading(true);
    try {
      const data = await checkLoanStatus(loanId);
      if (data) {
        setResult(data);
      } else {
        setError(
          "No application found with this ID. Please check and try again.",
        );
      }
    } catch (err) {
      setError("Unable to connect to the server. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6 font-sans">
      <div className="bg-white shadow-2xl rounded-3xl overflow-hidden max-w-4xl w-full flex flex-col md:flex-row">
        {/* Left Side: Info Panel */}
        <div className="bg-blue-600 md:w-1/3 p-10 text-white flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-4">Track Your Application</h1>
          <p className="text-blue-100 leading-relaxed">
            Enter your unique Application ID to view your real-time loan status,
            approved amount, and next steps.
          </p>
          <div className="mt-8 space-y-4 opacity-50 text-sm">
            <p>• Secure 256-bit encryption</p>
            <p>• Real-time status updates</p>
          </div>
        </div>

        {/* Right Side: Action Panel */}
        <div className="md:w-2/3 p-10">
          <div className="max-w-md mx-auto">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Check Status
            </h2>

            <div className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter Loan ID (e.g. LN-1024)"
                  value={loanId}
                  onChange={(e) => setLoanId(e.target.value)}
                  className={`w-full px-5 py-4 bg-gray-50 border-2 rounded-2xl transition-all outline-none text-gray-700 font-medium ${
                    error
                      ? "border-red-200 focus:border-red-500"
                      : "border-gray-100 focus:border-blue-500"
                  }`}
                />
              </div>

              {error && (
                <p className="text-red-500 text-sm font-medium ml-2 animate-pulse">
                  ⚠️ {error}
                </p>
              )}

              <button
                onClick={handleCheck}
                disabled={loading}
                className="w-full bg-gray-900 hover:bg-black text-white py-4 rounded-2xl font-bold text-lg shadow-lg transition-transform active:scale-[0.98] disabled:bg-gray-400"
              >
                {loading ? "Searching Records..." : "Track Status"}
              </button>
            </div>

            {/* Results Section */}
            {result && (
              <div className="mt-10 animate-in fade-in slide-in-from-top-4 duration-500">
                <div className="p-6 rounded-2xl border-2 border-gray-50 bg-white shadow-sm">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-1">
                        Status
                      </p>
                      <span
                        className={`px-4 py-1 rounded-full text-xs font-bold uppercase ${
                          result.status === "approved"
                            ? "bg-green-100 text-green-700"
                            : result.status === "rejected"
                              ? "bg-red-100 text-red-700"
                              : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {result.status}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-1">
                        Loan Amount
                      </p>
                      <p className="text-xl font-black text-gray-900">
                        ₹{result?.amount ? result.amount.toLocaleString() : "0"}
                      </p>
                    </div>
                  </div>

                  {result.status === "approved" ? (
                    <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                      <p className="text-green-800 font-bold text-sm">
                        🎉 Application Approved
                      </p>
                      <p className="text-green-600 text-xs mt-1">
                        Your funds are ready for disbursement.
                      </p>
                      <button
                        onClick={() => navigate("/auth")}
                        className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg text-sm font-bold hover:bg-green-700 transition"
                      >
                        Get Funds
                      </button>
                    </div>
                  ) : result.status === "rejected" ? (
                    <div className="bg-red-50 p-4 rounded-xl border border-red-100">
                      <p className="text-red-800 font-bold text-sm">
                        Application Declined
                      </p>
                      <p className="text-red-600 text-xs mt-1">
                        Reason: {result.rejection_reason}
                      </p>
                    </div>
                  ) : (
                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                      <p className="text-blue-800 font-bold text-sm">
                        Under Review
                      </p>
                      <p className="text-blue-600 text-xs mt-1">
                        Our agents are currently verifying your documents.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
