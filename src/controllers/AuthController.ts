import { Request, Response } from "express";
import { AuthenticationService } from "../services/AuthenticationService";
import {CreateUserRequest} from "../models/auth/CreateUserRequest";
import {LoginRequest} from "../models/auth/LoginRequest";

export class AuthController {
    static async register(req: Request<{}, {}, CreateUserRequest>, res: Response) {
        try {
            const { email, name, password } = req.body;
            const user = await AuthenticationService.register(email, name, password);
            res.status(201).json(user);
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
    }

    static async login(req: Request<{}, {}, LoginRequest>, res: Response) {
        try {
            const { email, password } = req.body;
            const {user, token} = await AuthenticationService.login(email, password);
            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 1000 * 60 * 60,
                sameSite: process.env.NODE_ENV === "production"? "none":'strict',
                path: "/",
            });
            res.json(user);
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
    }

    static async checkAuth(req: Request<{}, {}, LoginRequest>, res: Response) {
        try {
            const userId = (req as any).user?.userId;
            const {user} = await AuthenticationService.checkAuth(userId);
            res.json(user);
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
    }

    static async logout(req: Request, res: Response) {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite:process.env.NODE_ENV === "production"? "none":'strict',
            path: "/",
        });
        res.status(200).json({ message: "Successfully logged out" });
    }
}
