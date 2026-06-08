import api from "./client";

export interface Leave {
  reason: string;
  fromDate: string;
  toDate: string;
  description: string;
  status: "Pending" | "Approved" | "Rejected";
  remarks?: string;
}

export const getMyLeaves = async (): Promise<Leave[]> => {
  const res = await api.get("/students/leaves");
  return res.data;
};

export const applyLeave = async (data: {
  reason: string;
  fromDate: string;
  toDate: string;
  description?: string;
}) => {
  const res = await api.post("/students/leaves", data);
  return res.data;
};
