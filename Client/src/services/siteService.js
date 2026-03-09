export const getSiteSettings = async () => {
  const res = await fetch("http://localhost:3000/api/settings");
  return res.json();
};