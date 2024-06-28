import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload['user'][0]; 
        }
    }
}

export const verifyUser = async (req: Request, res: Response) =>{
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({code:401, data:{error: "You are unauthorized!" ,response: ""}});
    }

    jwt.verify(token, `${process.env.JWTKEY}`, (err, decoded) => {
        if (err) {
            return res.status(400).json({ code:400, data:{error: `Unauthorized access(invalid token): ${err.message}`}});
        }
        req.user = decoded;
        return res.status(200).json({code:200, data:{userType:req.user.userType}});
    });
}