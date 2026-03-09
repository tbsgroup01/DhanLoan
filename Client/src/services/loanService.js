const API = import.meta.env.VITE_API_BASE_URL + "/loan";

// STEP 1
export const startApplication = async (data) => {
  const res = await fetch(`${API}/start`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  return res.json();
};

// STEP 2
export const saveStep2 = async (data) => {
  const res = await fetch(`${API}/step2`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  return res.json();
};

// STEP 3
export const saveStep3 = async (data) => {
  const res = await fetch(`${API}/step3`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  return res.json();
};

// STEP 4
export const saveStep4 = async (data) => {
  const res = await fetch(`${API}/step4`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  return res.json();
};

// PAYMENT SUCCESS
export const paymentSuccess = async (applicationId) => {
  const res = await fetch(`${API}/payment-success`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ applicationId })
  });

  return res.json();
};

// CHECK STATUS
export const checkLoanStatus = async (loanId) => {
  const res = await fetch(`${API}/status/${loanId}`);
  return res.json();
};