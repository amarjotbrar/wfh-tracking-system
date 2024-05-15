export type showUserProps = {
    org_name: string,
    close : () => void
}

export type OrganizationUserData = {
    firstName: string;
    lastName: string;
    email: string;
    org: string;
    dob: string;
    doj: string;
    isAdmin: boolean;
    isVerified: boolean;
  };

export type User = {
    userdata: OrganizationUserData;
}