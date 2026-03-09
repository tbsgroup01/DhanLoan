import { useEffect, useState } from "react";
import {
  getAllApplications,
  approveLoan,
  rejectLoan,
  deleteApplicationsBulk,
} from "../services/adminService";

import { FaEye, FaCheck, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface Loan {
  id: number;
  loan_id: string | null;
  name: string;
  mobile: string;
  amount: number;
  step_completed: number;
  payment_status: string;
  status: string;
}

export default function AllApplications() {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [rejectId, setRejectId] = useState<number | null>(null);
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchLoans = async () => {
    try {
      setLoading(true);
      const data: Loan[] = await getAllApplications();
      setLoans(data);
    } catch (error) {
      console.error("Error fetching loans:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  const handleApprove = async (id: number) => {
    try {
      await approveLoan(id);
      fetchLoans();
    } catch (error) {
      console.error("Approve failed:", error);
    }
  };

  const handleReject = async () => {
    if (!rejectId || !reason.trim()) return;

    try {
      await rejectLoan(rejectId, reason);
      setRejectId(null);
      setReason("");
      fetchLoans();
    } catch (error) {
      console.error("Reject failed:", error);
    }
  };

  const handleBulkDelete = async () => {
    if (!window.confirm("Delete selected applications?")) return;

    try {
      await deleteApplicationsBulk(selected);
      setSelected([]);
      fetchLoans();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const toggleSelect = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const toggleSelectAll = () => {
    setSelected((prev) =>
      prev.length === loans.length ? [] : loans.map((l) => l.id),
    );
  };

  const getStepName = (step: number) => {
    switch (step) {
      case 1:
        return "Identity";
      case 2:
        return "Personal";
      case 3:
        return "Loan";
      case 4:
        return "Bank";
      case 5:
        return "Completed";
      default:
        return "Unknown";
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-gray-500 text-sm">Loading applications...</div>
    );
  }

  return (
    <div className="p-6 md:p-8 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center flex-wrap gap-3">
        <h1 className="text-2xl font-bold text-gray-800">Loan Applications</h1>
        <div className="text-sm text-gray-500">Total: {loans.length}</div>
      </div>

      {/* Bulk Action */}
      {selected.length > 0 && (
        <div className="bg-red-50 border border-red-200 p-3 rounded-lg flex justify-between items-center">
          <span className="text-sm text-red-700">
            {selected.length} selected
          </span>

          <button
            onClick={handleBulkDelete}
            className="bg-red-600 text-white px-4 py-1 rounded-lg text-sm hover:bg-red-700"
          >
            Delete Selected
          </button>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl shadow border overflow-x-auto">
        <table className="w-full text-sm min-w-[900px]">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4">
                <input
                  type="checkbox"
                  checked={selected.length === loans.length && loans.length > 0}
                  onChange={toggleSelectAll}
                />
              </th>
              <th className="p-4 text-left">Loan ID</th>
              <th className="p-4 text-left">Applicant</th>
              <th className="p-4 text-left">Amount</th>
              <th className="p-4 text-left">Step</th>
              <th className="p-4 text-left">Progress</th>
              <th className="p-4 text-left">Payment</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loans.map((loan) => {
              const progress = loan.step_completed * 20;

              return (
                <tr
                  key={loan.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selected.includes(loan.id)}
                      onChange={() => toggleSelect(loan.id)}
                    />
                  </td>

                  <td className="p-4 font-semibold text-blue-600">
                    {loan.loan_id ?? "Pending"}
                  </td>

                  <td className="p-4">
                    <div className="font-medium">{loan.name || "Unknown"}</div>
                    <div className="text-xs text-gray-500">{loan.mobile}</div>
                  </td>

                  <td className="p-4 font-semibold">₹{loan.amount || "-"}</td>

                  <td className="p-4">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                      {getStepName(loan.step_completed)}
                    </span>
                  </td>

                  <td className="p-4 w-40">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>

                    <p className="text-xs text-gray-500 mt-1">
                      Step {loan.step_completed}/5
                    </p>
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        loan.payment_status === "paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {loan.payment_status}
                    </span>
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        loan.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : loan.status === "rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {loan.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="p-4 flex items-center gap-3">
                    {loan.loan_id ? (
                      <>
                        <button
                          onClick={() => navigate(`/application/${loan.id}`)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <FaEye />
                        </button>

                        {loan.status === "pending" && (
                          <>
                            <button
                              onClick={() => handleApprove(loan.id)}
                              className="text-green-600 hover:text-green-800 text-lg"
                              title="Approve"
                            >
                              <FaCheck />
                            </button>

                            <button
                              onClick={() => setRejectId(loan.id)}
                              className="text-red-600 hover:text-red-800 text-lg"
                              title="Reject"
                            >
                              <FaTimes />
                            </button>
                          </>
                        )}
                      </>
                    ) : (
                      <span className="text-gray-400 text-xs italic">
                        Incomplete
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Reject Modal */}
      {rejectId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-[90%] max-w-md space-y-4 shadow-xl">
            <h2 className="text-lg font-semibold">Reject Loan Application</h2>

            <textarea
              placeholder="Enter rejection reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full border p-3 rounded-lg"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setRejectId(null)}
                className="px-4 py-2 bg-gray-200 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleReject}
                className="px-4 py-2 bg-red-600 text-white rounded-lg"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
