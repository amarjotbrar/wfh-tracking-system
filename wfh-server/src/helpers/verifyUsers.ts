import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const verifyUser = async (req: Request, res: Response) => {
        const token: string= req.body.token;
        jwt.verify(token, `${process.env.JWTKEY}`, (err, decoded) => {
        if (err) {
            res.status(400).json({ code:400 , data:{error:`Unauthorized access(invalid token): ${err.message}`, response: ""} });
        }
        else res.status(200).json({code: 200, data:{error: "", response:decoded}});
    });
}