import type { RequestHandler } from "express";
import type { ApiResponse } from "../types/response.js";
import { z } from "zod";
import createTodoService from "../services/createTodo.service.js";


const createTodoInput = z.object({
    title: z.string().max(60).min(1),
    description: z.string().max(500).nullable().default(null),
    priority: z.enum(["low", "medium", "high"]).optional().default("low"),
    completed: z.boolean().optional().default(false)
})

export type typeTodo = z.infer<typeof createTodoInput>;

const createTodo: RequestHandler = async (req, res) => {
    let response: ApiResponse;
    const parseRequest = createTodoInput.safeParse(req.body);
    if (!parseRequest.success) {
        response = { success: false, message: `Invalid input` };
        return res.status(400).json(response);
    }

    try {
        const result = await createTodoService(parseRequest.data);
        response = { success: true, message: "Todo created Successfully", data: result };
        res.status(201).json(response);
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to create Todo" });
    }
}

export default createTodo;