/**
 * @openapi
 * components:
 *   schemas:
 *     TaskStats:
 *       type: object
 *       properties:
 *         total:
 *           type: integer
 *           example: 20
 *         status:
 *           type: object
 *           properties:
 *             pending:
 *               type: integer
 *               example: 10
 *             inProgress:
 *               type: integer
 *               example: 5
 *             completed:
 *               type: integer
 *               example: 5
 *         priority:
 *           type: object
 *           properties:
 *             low:
 *               type: integer
 *               example: 7
 *             medium:
 *               type: integer
 *               example: 8
 *             high:
 *               type: integer
 *               example: 5
 */

export interface TaskStats {
    total: number;
    status: {
        pending: number;
        inProgress: number;
        completed: number;
    };
    priority: {
        low: number;
        medium: number;
        high: number;
    };
}
