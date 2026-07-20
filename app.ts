import express, { type Request, type Response, type NextFunction } from "express";
import todoRoute from "./routes/todo.routes.ts";
import type { ApiResponse } from "./types/response.ts"
const app = express();


app.use("/api/v3/", todoRoute);

app.use((req: Request, res: Response, next: NextFunction) => {
    const response: ApiResponse = {
        success: false,
        message: "Page not found.Navigate to /api/v3/"
    }
    res.status(404).json(response);
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    const response: ApiResponse = {
        success: false,
        message: err.message
    }
    console.error(err?.message);
    res.status(500).json(response)
})


export default app;