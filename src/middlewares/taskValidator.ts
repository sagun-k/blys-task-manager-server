import { body } from "express-validator";
import { TaskStatus } from "../enums/TaskStatus";
import {Priority} from "../enums/Priority";

export const createTaskValidation = [
    body("title").isString().notEmpty().withMessage("Title is required"),
    body("description").isString().notEmpty().withMessage("Description is required"),
        body("status")
            .optional()
            .isIn(Object.values(TaskStatus))
            .withMessage(`Invalid status, must be one of: ${Object.values(TaskStatus).join(", ")}`),

        body("priority")
            .optional()
            .isIn(Object.values(Priority))
            .withMessage(`Invalid priority, must be one of: ${Object.values(Priority).join(", ")}`),
    body("endDate")
        .isISO8601()
        .toDate()
        .withMessage("EndDate must be a valid ISO 8601 date"),
    body("assignedTo").optional().isUUID().withMessage("AssignedTo must be a valid UUID"),
];

export const updateStatusTaskValidation = [
    body("status")
        .notEmpty()
        .isIn(Object.values(TaskStatus))
        .withMessage(`Invalid status, must be one of: ${Object.values(TaskStatus).join(", ")}`),
];
