import { requestData } from "../OrganizationUserCalander/types"

type RequestDetailsProps = {
    hideDetails: () => void;
    requestDetails: requestData | null;
    requestDate: string;
}