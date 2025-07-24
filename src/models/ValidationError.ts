/**
 * @openapi
 * components:
 *   schemas:
 *     ValidationError:
 *       type: object
 *       properties:
 *         errors:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               msg:
 *                 type: string
 *                 example: "Password must be at least 6 characters"
 *               param:
 *                 type: string
 *                 example: "password"
 *               location:
 *                 type: string
 *                 example: "body"
 */
export interface ValidationError {
    errors: Array<{
        msg: string;
        param: string;
        location: string;
    }>;
}
