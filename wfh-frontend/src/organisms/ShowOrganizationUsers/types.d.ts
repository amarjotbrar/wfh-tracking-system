export type showUserProps = {
    org_name: string;
    closePopup : () => void;
}

export type OrganizationUserData = {
    firstName: string;
    lastName: string;
    email: string;
    org_name: string;
    dob: string;
    doj: string;
    isAdmin: boolean;
    isVerified: boolean;
  };

export type User = {
    userdata: OrganizationUserData;
}