import { Request, Response, NextFunction } from "express";
import organizationDao from "../dao/organization.dao.js";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload['user'][0]; 
        }
    }
}

const organizationDaoInstance = new organizationDao();

export const sysAuthorization = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({code:401, data:{error: "You are unauthorized!" ,response: ""}});
    }

    jwt.verify(token, `${process.env.JWTKEY}`, (err, decoded) => {
        if (err) {
            return res.status(400).json({ code:400, data:{error: `Unauthorized access(invalid token): ${err.message}`, response: ""}});
        }
        req.user = decoded;
        if(req.user.userType != "system") {
            return res.status(400).json({ code:400, data:{error: `Unauthorized access`, response: ""}});
        }
        
        next();
    });
};

export const orgAuthorization = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(400).json({code:400, data:{error: "You are unauthorized! (no token)" ,response: ""}});
    }

    jwt.verify(token, `${process.env.JWTKEY}`, (err, decoded) => {
        if (err) {
            return res.status(400).json({ code:400, data:{error: `Unauthorized access(invalid token): ${err.message}`}});
        }
        req.user = decoded;
        if(req.user.userType != "user") {
            return res.status(400).json({ code:400, data:{error: `Unauthorized access`}});
        }

        async () => {
            const orgActive = await organizationDaoInstance.checkStatus(req.user.org_name);
            if(orgActive == true) return res.status(400).json({ code:400, data:{error: `Organization Inactive`}});
        }
        
        next();
    });
};

export const adminAuthorization = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(400).json({code:400, data:{error: "You are unauthorized! (no token)" }});
    }

    jwt.verify(token, `${process.env.JWTKEY}`, (err, decoded) => {
        if (err) {
            return res.status(400).json({ code:400, data:{error: `Unauthorized access(invalid token): ${err.message}`}});
        }
        req.user = decoded;
        if(req.user.userType != "admin") {
            return res.status(400).json({ code:400, data:{error: `Unauthorized access`}});
        }

        async () => {
            const orgActive = await organizationDaoInstance.checkStatus(req.user.org_name);
            if(orgActive == true) return res.status(400).json({ code:400, data:{error: `Organization Inactive`}});
        }
        
        next();
    });
};


