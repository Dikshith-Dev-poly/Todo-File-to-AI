import { Schema, model, type InferSchemaType, type HydratedDocument } from "mongoose";



const todoSchema = new Schema({
    title: { type: String, required: [true, "Title is required"], maxLength: [60, "Title should be of length 60 character"], trim: true, index: true },
    description: { type: String, maxLength: 500, trim: true },
    priority: { type: String, enum: ["high", "medium", "low"], default: "low" },
    completed: { type: Boolean, default: false },
}, { timestamps: true });


export type todoType = InferSchemaType<typeof todoSchema>;
export type hydratedTodo = HydratedDocument<todoType>
const MongoTodo = model<todoType>("Todo", todoSchema);
export default MongoTodo;