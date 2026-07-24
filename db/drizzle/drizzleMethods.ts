import { and, eq } from "drizzle-orm";
import type { dbMethod } from "../../types/dbMethodTypes.js";
import drizzledb from "./drizzleConnect.js";
import { DrizzleTodo } from "./TodoSchema.js";





const drizzleMethods: dbMethod = {
    getAll: async (limit, skip) => {
        const total = await drizzledb.$count(DrizzleTodo);
        const result = await drizzledb.select({ title: DrizzleTodo.title, description: DrizzleTodo.description, priority: DrizzleTodo.priority, completed: DrizzleTodo.completed }).from(DrizzleTodo).limit(limit).offset(skip);
        return {
            total, data: result
        }
    },
    getCompleted: async (limit, skip, completed) => {
        const total = await drizzledb.$count(DrizzleTodo, eq(DrizzleTodo.completed, completed));
        const result = await drizzledb.select({ title: DrizzleTodo.title, description: DrizzleTodo.description, priority: DrizzleTodo.priority, completed: DrizzleTodo.completed }).from(DrizzleTodo).where(eq(DrizzleTodo.completed, completed)).offset(skip).limit(limit);
        return { total, data: result };
    },
    getPriority: async (limit, skip, priority) => {
        const total = await drizzledb.$count(DrizzleTodo, eq(DrizzleTodo.priority, priority));
        const result = await drizzledb.select({ title: DrizzleTodo.title, description: DrizzleTodo.description, priority: DrizzleTodo.priority, completed: DrizzleTodo.completed }).from(DrizzleTodo).where(eq(DrizzleTodo.priority, priority)).offset(skip).limit(limit);
        return { total, data: result };
    },
    getByCompletedAndPriority: async (limit, skip, completed, priority) => {
        const total = await drizzledb.$count(DrizzleTodo, and(eq(DrizzleTodo.priority, priority), eq(DrizzleTodo.completed, completed)));
        const result = await drizzledb.select({ title: DrizzleTodo.title, description: DrizzleTodo.description, priority: DrizzleTodo.priority, completed: DrizzleTodo.completed }).from(DrizzleTodo).where(and(eq(DrizzleTodo.priority, priority), eq(DrizzleTodo.completed, completed))).offset(skip).limit(limit);
        return { total, data: result };
    },
    createTodo: async (data) => {
        const [result] = await drizzledb.insert(DrizzleTodo).values(data).returning({ id: DrizzleTodo.id, title: DrizzleTodo.title, description: DrizzleTodo.description, priority: DrizzleTodo.priority, completed: DrizzleTodo.completed });
        if (!result) {
            throw new Error("Failed to create todo");
        }
        return { data: result };
    },
    updateTodo: async (id, data) => {
        const [result] = await drizzledb.update(DrizzleTodo).set(data).where(eq(DrizzleTodo.id, id)).returning({ title: DrizzleTodo.title, description: DrizzleTodo.description, priority: DrizzleTodo.priority, completed: DrizzleTodo.completed });
        if (!result) {
            throw new Error("Failed to create todo");
        }
        return { data: result };
    },
    deleteTodo: async (id) => {
        const [result] = await drizzledb.delete(DrizzleTodo).where(eq(DrizzleTodo.id, id)).returning({ title: DrizzleTodo.title });
        if (!result) {
            throw new Error("Invalid id");
        }
    }
}

export default drizzleMethods;