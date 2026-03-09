const API = "http://localhost:3000/api/settings";

export const getSettings = async () => {
  const res = await fetch(API);
  return res.json();
};

export const updateSettings = async (formData: FormData) => {
  const res = await fetch(`${API}/update`, {
    method: "POST",
    body: formData,
  });

  return res.json();
};