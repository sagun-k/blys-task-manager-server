import { Request, Response, NextFunction } from "express";
import jwt, { TokenExpiredError, JsonWebTokenError } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export interface AuthRequest extends Request {
    user?: { userId: string; email: string };
}

export function authenticateJWT(req: AuthRequest, res: Response, next: NextFunction) {
    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; email: string };
        req.user = decoded;
        next();
    } catch (err) {
        if (err instanceof TokenExpiredError) {
            return res.status(401).json({ error: "Unauthorized: Token expired" });
        }
        if (err instanceof JsonWebTokenError) {
            return res.status(401).json({ error: "Unauthorized: Invalid token" });
        }
        return res.status(401).json({ error: "Unauthorized: Token verification failed" });
    }
}
