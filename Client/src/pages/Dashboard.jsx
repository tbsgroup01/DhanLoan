import { useEffect, useState } from "react";
import { getUserDashboard } from "../services/loanService";

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const load = async () => {
      const res = await getUserDashboard();

      setData(res);
    };

    load();
  }, []);

  if (!data) {
    return <div className="p-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-6">Loan Dashboard</h2>

        <p>
          <b>Name:</b> {data.name}
        </p>
        <p>
          <b>Loan ID:</b> {data.loan_id}
        </p>
        <p>
          <b>Amount:</b> ₹{data.amount}
        </p>
        <p>
          <b>Status:</b> {data.status}
        </p>
        <p>
          <b>Mobile:</b> {data.mobile}
        </p>
        <p>
          <b>Email:</b> {data.email}
        </p>
      </div>

      <div className="mt-6">
        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/auth";
          }}
          className="bg-red-500 text-white px-5 py-2 rounded-lg"
        >
          Logout
        </button>

        

      </div>
    </div>
  );
}
