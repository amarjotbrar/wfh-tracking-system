import { OrganizationLoginData, OrganizationUserData } from "../types";

export const createOrganizationUser = async (addOrgUser: OrganizationUserData) => {
    const response = await fetch("http://localhost:5000/org/register", {
      method: "POST",
      body: JSON.stringify(addOrgUser),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
};

export const loginOrganizationUser = async (loginData: OrganizationLoginData) => {
  const response = await fetch("http://localhost:5000/org/login",{
    method: "POST",
    body: JSON.stringify(loginData),
    headers: {
      "Content-Type": "application/json"
    }
  });
return response;
}
