type SystemUser = {
    firstName: String,
    lastName: String,
    email: String,
    dob: Date,
    isVerified: boolean,
}

type OrganizationUser = {
    firstName: String,
    lastName: String,
    email: String,
    org: String,
    dob: Date,
    doj: Date,
    isVerified: boolean
}

type orgType = {
    org_name: String,
    name: String,
    maxWfhDays: number,
}