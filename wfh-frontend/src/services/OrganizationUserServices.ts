import { OrganizationUserData } from "./types";

export const CreateOrganizationUser = async (addOrgUser: OrganizationUserData) => {
  return await fetch("http://localhost:5000/org/register", {
    method: "POST",
    body: JSON.stringify(addOrgUser),
    headers: {
      "Content-Type": "application/json",
    },
  });
};