import { JwtPayload } from "jwt-decode";

export interface RequestData{
    firstName: string,
    email: string,
    requestDate: string,
    details: string,
    isApproved: string
}

export interface tokenData extends JwtPayload{
    org_name: string,
    firstName: string,
    maxWfhDays: number
}

interface AdminDashboardProps {
    handleOrgName: (name: string) => void;
  }