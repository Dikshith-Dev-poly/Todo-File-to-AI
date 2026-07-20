import type { RequestHandler } from "express";
import type { ApiResponse } from "../types/response";

const home: RequestHandler = async (req, res) => {
    const response: ApiResponse = { success: true, message: "Welcome to version 3 of todo" }
    res.status(200).json(response);
}

export default home;