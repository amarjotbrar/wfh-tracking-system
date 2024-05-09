export type OrganizationUserData = {
  firstName: string;
  lastName: string;
  email: string;
  org: string;
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
}