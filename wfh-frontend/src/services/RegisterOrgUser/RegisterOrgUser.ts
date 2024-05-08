import { UserData } from "./types";

export const createOrgUser = async (addOrgUser: UserData) => {
  return await fetch("http://localhost:5000/register/org", {
    method: "POST",
    body: JSON.stringify(addOrgUser),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
