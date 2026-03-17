import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL + "/loan";

export const getRecoveryRequests = async () => {
  const res = await axios.get(`${API_URL}/recoveries`);
  return res.data; // Returns the array of recovery requests
};