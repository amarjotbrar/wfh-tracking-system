import { OrganizationLoginData, OrganizationUserData, createRequestData } from "../types";

export const createOrganizationUser = async (addOrgUser: OrganizationUserData) => {
  console.log(addOrgUser);
    const response = await fetch("http://localhost:5000/user/register", {
      method: "POST",
      body: JSON.stringify(addOrgUser),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
};

export const loginOrganizationUser = async (loginData: OrganizationLoginData) => {
  const response = await fetch("http://localhost:5000/user/login",{
    method: "POST",
    body: JSON.stringify(loginData),
    headers: {
      "Content-Type": "application/json"
    }
  });
return response;
}

export const createWfhRequest = async (requestData: createRequestData, token: string) => {
  const response = await fetch("http://localhost:5000/user/create-request",{
    method: "POST",
    body: JSON.stringify(requestData),
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    }
  });
  return response;
}

export const showWfhRequests = async (token: string, month:string) => {
  console.log(month);
  const response = await fetch(`http://localhost:5000/user/get-requests/${month}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    }
  })
  return response;
}
