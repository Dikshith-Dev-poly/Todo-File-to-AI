import { Schema, model } from "mongoose";
import type { TodoInterface } from "../../types/todo.ts";



const todoSchema = new Schema({
    title: { type: String, required: [true, "Title is required"], maxLength: [60, "Title should be of length 60 character"], trim: true, index: true },
    description: { type: String, maxLength: 500, trim: true },
    priority: { type: String, enum: ["high", "medium", "low"], default: "low" },
    completed: { type: Boolean, default: false },
}, { timestamps: true });


const MongoTodo = model<TodoInterface>("Todo", todoSchema);
export default MongoTodo;