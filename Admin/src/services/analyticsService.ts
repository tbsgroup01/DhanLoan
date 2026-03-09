const API = import.meta.env.VITE_API_BASE_URL + "/admin";

export const getLoanAnalytics = async () => {
  const res = await fetch(`${API}/loan-analytics`);
  return res.json();
};