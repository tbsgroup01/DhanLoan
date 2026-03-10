import React, { createContext, useContext, useState, useCallback } from "react";

const LoanContext = createContext();

export const LoanProvider = ({ children }) => {
  const [loanData, setLoanData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchLoanById = useCallback(async (id) => {
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BASE_URL}/admin/loan/${id}`);
      if (!res.ok) throw new Error("Failed to fetch loan details");
      const data = await res.json();
      setLoanData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <LoanContext.Provider value={{ loanData, loading, error, fetchLoanById }}>
      {children}
    </LoanContext.Provider>
  );
};

export const useLoan = () => useContext(LoanContext);