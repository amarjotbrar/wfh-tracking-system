import { OrganizationUserData } from "../ShowOrganizationUsers/types";

export type UserTableProps = {
    data: OrganizationUserData[];
    handleAdminClick: (id: string, value: boolean) => Promise<void>;
}