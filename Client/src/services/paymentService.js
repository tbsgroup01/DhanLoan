import axios from "axios";

// FIX: Change /api/payment to /api/payment-config to match backend app.js
const BASE = import.meta.env.VITE_API_BASE_URL ;
const API_URL = `${BASE}/payment-config`; 

export const getPaymentSettings = async () => {
  try {
    // This calls GET http://localhost:3000/api/payment-config/
    const response = await axios.get(`${API_URL}/`);
    return response.data;
  } catch (error) {
    console.error("Service Error: getPaymentSettings", error);
    throw error;
  }
};

export const createRazorpayOrder = async () => {
  try {
    // This calls POST http://localhost:3000/api/payment-config/create-order
    const response = await axios.post(`${API_URL}/create-order`);
    return response.data; 
  } catch (error) {
    console.error("Service Error: createRazorpayOrder", error);
    throw error;
  }
};

export const verifyRazorpayPayment = async (payload) => {
  try {
    // This calls POST http://localhost:3000/api/payment-config/verify
    const response = await axios.post(`${API_URL}/verify`, payload);
    return response.data;
  } catch (error) {
    console.error("Service Error: verifyRazorpayPayment", error);
    throw error;
  }
};