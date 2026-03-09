import api from "./api";

export const registerAdmin = async (data: {
  username: string;
  email: string;
  password: string;
}) => {
  const res = await api.post("/admin/auth/register", data);
  return res.data;
};

export const loginAdmin = async (data: { email: string; password: string }) => {
  const res = await api.post("/admin/auth/login", data);
  return res.data;
};

export const forgotPassword = async (email: string) => {
  const res = await api.post("/admin/auth/forgot-password", { email });
  return res.data;
};

export const resetPassword = async (token: string, password: string) => {
  const res = await api.post(`/admin/auth/reset-password/${token}`, {
    password,
  });
  return res.data;
};

export const logoutAdmin = async () => {
  try {
    await api.post("/admin/logout");
  } catch (error) {
    console.log(error);
  }

  localStorage.removeItem("admin_token");
  localStorage.removeItem("admin_user");
};
