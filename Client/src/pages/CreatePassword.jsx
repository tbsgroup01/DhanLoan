import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createPassword } from "../services/loanService";

export default function CreatePassword() {

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const loan_id = location.state?.loan_id;

  const handleSubmit = async () => {

    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }

    const res = await createPassword({
      loan_id,
      password
    });

    localStorage.setItem("token", res.token);

    navigate("/dashboard");

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

        <h2 className="text-2xl font-bold text-center mb-6">
          Create Password
        </h2>

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-green-600 text-white py-3 rounded-lg"
        >
          Create Password
        </button>

      </div>
    </div>
  );
}