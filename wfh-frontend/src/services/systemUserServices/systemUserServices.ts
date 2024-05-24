import { OrganizationData, SystemLoginData, SystemUserData } from "../types";

export const createOrganization = async (addOrgUser: OrganizationData, token : string) => {
  return await fetch("http://localhost:5000/system/create-organization", {
    method: "POST",
    body: JSON.stringify(addOrgUser),
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    },
  });
};

export const createSystemUser = async (addSysUser: SystemUserData) => {
    const response = await fetch("http://localhost:5000/system/register", {
      method: "POST",
      body: JSON.stringify(addSysUser),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
};

export const deleteOrganization = async (id: string, token: string) => {
    return await fetch(`http://localhost:5000/system/delete-organization/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
    });
};

export const loginSystemUser = async (loginData :SystemLoginData ) => {
      return await fetch("http://localhost:5000/system/login",{
        method: "POST",
        body: JSON.stringify(loginData),
        headers: {
          "Content-Type": "application/json"
        }
      });
}

export const showAllOrganizations = async (token: string | null) => {
  return await fetch("http://localhost:5000/system/get-organizations",{
    headers:{
      'Authorization':`${token}`
    }
  });
}

export const showOrganizationUsers = async (org_name: string, token: string) => {
  return await fetch(`http://localhost:5000/system/get-users/${org_name}`,{
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization" : token
    }
  });
}

export const makeAdmin = async(id: string, token: string) => {
  return await fetch(`http://localhost:5000/system/change-admin/${id}`,{
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    }
  });
}