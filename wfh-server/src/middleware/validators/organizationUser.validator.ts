import {z} from 'zod';

export const organizationUserValidator = z.object({
    firstName: z.string({ required_error: "First Name is required!" }).trim().min(3, { message: "First name should be 3 characters" }),
    lastName: z.string({ required_error: "Last Name is required!" }).trim().min(3, { message: "Last name should be 3 characters" }),
    org: z.string({required_error: "Organization is required!"}),
    email: z.string({ required_error: "Email is required!" }).email({ message: "Invalid email address" }),
    dob: z.string({required_error: "Dob is required!"}),
    doj: z.string({required_error: "Doj is required!"}),
    isVerified: z.boolean({ required_error: "Doesn't have verified token!" }),
});