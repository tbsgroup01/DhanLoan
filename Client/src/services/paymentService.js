const API = "http://loanapi.towsindia.com/api/payment-config";

export const getPaymentSettings = async () => {
  try {
    const res = await fetch(API);

    const data = await res.json();

    return data;

  } catch (error) {
    console.log("Payment settings fetch error:", error);
  }
};