export type requestData = {
    _id: string;
    firstName: string,
    email: string,
    org_name: string,
    requestDate: date,
    details: string,
    isApproved: string,
}

export type CalendarProps = {
    handleNavText: (text: string) => void;
}