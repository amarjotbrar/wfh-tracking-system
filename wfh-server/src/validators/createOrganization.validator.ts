import {z} from 'zod';

const createOrganizationValidator = z.object({
    org_name: z.string({ required_error: "org_name is required!" }).trim().min(3, { message: "First name should be 3 characters" }),
    name: z.string({ required_error: "Name of organization is required!" }).trim().min(3, { message: "Last name should be 3 characters" }),
    maxWfhDays: z.string({required_error: "Enter max WFH days!"}),
});

export {createOrganizationValidator};