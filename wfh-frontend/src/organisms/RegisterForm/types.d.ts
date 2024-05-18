type InputFeild = React.ChangeEvent<HTMLInputElement>;
type FormSubmit = React.FormEvent<HTMLFormElement>;

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

  export type resultElement = {
    message: string;
  }