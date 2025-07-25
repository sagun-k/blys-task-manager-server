import {Priority} from "../../enums/Priority";

/**
 * @openapi
 * components:
 *   schemas:
 *     UpdateTaskRequest:
 *       type: object
 *       required:
 *         - id
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "a3bb189e-8bf9-3888-9912-ace4e6543002"
 *         title:
 *           type: string
 *           example: "Finish report"
 *         description:
 *           type: string
 *           example: "Complete the quarterly financial report."
 *         priority:
 *           type: string
 *           enum:
 *             - LOW
 *             - MEDIUM
 *             - HIGH
 *           example: HIGH
 *         endDate:
 *           type: string
 *           format: date-time
 *           example: "2025-07-31T17:00:00Z"
 */
export interface UpdateTaskRequest {
    id: string;
    title?: string;
    description?: string;
    priority?: Priority;
    endDate?: string;
}
