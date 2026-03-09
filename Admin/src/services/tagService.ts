import api from "./api";

export const getTags = async () => {
  const res = await api.get("/tags");
  return res.data;
};

export const createTag = async (data: any) => {
  const res = await api.post("/tags", data);
  return res.data;
};

export const updateTag = async (id: number, data: any) => {
  const res = await api.put(`/tags/${id}`, data);
  return res.data;
};

export const deleteTag = async (id: number) => {
  const res = await api.delete(`/tags/${id}`);
  return res.data;
};

export const toggleTag = async (id: number) => {
  const res = await api.patch(`/tags/${id}/toggle`);
  return res.data;
};