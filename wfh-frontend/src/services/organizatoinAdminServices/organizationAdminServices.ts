import { rejectData } from "../types";

export const showRequests = async (org_name: string, token: string) => {
    return await fetch(`http://localhost:5000/admin/showrequests/${org_name}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    },
  });
};

export const approveRequest = async (id: string, token: string) => {
  return await fetch(`http://localhost:5000/admin/approvereq/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    }
  })
}

export const rejectRequest = async (id: string, rejectData:rejectData, token:string) => {
  return await fetch(`http://localhost:5000/admin/rejectreq/${id}`, {
    method: "PATCH",
    body: JSON.stringify(rejectData),
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    }
  })
}