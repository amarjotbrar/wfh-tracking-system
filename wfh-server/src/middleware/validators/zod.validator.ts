import { NextFunction, Request, Response  } from "express";
import { z, ZodError } from "zod";

// const zodValidator = (schema:any) => async (req: Request, res: Response, next: any) => {
//     await schema.parseAsync(req.body);
//     next();
// };

class zodValidator{
    public zodValidator(schema: z.ZodTypeAny){
        console.log("Zod validator working!");
        return (req: Request, res: Response, next: NextFunction) => {
            schema.parse(req.body);
            next();
        }
    }
}

export default zodValidator;