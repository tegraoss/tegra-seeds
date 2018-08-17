import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

export interface ITokenUser {
    email: string;
    id: number;
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    if (req.method === "OPTIONS") {
        return next();
    }

    if (!req.headers.authorization) {
        res.status(401).json({ error: "No authorization present" });
        return;
    }

    try {
        const authorization = req.get("Authorization");
        const [tokenType, token] = authorization.split(" ");
        if (tokenType.toLowerCase() !== "bearer") {
            throw "Tipo de autorização inválida. A autorização deve ser do tipo 'bearer'";

        }
        if (!token) {
            throw "Autorização inválida";
        }
        req.token = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        res.status(401).json({ error: err });
        return;
    } finally {
        next();
    }


    // const authHeaders = req.headers.authorization;

    // try {
    //     const decoded: ITokenUser = jwt.verify(authHeaders, process.env.JWT_SECRET);
    //     req.token = decoded;
    //     next();
    // } catch (err) {
    //     res.status(401).json({ error: "Invalid authorization" });
    //     return;
    // }

    //next();
};
