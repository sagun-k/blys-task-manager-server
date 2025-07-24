/**
 * @openapi
 * components:
 *   schemas:
 *     PaginationResponse_Task_:
 *       type: object
 *       properties:
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Task'
 *         total:
 *           type: integer
 *           example: 42
 *         page:
 *           type: integer
 *           example: 2
 *         limit:
 *           type: integer
 *           example: 10
 *         totalPages:
 *           type: integer
 *           example: 5
 */
export interface PaginationResponse<T> {
    data: T[]
    total: number
    page: number
    limit: number
    totalPages: number
}