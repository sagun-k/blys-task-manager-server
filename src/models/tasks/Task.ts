import {TaskStatus} from "../../enums/TaskStatus";
import {Priority} from "../../enums/Priority";

/**
 * @openapi
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "e7c9b932-82f7-4a36-bebd-81e6c28a872d"
 *         title:
 *           type: string
 *           example: "Finish report"
 *         description:
 *           type: string
 *           nullable: true
 *           example: "Complete the quarterly financial report."
 *         status:
 *           type: string
 *           enum:
 *             - PENDING
 *             - IN_PROGRESS
 *             - COMPLETED
 *           example: PENDING
 *         priority:
 *           type: string
 *           enum:
 *             - LOW
 *             - MEDIUM
 *             - HIGH
 *           example: MEDIUM
 *         endDate:
 *           type: string
 *           format: date-time
 *           example: "2025-07-31T17:00:00Z"
 *         assignedTo:
 *           type: string
 *           format: uuid
 *           nullable: true
 *           example: "b1e2f2d3-1234-5678-90ab-cdef12345678"
 *         createdBy:
 *           type: string
 *           format: uuid
 *           example: "c1a4e6f7-5678-1234-90ab-cdef98765432"
 *         lastUpdatedOn:
 *           type: string
 *           format: date-time
 *           example: "2025-07-25T14:30:00Z"
 *         lastUpdatedBy:
 *           type: string
 *           format: uuid
 *           example: "c1a4e6f7-5678-1234-90ab-cdef98765432"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2025-07-24T14:00:00Z"
 */


export interface Task {
    id: string;
    title: string;
    description?: string | null;
    status: TaskStatus;
    priority: Priority;
    endDate: Date;
    assignedTo?: string | null;
    createdBy: string;
    lastUpdatedOn: Date;
    lastUpdatedBy: string;
    createdAt: Date;
}
