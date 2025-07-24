import { Router } from "express";
import { authenticateJWT } from "../../middlewares/authMiddleware";
import { createTaskValidation } from "../../middlewares/taskValidator";
import { validateRequest } from "../../middlewares/validateRequest";
import { TaskController } from "../../controllers/TaskController";

const taskRouter = Router();

taskRouter.use(authenticateJWT);

/**
 * @openapi
 * /api/v1/tasks:
 *   post:
 *     operationId: createTask
 *     summary: Create a new task
 *     tags:
 *       - Tasks
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTaskRequest'
 *     responses:
 *       201:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 */
taskRouter.post("/", createTaskValidation, validateRequest, TaskController.create);

/**
 * @openapi
 * /api/v1/tasks:
 *   get:
 *     operationId: getTasks
 *     summary: Get paginated list of tasks for authenticated user
 *     tags:
 *       - Tasks
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of tasks per page
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [createdAt, endDate, priority, status]
 *           default: createdAt
 *         description: Field to sort by
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *         description: Sort order
 *     responses:
 *       200:
 *         description: List of tasks
 *         content:
 *           application/json:
 *       401:
 *         description: Unauthorized - invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
taskRouter.get("/", TaskController.getAll);

/**
 * @openapi
 * /api/v1/tasks/{id}:
 *   put:
 *     operationId: updateTask
 *     summary: Update an existing task
 *     tags:
 *       - Tasks
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateTaskRequest'
 *     responses:
 *       200:
 *         description: Updated task object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Task not found
 */
taskRouter.put("/:id", TaskController.update);

/**
 * @openapi
 * /api/v1/tasks/{id}:
 *   delete:
 *     operationId: deleteTask
 *     tags:
 *       - Tasks
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Task ID
 *     responses:
 *       204:
 *         description: Task deleted successfully (no content)
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Task not found
 */
taskRouter.delete("/:id", TaskController.delete);

/**
 * @openapi
 * /api/v1/tasks/stats:
 *   get:
 *     operationId: getTaskStats
 *     tags:
 *       - Tasks
 *     summary: Get statistics of tasks for the authenticated user
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Task statistics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaskStats'
 *       401:
 *         description: Unauthorized - invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
taskRouter.get("/stats", TaskController.getTaskStats);

export default taskRouter;
