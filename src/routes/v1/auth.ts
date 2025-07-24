import { Router } from "express";
import { AuthController } from "../../controllers/AuthController";
import { registerValidation, loginValidation } from "../../middlewares/authValidator";
import { validateRequest } from "../../middlewares/validateRequest";
import {authenticateJWT} from "../../middlewares/authMiddleware";

const authRouter = Router();

/**
 * @openapi
 * /api/v1/auth/register:
 *   post:
 *     operationId: registerUser
 *     tags:
 *       - Authentication
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserRequest'
 *     responses:
 *       201:
 *         description: User successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
authRouter.post("/register", registerValidation, validateRequest, AuthController.register);

/**
 * @openapi
 * /api/v1/auth/login:
 *   post:
 *     operationId: loginUser
 *     tags:
 *       - Authentication
 *     summary: Login a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
authRouter.post("/login", loginValidation, validateRequest, AuthController.login);

/**
 * @openapi
 * /api/v1/auth/check-auth:
 *   get:
 *     operationId: checkAuth
 *     tags:
 *       - Authentication
 *     summary: Check if user is authenticated and return user info
 *     responses:
 *       200:
 *         description: User is authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
authRouter.get("/check-auth", authenticateJWT, AuthController.checkAuth);


/**
 * @openapi
 * /api/v1/auth/logout:
 *   post:
 *     operationId: logoutUser
 *     tags:
 *       - Authentication
 *     summary: Logout the user
 *     responses:
 *       200:
 *         description: Successfully logged out
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Successfully logged out
 */

authRouter.post("/logout", AuthController.logout);

export default authRouter;
