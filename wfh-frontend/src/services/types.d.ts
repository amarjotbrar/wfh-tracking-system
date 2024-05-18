export type OrganizationUserData = {
  firstName: string;
  lastName: string;
  email: string;
  org_name: string;
  dob: string;
  doj: string;
  isVerified: boolean;
};

export type SystemUserData = {
    firstName: string;
    lastName: string;
    email: string;
    dob: string;
    isVerified: boolean;
};

export type OrganizationData = {
  org_name: string;
  name: string;
  maxWfhDays: number;
  isActive: boolean;
}

export type OrganizationLoginData = {
  email: string,
  org_name: string,
  otp: string
}

export type SystemLoginData = {
  email: string,
  otp: string
}

export type OrganizationOtp = {
  email: string,
  org_name: string
}

export type SystemOtp = {
  email: string
}

interface rejectData{
  reason:string
}