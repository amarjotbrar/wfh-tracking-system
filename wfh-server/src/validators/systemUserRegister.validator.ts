import {z} from 'zod';

const systemUserValidator = z.object({
    firstName: z.string({ required_error: "First Name is required!" }).trim().min(3, { message: "First name should be 3 characters" }),
    lastName: z.string({ required_error: "Last Name is required!" }).trim().min(3, { message: "Last name should be 3 characters" }),
    email: z.string({ required_error: "Email is required!" }).email({ message: "Invalid email address" }),
    dob: z.string({required_error: "Date is required!"}),
    isVerified: z.boolean({ required_error: "Doesn't have verified token!" }),
});


export {systemUserValidator};