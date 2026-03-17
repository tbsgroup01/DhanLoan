import React, { useEffect, useState } from "react";
import { getRecoveryRequests } from "../services/recoveryService";
import { FaSync } from "react-icons/fa";

interface Recovery {
  id: number;
  loan_id: string;
  name: string;
  mobile: string;
  pending_amount: number;
  total_loan_amount: number;
  status: string;
  createdAt: string;
}

export default function AdminRecoveries() {
  const [requests, setRequests] = useState<Recovery[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await getRecoveryRequests();
      setRequests(data);
    } catch (error) {
      console.error("Error loading recoveries:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) return <div className="p-8 text-gray-500 animate-pulse text-sm">Loading recovery records...</div>;

  return (
    <div className="p-6 md:p-8 space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Recovery Requests</h1>
          <p className="text-sm text-gray-500">Total records: {requests.length}</p>
        </div>
        <button 
          onClick={loadData} 
          className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all shadow-sm"
        >
          <FaSync className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden overflow-x-auto">
        <table className="w-full text-sm text-left min-w-[800px]">
          <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-bold uppercase text-[11px] tracking-wider">
            <tr>
              <th className="p-4">Customer</th>
              <th className="p-4">Loan ID</th>
              <th className="p-4">Mobile</th>
              <th className="p-4">Pending Amount</th>
              <th className="p-4">Total Loan</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Submitted On</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {requests.map((req) => (
              <tr key={req.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4 font-semibold text-gray-900">{req.name}</td>
                <td className="p-4 text-blue-600 font-mono font-bold">{req.loan_id}</td>
                <td className="p-4 text-gray-600">{req.mobile}</td>
                <td className="p-4 font-bold text-red-600">₹{req.pending_amount.toLocaleString()}</td>
                <td className="p-4 text-gray-500">₹{req.total_loan_amount.toLocaleString()}</td>
                <td className="p-4">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-orange-100 text-orange-700 border border-orange-200">
                    {req.status}
                  </span>
                </td>
                <td className="p-4 text-gray-400 text-xs text-right italic">
                  {new Date(req.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {requests.length === 0 && (
          <div className="p-20 text-center text-gray-400 italic">
            No recovery requests found.
          </div>
        )}
      </div>
    </div>
  );
}