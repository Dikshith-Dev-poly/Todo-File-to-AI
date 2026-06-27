import { Schema, model } from "mongoose";


const todoSchema = new Schema({
    t: { type: String, maxLength: 60, alias: "title", required: true, trim: true },
    d: { type: String, maxLength: 500, alias: "description", trim: true, required: true },
    c: { type: Boolean, default: false, alias: "completed" },
    del: { type: Boolean, default: false, alias: "deleted" },
}, { timestamps: true });


const Todo = model("Todo", todoSchema);


export default Todo;