import type { RequestHandler } from "express";
import type { ApiResponse } from "../types/response.js";

const deleteTodo: RequestHandler = async (req, res) => {
    const response: ApiResponse = { success: true, message: "Todo Deleted" };
    res.status(200).json(response);
}

export default deleteTodo;