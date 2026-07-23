import type { RequestHandler } from "express";
import { objectId } from "../db/mongodb/TodoModel.js";
import z from "zod";
import updateTodoService from "../services/updateTodo.service.js";


const updateSchema = z.object({
    title: z.string().min(1).max(60).optional(),
    description: z.string().max(500).optional().nullable().default(""),
    priority: z.enum(["low", "medium", "high"]).optional(),
    completed: z.boolean().optional()
})

export type updateType = z.infer<typeof updateSchema>;

const updateTodo: RequestHandler = async (req, res) => {
    const parseParam = objectId.safeParse(req.params.id);
    if (!parseParam.success) {
        return res.status(400).json({
            success: false, message: "Invalid id"
        });
    }
    const parseBody = updateSchema.safeParse(req.body);
    if (!parseBody.success) {
        return res.status(400).json({ success: false, message: "Invalid data" });
    }
    try {
        const result = await updateTodoService(parseParam.data, parseBody.data);
        res.status(200).json({ success: true, message: "Updated Successfully", data: result.data });
    } catch (err) {
        res.status(404).json({ success: false, message: "Invalid id" });
    }
}

export default updateTodo;