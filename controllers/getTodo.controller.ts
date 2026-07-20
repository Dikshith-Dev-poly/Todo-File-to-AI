import type { RequestHandler } from "express";
import type { ApiResponse } from "../types/response";

const getTodos: RequestHandler = async (req, res) => {
    const response: ApiResponse = { success: true, message: "GET all TODO" };
    res.status(200).json(response);
}

export default getTodos;