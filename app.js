import express from "express";
import dotenv from "dotenv";
import todoRoute from "./routes/todoRoutes.js";
import connectDB from "./lib/connectDB.js";

dotenv.config({ path: [".env", ".env.local"] });

const app = express();
connectDB();
app.use(express.json());


app.use("/todo/v2", todoRoute);

export default app;