import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaCheck, FaTimes, FaUser, FaUniversity, FaFileInvoiceDollar, FaShieldAlt } from "react-icons/fa";

interface Loan {
  id: number;
  loan_id: string;
  aadhar: string;
  pan: string;
  name: string;
  mobile: string;
  email: string;
  occupation: string;
  address: string;
  pincode: string;
  amount: number;
  tenure: number;
  loanType: string;
  emi: number;
  total: number;
  accountHolder: string;
  accountNumber: string;
  ifsc: string;
  bankName: string;
  payment_status: string;
  status: string;
  rejection_reason?: string;
}

export default function ApplicationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loan, setLoan] = useState<Loan | null>(null);
  const [loading, setLoading] = useState(true);
  const [reason, setReason] = useState("");
  const [rejectModal, setRejectModal] = useState(false);

  const fetchLoan = async () => {
    try {
      const res = await fetch(`http://loanapi.towsindia.com/api/admin/loan/${id}`);
      const data = await res.json();
      setLoan(data);
    } catch (error) {
      console.error("Error loading application", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoan();
  }, []);

  const approveLoan = async () => {
    await fetch(`http://loanapi.towsindia.com/api/admin/loan/${id}/approve`, { method: "PUT" });
    fetchLoan();
  };

  const rejectLoan = async () => {
    if (!reason) return;
    await fetch(`http://loanapi.towsindia.com/api/admin/loan/${id}/reject`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reason }),
    });
    setRejectModal(false);
    setReason("");
    fetchLoan();
  };

  const StatusBadge = ({ status }: { status: string }) => {
    const colors: Record<string, string> = {
      pending: "bg-amber-100 text-amber-700 border-amber-200",
      approved: "bg-emerald-100 text-emerald-700 border-emerald-200",
      rejected: "bg-rose-100 text-rose-700 border-rose-200",
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase border ${colors[status.toLowerCase()] || "bg-gray-100 text-gray-600"}`}>
        {status}
      </span>
    );
  };

  if (loading) return (
    <div className="flex h-screen items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  if (!loan) return <div className="p-10 text-center text-gray-500 font-medium">Application record not found.</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans text-slate-900">
      
      {/* Top Navigation Bar */}
      <div className="max-w-6xl mx-auto mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-white rounded-full transition-all shadow-sm border border-transparent hover:border-gray-200 group"
          >
            <FaArrowLeft className="text-gray-500 group-hover:text-blue-600" />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-extrabold tracking-tight">Application Review</h1>
              <StatusBadge status={loan.status} />
            </div>
            <p className="text-sm text-gray-500 mt-1">Ref ID: <span className="font-mono">{loan.loan_id}</span></p>
          </div>
        </div>

        
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Client & Identity */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Section: Applicant Details */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-50 flex items-center gap-3 bg-gray-50/50">
              <FaUser className="text-blue-500" />
              <h2 className="font-bold text-gray-700 uppercase tracking-wider text-sm">Applicant Information</h2>
            </div>
            <div className="p-0">
              <table className="w-full text-sm text-left">
                <tbody>
                  <tr className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-500 w-1/3">Full Legal Name</td>
                    <td className="px-6 py-4 text-gray-900 font-semibold">{loan.name}</td>
                  </tr>
                  <tr className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-500">Contact Details</td>
                    <td className="px-6 py-4">
                      <div className="text-gray-900">{loan.mobile}</div>
                      <div className="text-blue-600 underline text-xs">{loan.email}</div>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-500">Employment</td>
                    <td className="px-6 py-4 text-gray-900">{loan.occupation}</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-500">Residential Address</td>
                    <td className="px-6 py-4 text-gray-900 leading-relaxed">
                      {loan.address}, {loan.pincode}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section: Identity Verification */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-50 flex items-center gap-3 bg-gray-50/50">
              <FaShieldAlt className="text-blue-500" />
              <h2 className="font-bold text-gray-700 uppercase tracking-wider text-sm">KYC & Identity</h2>
            </div>
            <div className="grid grid-cols-2 divide-x divide-gray-100">
              <div className="p-6 text-center">
                <p className="text-xs text-gray-400 uppercase font-bold mb-1">Aadhar Number</p>
                <p className="text-lg font-mono font-semibold tracking-widest text-gray-800">{loan.aadhar}</p>
              </div>
              <div className="p-6 text-center">
                <p className="text-xs text-gray-400 uppercase font-bold mb-1">PAN Card</p>
                <p className="text-lg font-mono font-semibold tracking-widest text-gray-800">{loan.pan}</p>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Financial & Bank */}
        <div className="space-y-8">
          
          {/* Section: Loan Financials */}
          <section className="bg-slate-900 text-white rounded-2xl shadow-xl p-6 relative overflow-hidden">
            <FaFileInvoiceDollar className="absolute top-4 right-4 text-slate-800 text-6xl -z-0 opacity-50" />
            <div className="relative z-10">
              <h2 className="text-slate-400 font-bold uppercase tracking-wider text-xs mb-6">Loan Terms</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-end border-b border-slate-800 pb-2">
                  <span className="text-sm text-slate-400">Principal</span>
                  <span className="text-2xl font-bold">₹{loan.amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">Monthly EMI</span>
                  <span className="font-semibold text-blue-400">₹{loan.emi.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">Tenure</span>
                  <span className="font-semibold">{loan.tenure} Months</span>
                </div>
                <div className="flex justify-between items-center text-sm pt-2 border-t border-slate-800">
                  <span className="text-slate-400 font-bold">Total Repayment</span>
                  <span className="font-bold text-lg">₹{loan.total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </section>

          {/* Section: Bank Disbursement */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-50 flex items-center gap-3 bg-gray-50/50">
              <FaUniversity className="text-blue-500" />
              <h2 className="font-bold text-gray-700 uppercase tracking-wider text-sm">Bank Details</h2>
            </div>
            <div className="p-6 space-y-4 text-sm">
              <div>
                <p className="text-gray-400 text-xs font-bold uppercase">Bank Name</p>
                <p className="text-gray-900 font-semibold">{loan.bankName}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-xs font-bold uppercase">Account No.</p>
                  <p className="text-gray-900 font-mono">{loan.accountNumber}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs font-bold uppercase">IFSC</p>
                  <p className="text-gray-900 font-mono">{loan.ifsc}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Rejection Alert Box */}
          {loan.status === "rejected" && (
            <div className="bg-rose-50 border border-rose-100 p-4 rounded-xl">
              <h3 className="text-rose-700 font-bold text-xs uppercase mb-1">Rejection Reason</h3>
              <p className="text-rose-600 text-sm leading-relaxed">{loan.rejection_reason}</p>
            </div>
          )}
        </div>
      </div>

      {/* Modern Backdrop Modal */}
      {rejectModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-gray-100">
              <h2 className="font-bold text-xl text-gray-800">Reject Application</h2>
              <p className="text-sm text-gray-500 mt-1">Please provide a valid reason for declining this loan.</p>
            </div>
            <div className="p-6">
              <textarea
                autoFocus
                placeholder="Type reason here..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full border border-gray-200 p-4 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all h-32 text-sm"
              />
            </div>
            <div className="p-6 bg-gray-50 flex justify-end gap-3">
              <button
                onClick={() => setRejectModal(false)}
                className="px-6 py-2 text-gray-600 font-semibold hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                disabled={!reason.trim()}
                onClick={rejectLoan}
                className="px-6 py-2 bg-rose-600 disabled:opacity-50 text-white rounded-lg font-bold shadow-lg shadow-rose-200 hover:bg-rose-700 transition-all"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}