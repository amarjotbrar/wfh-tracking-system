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

type systemUserLogin = {
    email: String,
    otp: String
}

type organizationUserLogin = {
    email: String,
    org_name: String,
    otp: String
}