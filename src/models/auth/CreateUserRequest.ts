/**
 * @openapi
 * components:
 *   schemas:
 *     CreateUserRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: user@example.com
 *         name:
 *           type: string
 *           example: John Doe
 *         password:
 *           type: string
 *           minLength: 6
 *           example: strongpassword123
 */
export interface CreateUserRequest {
    email: string;
    name?: string;
    password: string;
}
