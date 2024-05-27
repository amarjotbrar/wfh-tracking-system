import { rejectData } from "../types";

export const showRequests = async (org_name: string, token: string, page: number, limit: number, status: string) => {
    return await fetch(`http://localhost:5000/admin/requests/${org_name}?limit=${limit}&page=${page}&status=${status}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    },
  });
};

export const approveRequest = async (id: string, token: string) => {
  return await fetch(`http://localhost:5000/admin/request/approve/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    }
  })
}

export const rejectRequest = async (id: string, reason: string, token:string) => {
  const rejectData: rejectData = {
    reason: reason
  }
  return await fetch(`http://localhost:5000/admin/request/reject/${id}`, {
    method: "PUT",
    body: JSON.stringify(rejectData),
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    }
  })
}