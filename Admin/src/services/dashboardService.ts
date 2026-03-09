const API = import.meta.env.VITE_API_BASE_URL + "/admin";

export const getDashboardStats = async () => {
  const res = await fetch(`${API}/dashboard`);
  return res.json();
};