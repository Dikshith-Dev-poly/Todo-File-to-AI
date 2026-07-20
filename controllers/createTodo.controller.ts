import type { RequestHandler } from "express";
import type { ApiResponse } from "../types/response.js";

const createTodo: RequestHandler = async (req, res) => {
    const response: ApiResponse = { success: true, message: "Todo created" };
    res.status(201).json(response);
}

export default createTodo;