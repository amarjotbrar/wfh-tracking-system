import { OrganizationOtp, SystemOtp } from "../types";

export const organizationUserOtp = async (otpData: OrganizationOtp) => {
        return await fetch("http://localhost:5000/org/sendotp", {
        method: "POST",
        body: JSON.stringify(otpData),
        headers: {
          "Content-Type": "application/json",
        },
      });
  };

export const systemUserOtp = async (otpData: SystemOtp ) => {
    return await fetch("http://localhost:5000/sys/sendotp", {
        method: "POST",
        body: JSON.stringify(otpData),
        headers: {
          "Content-Type": "application/json",
        },
      });
}