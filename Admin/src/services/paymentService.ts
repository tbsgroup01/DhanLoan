import api from "./api";

export const getPaymentSettings = async () => {
  const res = await api.get("/payment-config");
  return res.data;
};

export const updatePaymentSettings = async (formData: FormData) => {
  const res = await api.post("/payment-config/update", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};