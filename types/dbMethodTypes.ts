import type { typeTodo } from "../controllers/createTodo.controller.js";
import type { updateType } from "../controllers/updateTodo.controller.js";


export interface getDataT<T = unknown> {
    total: number
    data: T[]
}


export interface dbMethod {
    getAll: (limit: number, skip: number) => Promise<getDataT<unknown>>,
    getCompleted: (limit: number, skip: number, completed: boolean) => Promise<getDataT<unknown>>,
    getPriority: (limit: number, skip: number, priority: "high" | "low" | "medium") => Promise<getDataT<unknown>>,
    getByCompletedAndPriority: (limit: number, skip: number, completed: boolean, priority: "high" | "low" | "medium") => Promise<getDataT<unknown>>,
    createTodo: (data: typeTodo) => Promise<{ data: typeTodo & { id: string } }>,
    updateTodo: (id: string, data: updateType) => Promise<{ data: updateType }>,
    deleteTodo: (id: string) => Promise<void>
}