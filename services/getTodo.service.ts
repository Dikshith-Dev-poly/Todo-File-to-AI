import type { QueryOptions } from "../controllers/getTodo.controller.js";
import env from "../config/env.js";
import getTodoRepo from "../repositories/getTodoRepo.js";
import type { getDataT } from "../types/dbMethodTypes.js";
import type { todoType } from "../db/mongodb/TodoModel.js";

export interface getOptionsT {
    page: number,
    completed?: "false" | "true" | undefined
    priority?: "high" | "medium" | "low" | undefined
    limit: number,
    skip: number
}




export default async function getTodoService(queryOptions: QueryOptions) {
    const page = queryOptions.page || 1;
    const completed = queryOptions.completed;
    const priority = queryOptions.priority;
    const limit = env.LIMIT || 10;
    let dbQueryOptions: getOptionsT;
    const skip = (page - 1) * limit;

    if (completed === undefined && priority === undefined) {
        dbQueryOptions = { page, limit, skip };
    } else if (completed === undefined) {
        dbQueryOptions = { page, priority, limit, skip };
    } else if (priority === undefined) {
        dbQueryOptions = { page, completed: completed, limit, skip };
    } else {
        dbQueryOptions = { page, completed: completed, priority, limit, skip };
    }
    const dbResult = await getTodoRepo(dbQueryOptions)

    return {
        totalPage: Math.ceil(dbResult?.total! / limit),
        page,
        limit,
        hasPrev: page > 1 ? true : false,
        hasNext: page < Math.ceil(dbResult?.total! / limit) ? true : false,
        data: dbResult?.data
    }

}