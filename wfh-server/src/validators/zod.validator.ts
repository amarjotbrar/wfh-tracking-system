import { Request, Response  } from "express";
import { ZodError } from "zod";

const zodValidator = (schema:any) => async (req: Request, res: Response, next: any) => {
    try {
        await schema.parseAsync(req.body);
        next();
    } catch (error) {
        if (error instanceof ZodError) {
            const validationErrors = error.errors.map(err => err.message);
            res.status(401).json({ success: false, errors: validationErrors });
        } else {
            console.error("Unexpected error:", error);
            res.status(500).json({ success: false, message: "Internal server error" });
        }
    }
};

export {zodValidator};