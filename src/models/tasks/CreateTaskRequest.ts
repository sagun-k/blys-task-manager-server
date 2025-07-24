import {Priority} from "../../enums/Priority";
/**
 * @openapi
 * components:
 *   schemas:
 *     CreateTaskRequest:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - priority
 *         - endDate
 *       properties:
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
 *           example: MEDIUM`
 *         endDate:
 *           type: string
 *           format: date-time
 *           example: "2025-07-31T17:00:00Z"
 */
export interface CreateTaskRequest {
    title: string;
    description: string;
    priority: Priority;
    endDate: string;
}
