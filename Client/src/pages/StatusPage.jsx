import { Link } from "react-router-dom";

export default function StatusPage() {

  const loanId = localStorage.getItem("loanId");

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-10 rounded-xl shadow-lg text-center">

        <h2 className="text-3xl font-bold text-green-600">
          Loan Application Submitted
        </h2>

        <p className="mt-4 text-gray-600">
          Your Loan ID
        </p>

        <div className="text-4xl font-bold text-blue-600 mt-2">
          {loanId}
        </div>

        <p className="mt-3 text-gray-500">
          Save this ID to check your loan status
        </p>

        <Link
          to="/check-status"
          className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Check Loan Status
        </Link>

      </div>

    </div>

  );
}