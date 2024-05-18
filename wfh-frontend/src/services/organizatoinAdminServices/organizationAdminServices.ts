import { rejectData } from "../types";

export const showRequests = async (org_name: string) => {
    return await fetch(`http://localhost:5000/admin/showrequests/${org_name}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
  });
};

export const approveRequest = async (id: string) => {
  return await fetch(`http://localhost:5000/admin/approvereq/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    }
  })
}

export const rejectRequest = async (id: string, rejectData:rejectData) => {
  return await fetch(`http://localhost:5000/admin/rejectreq/${id}`, {
    method: "PATCH",
    body: JSON.stringify(rejectData),
    headers: {
      "Content-Type": "application/json"
    }
  })
}