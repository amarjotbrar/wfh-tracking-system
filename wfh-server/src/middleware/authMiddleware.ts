import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload['user'][0]; 
        }
    }
}

export const systemAuthorization = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(400).json({code:400, data:{error: "You are unauthorized! (no token)" ,response: ""}});
    }

    jwt.verify(token, `${process.env.JWTKEY}`, (err, decoded) => {
        console.log(err);
        if (err) {
            return res.status(400).json({ code:400, data:{error: `Unauthorized access(invalid token): ${err.message}`, response: ""}});
        }

        req.user = decoded;
        
        next();
    });
};

export const organizationAuthorization = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(400).json({code:400, data:{error: "You are unauthorized! (no token)" ,response: ""}});
    }

    jwt.verify(token, `${process.env.JWTKEY}`, (err, decoded) => {
        console.log(err);
        if (err) {
            return res.status(400).json({ code:400, data:{error: `Unauthorized access(invalid token): ${err.message}`, response: ""}});
        }
        req.user = decoded;
        
        next();
    });
};



