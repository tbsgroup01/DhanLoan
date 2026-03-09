const API = import.meta.env.VITE_API_BASE_URL + "/admin";

export const getAllApplications = async () => {

  const res = await fetch(`${API}/loans`);

  return res.json();

};

export const approveLoan = async (id: number) => {

  const res = await fetch(`${API}/approve/${id}`, {
    method: "PATCH"
  });

  return res.json();

};

export const rejectLoan = async (id: number, reason: string) => {

  const res = await fetch(`${API}/reject/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ reason })
  });

  return res.json();

};


export const deleteApplicationsBulk = async (ids: number[]) => {

  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/admin/delete-bulk`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ ids })
    }
  );

  return res.json();

};

export const getLoanById = async (id: number) => {
  const res = await fetch(`${API}/loan/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch loan details");
  }

  return res.json();
};


