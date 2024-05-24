type systemUser = {
    firstName: String,
    lastName: String,
    email: String,
    dob: Date,
    isVerified: boolean,
}

type organizationUser = {
    firstName: String,
    lastName: String,
    email: String,
    org_name: String,
    dob: Date,
    doj: Date,
    isVerified: boolean
}

type orgType = {
    org_name: String,
    name: String,
    maxWfhDays: number,
    isActive: boolean
}

type systemUserLogin = {
    email: String,
    otp: String
}

type organizationUserLogin = {
    email: String,
    org_name: String,
    otp: String
}

interface createLink {
    email: String,
    org_name: String
}


interface wfhRequestData {
    details: String,
    requestDate: String
}

interface orgUserTokenData {
    firstName: String,
    email: String,
    org_name: String,
    maxWfhDays: number
}

interface createWfhRequest {
    details: String,
    requestDate: String,
    firstName: String,
    email: String,
    org_name: String,
}

interface makeOrganizationLiveData {
    id: String,
    name: String,
    maxWfhDays: number,
}