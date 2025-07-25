

import { TaskStatus } from "../../enums/TaskStatus";

/**
 * @openapi
 * components:
 *   schemas:
 *     UpdateTaskStatusRequest:
 *       type: object
 *       required:
 *         - status
 *       properties:
 *         status:
 *           type: string
 *           enum: [PENDING, IN_PROGRESS, COMPLETED]
 *           example: IN_PROGRESS
 */
export interface UpdateTaskStatusRequest {
    status: TaskStatus; 
}