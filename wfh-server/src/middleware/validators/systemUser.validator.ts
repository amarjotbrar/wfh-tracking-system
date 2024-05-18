import {z} from 'zod';

export const systemUserValidator = z.object({
    firstName: z.string({ required_error: "First Name is required!" }).trim().min(3, { message: "First name should be 3 characters" }),
    lastName: z.string({ required_error: "Last Name is required!" }).trim().min(3, { message: "Last name should be 3 characters" }),
    email: z.string({ required_error: "Email is required!" }).email({ message: "Invalid email address" }),
    dob: z.string({required_error: "Date is required!"}),
    isVerified: z.boolean({ required_error: "Doesn't have verified token!" }),
});

export const createOrganizationValidator = z.object({
    org_name: z.string({ required_error: "org_name is required!" }).trim().min(3, { message: "First name should be 3 characters" }),
    name: z.string({ required_error: "Name of organization is required!" }).trim().min(3, { message: "Last name should be 3 characters" }),
    maxWfhDays: z.string({required_error: "Enter max WFH days!"}),
    isActive: z.boolean({required_error: "active status required"})
});