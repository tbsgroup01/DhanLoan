import api from "./api";

export const updateAdminProfile = async (data:any) => {
  const res = await api.put("/admin/profile", data);
  return res.data;
};

export const getAdminProfile = async () => {
  const res = await api.get("/admin/profile");
  return res.data;
};