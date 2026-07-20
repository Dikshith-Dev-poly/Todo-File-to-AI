import type { RequestHandler } from "express";
import type { ApiResponse } from "../types/response";

const updateTodo: RequestHandler = async (req, res) => {
    const response: ApiResponse = { success: true, message: "Todo Updated" };
    res.status(200).json(response);
}

export default updateTodo;