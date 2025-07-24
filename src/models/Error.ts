/**
 * @openapi
 * components:
 *   schemas:
 *     Error:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           example: "Unauthorized: Invalid token"
 *       required:
 *         - error
 */
export interface ErrorResponse {
    error: string;
}
