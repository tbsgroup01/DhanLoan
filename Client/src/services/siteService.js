export const getSiteSettings = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/settings`);
  // console.log(res);
  
  return res.json();
};