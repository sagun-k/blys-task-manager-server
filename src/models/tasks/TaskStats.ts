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
 *         pending:
 *           type: integer
 *           example: 10
 *         inProgress:
 *           type: integer
 *           example: 5
 *         completed:
 *           type: integer
 *           example: 5
 */

export interface TaskStats {
    total: number;
    pending:number;
    completed:number;
    inProgress:number;
}