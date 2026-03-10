const API = import.meta.env.VITE_API_BASE_URL + "/loan";


/* ===============================
   STEP 1 - START APPLICATION
================================ */
export const startApplication = async (data) => {
  const res = await fetch(`${API}/start`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  return res.json();
};


/* ===============================
   STEP 2
================================ */
export const saveStep2 = async (data) => {
  const res = await fetch(`${API}/step2`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  return res.json();
};


/* ===============================
   STEP 3
================================ */
export const saveStep3 = async (data) => {
  const res = await fetch(`${API}/step3`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  return res.json();
};


/* ===============================
   STEP 4
================================ */
export const saveStep4 = async (data) => {
  const res = await fetch(`${API}/step4`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  return res.json();
};


/* ===============================
   PAYMENT SUCCESS
================================ */
export const paymentSuccess = async (applicationId) => {
  const res = await fetch(`${API}/payment-success`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ applicationId })
  });

  return res.json();
};


/* ===============================
   CHECK STATUS
================================ */
export const checkLoanStatus = async (loanId) => {
  try {

    const res = await fetch(`${API}/status/${loanId}`);

    if (!res.ok) {
      return null;
    }

    return await res.json();

  } catch (error) {

    console.error("Error fetching loan status:", error);
    return null;

  }
};


/* ===============================
   VERIFY LOAN USER
================================ */
export const verifyLoanUser = async (data) => {

  const res = await fetch(`${API}/verify-user`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  return res.json();

};


/* ===============================
   CREATE PASSWORD
================================ */
export const createPassword = async (data) => {

  const res = await fetch(`${API}/create-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  return res.json();

};


/* ===============================
   LOGIN USER
================================ */
export const loginLoanUser = async (data) => {

  const res = await fetch(`${API}/login-user`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  return res.json();

};


/* ===============================
   USER DASHBOARD
================================ */
export const getUserDashboard = async () => {

  const token = localStorage.getItem("token");

  const res = await fetch(`${API}/user-dashboard`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return res.json();

};

// ===============================
//    LOGIN WITH MOBILE
// ================================ 

export const loginWithMobile = async (data) => {

  const res = await fetch(`${API}/login-user`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  return res.json();

};


export const registerUser = async (data) => {

  const res = await fetch(`${API}/register-user`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  return res.json();

};


export const loginUser = async (data) => {
  try {
    const res = await fetch(`${API}/login-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Login failed");
    }

    return result;

  } catch (error) {
    return { message: error.message };
  }
};