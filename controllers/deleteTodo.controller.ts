import type { RequestHandler } from "express";
import { objectId } from "../db/mongodb/TodoModel.js";
import deleteTodoService from "../services/deleteTodo.service.js";

const deleteTodo: RequestHandler = async (req, res) => {
    const parseId = objectId.safeParse(req.params.id);
    if (!parseId.success) {
        return res.status(400).json({ success: false, message: "Invalid id" });
    }
    try {
        await deleteTodoService(parseId.data);
        return res.status(200).json({ success: true, message: "Deleted successfully" });
    } catch (err) {
        res.status(404).json({ success: false, message: "Invalid id" });
    }
}

export default deleteTodo;