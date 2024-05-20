import { OrganizationUserData } from "../ShowOrganizationUsers/types";

export type UserTableProps = {
    data: OrganizationUserData[];
    handleAdminClick: (id: string) => Promise<void>;
}