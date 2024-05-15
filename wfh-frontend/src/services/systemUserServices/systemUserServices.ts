import { OrganizationData, SystemLoginData, SystemUserData } from "../types";

export const createOrganization = async (addOrgUser: OrganizationData) => {
  return await fetch("http://localhost:5000/sys/createorg", {
    method: "POST",
    body: JSON.stringify(addOrgUser),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const createSystemUser = async (addSysUser: SystemUserData) => {
    const response = await fetch("http://localhost:5000/sys/register", {
      method: "POST",
      body: JSON.stringify(addSysUser),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
};

export const deleteOrganization = async (id: string) => {
    return await fetch(`http://localhost:5000/sys/deleteorg/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
};

export const loginSystemUser = async (loginData :SystemLoginData ) => {
      return await fetch("http://localhost:5000/sys/login",{
        method: "POST",
        body: JSON.stringify(loginData),
        headers: {
          "Content-Type": "application/json"
        }
      });
}

export const showAllOrganizations = async (token: string | null) => {
  return await fetch("http://localhost:5000/sys/showorgs",{
    headers:{
      'Authorization':`${token}`
    }
  });
}

export const showOrganizationUsers = async (getUsers: {org_name: string}) => {
  return await fetch(`http://localhost:5000/sys/showusers/ ${getUsers}`);
}