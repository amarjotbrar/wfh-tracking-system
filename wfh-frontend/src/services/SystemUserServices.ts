import { OrganizationData, SystemUserData } from "./types";

export const CreateOrganization = async (addOrgUser: OrganizationData) => {
  return await fetch("http://localhost:5000/sys/createorg", {
    method: "POST",
    body: JSON.stringify(addOrgUser),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const CreateSystemUser = async (addSysUser: SystemUserData) => {
    return await fetch("http://localhost:5000/sys/register", {
      method: "POST",
      body: JSON.stringify(addSysUser),
      headers: {
        "Content-Type": "application/json",
      },
    });
};
export const DeleteOrganization = async (id: string) => {
    return await fetch(`http://localhost:5000/sys/deleteorg/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
};