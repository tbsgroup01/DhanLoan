import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/loanService";

export default function LoginPassword() {

  const [loanId, setLoanId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {

    const res = await loginUser({
      loan_id: loanId,
      password
    });

    if (res.token) {

      localStorage.setItem("token", res.token);
      localStorage.setItem("loan_id", loanId);

      navigate("/dashboard");

    } else {

      setError(res.message);

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

        <h2 className="text-2xl font-bold text-center mb-6">
          User Login
        </h2>

        <input
          type="text"
          placeholder="Loan ID"
          value={loanId}
          onChange={(e) => setLoanId(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4"
        />

        {error && (
          <p className="text-red-500 mb-3">{error}</p>
        )}

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-3 rounded-lg"
        >
          Login
        </button>

      </div>

    </div>

  );
}