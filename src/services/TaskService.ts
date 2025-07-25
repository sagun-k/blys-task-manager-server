﻿import prisma from "../lib/prisma";
import {CreateTaskRequest} from "../models/tasks/CreateTaskRequest";
import {Sort} from "../enums/Sort";
import {OrderBy} from "../enums/OrderBy";
import {TaskStatus} from "../enums/TaskStatus";
import {PaginationResponse} from "../models/PaginationResponse";
import {Task} from "../models/tasks/Task";
import {TaskStats} from "../models/tasks/TaskStats";
import {UpdateTaskRequest} from "../models/tasks/UpdateTaskRequest";
import {UpdateTaskStatusRequest} from "../models/tasks/UpdateTaskStatusRequest";

export class TaskService {
    static async create(task: CreateTaskRequest, userId: string) {
        return prisma.task.create({
            data: {
                ...task,
                status: TaskStatus.PENDING,
                createdBy: userId,
                lastUpdatedBy: userId,
                endDate: new Date(task.endDate),
            },
        });
    }

    static async getAllInPaginatedForm(
        userId: string,
        page = 1,
        limit = 10,
        sortBy: Sort = Sort.EndDate,
        sortOrder: OrderBy = OrderBy.Asc,
    ): Promise<PaginationResponse<Task>> {
        const skip = (page - 1) * limit;
        const [total, tasks] = await prisma.$transaction([
            prisma.task.count({
                where: { createdBy: userId },
            }),
            prisma.task.findMany({
                where: { createdBy: userId },
                orderBy: {
                    [sortBy]: sortOrder,
                },
                skip,
                take: limit,
            }),
        ]);

        return {
            data: tasks as Task[],
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    static async update(taskId: string, updates: Partial<UpdateTaskRequest>, userId: string) {
        return prisma.task.update({
            where: { id: taskId },
            data: {
                ...updates,
                lastUpdatedBy: userId,
                endDate: updates.endDate ? new Date(updates.endDate) : undefined,
            },
        });
    }

    static async delete(taskId: string, userId: string) {
        return prisma.task.delete({
            where: { id: taskId },
        });
    }

    static async getTaskStats(userId: string): Promise<TaskStats> {
        const [
            total,
            pending,
            inProgress,
            completed,
            low,
            medium,
            high,
        ] = await prisma.$transaction([
            prisma.task.count({
                where: { createdBy: userId },
            }),
            prisma.task.count({
                where: { createdBy: userId, status: "PENDING" },
            }),
            prisma.task.count({
                where: { createdBy: userId, status: "IN_PROGRESS" },
            }),
            prisma.task.count({
                where: { createdBy: userId, status: "COMPLETED" },
            }),
            prisma.task.count({
                where: { createdBy: userId, priority: "LOW" },
            }),
            prisma.task.count({
                where: { createdBy: userId, priority: "MEDIUM" },
            }),
            prisma.task.count({
                where: { createdBy: userId, priority: "HIGH" },
            }),
        ]);

        return {
            total,
            status: {
                pending,
                inProgress,
                completed,
            },
            priority: {
                low,
                medium,
                high,
            },
        };
    }

    static async updateTaskStatus(taskId: string, request: UpdateTaskStatusRequest) {
        return prisma.task.update({
            where: { id: taskId },
            data: { status: request.status },
        });
    }


}
