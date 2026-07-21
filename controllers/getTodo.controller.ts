import type { RequestHandler } from "express";
import type { ApiResponse } from "../types/response.js";
import { z } from "zod";
import getTodoService from "../services/getTodo.service.js";




const queryOptions = z.object({
    page: z.coerce.number().int().min(1).default(1),
    priority: z.enum(["high", "low", "medium"]).optional(),
    completed: z.enum(["true", "false"]).optional()
})

export type QueryOptions = z.infer<typeof queryOptions>;



const getTodos: RequestHandler = async (req, res, next) => {
    try {
        let response: ApiResponse;
        const parsedQuery = queryOptions.safeParse(req.query);
        if (!parsedQuery.success) {
            response = { success: false, message: "Invalid query" };
            return res.status(400).json(response);
        }
        const result = await getTodoService(parsedQuery.data);
        response = { success: true, message: "Data fetched Successfully", data: result };
        res.status(200).json(response);
    } catch (err) {
        next(err);
    }
}

export default getTodos;