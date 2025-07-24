import { Request, Response } from "express";
import { TaskService } from "../services/TaskService";
import {AuthRequest} from "../middlewares/authMiddleware";
import {Sort} from "../enums/Sort";
import {OrderBy} from "../enums/OrderBy";

export class TaskController {
    static async create(req: AuthRequest, res: Response) {
        const task = await TaskService.create(req.body, req.user!.userId);
        res.status(201).json(task);
    }

    static async getAll(req: AuthRequest, res: Response) {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const sort = req?.query?.sort as Sort || Sort.CreatedAt;
        const order = req?.query?.order as OrderBy || OrderBy.Desc;
        const tasks = await TaskService.getAllInPaginatedForm(req.user!.userId, page, limit, sort, order);
        res.json(tasks);
    }

    static async update(req: AuthRequest, res: Response) {
        const task = await TaskService.update(req.params.id, req.body, req.user!.userId);
        res.json(task);
    }

    static async delete(req: AuthRequest, res: Response) {
        await TaskService.delete(req.params.id, req.user!.userId);
        res.status(204).send();
    }
    
    static  async getTaskStats(req: AuthRequest, res: Response) {
        const stats = await TaskService.getTaskStats(req.user!.userId);
        res.json(stats);
    }
}
