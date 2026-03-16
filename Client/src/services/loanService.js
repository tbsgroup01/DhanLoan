const API = import.meta.env.VITE_API_BASE_URL + "/loan";

/* ===============================
   STEP 1 - START APPLICATION
================================ */
export const startApplication = async (data) => {
  const res = await fetch(`${API}/start`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Failed to start application");
  }

  return result;
};

/* ===============================
   STEP 2 - IDENTITY DETAILS
================================ */
export const saveStep2 = async (data) => {
  const res = await fetch(`${API}/step2`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
};

/* ===============================
   STEP 3 - LOAN DETAILS
================================ */
export const saveStep3 = async (data) => {
  const res = await fetch(`${API}/step3`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
};

/* ===============================
   STEP 4 - BANK DETAILS
================================ */
export const saveStep4 = async (data) => {
  const res = await fetch(`${API}/step4`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
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
    body: JSON.stringify({ applicationId }),
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
    body: JSON.stringify(data),
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
    body: JSON.stringify(data),
  });

  return res.json();
};

/* ===============================
   REGISTER USER
================================ */
export const registerUser = async (data) => {
  const res = await fetch(`${API}/register-user`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
};

/* ===============================
   LOGIN USER
================================ */
export const loginUser = async (data) => {
  const res = await fetch(`${API}/login-user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Login failed");
  }

  return result;
};

/* ===============================
   USER DASHBOARD
================================ */
export const getUserDashboard = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API}/user-dashboard`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};

/**
 * Step 1: Request OTP by sending Loan ID and Mobile
 */
// const API_URL = "http://loanapi.towsindia.com/api/loan"; 

export const requestLoginOtp = async (loanId, mobile) => {
  try {
    // REMOVE the extra "/loan" from this string
    const response = await fetch(`${API}/request-login-otp`, { 
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ loan_id: loanId, mobile: mobile }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in requestLoginOtp:", error);
    throw error;
  }
};
/**
 * Step 2: Verify OTP and get the Auth Token
 */
export const verifyLoginOtp = async (loanId, otp) => {
  try {
    const response = await fetch(`${API}/verify-login-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ loan_id: loanId, otp: otp }),
    });
    return await response.json();
  } catch (error) {
    console.error("Error verifying OTP:", error);
    throw error;
  }
};


