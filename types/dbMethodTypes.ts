import type { typeTodo } from "../controllers/createTodo.controller.js";
import type { updateType } from "../controllers/updateTodo.controller.js";
import type { todoType } from "../db/mongodb/TodoModel.js";


export interface getDataT<T = unknown> {
    total: number
    data: T[]
}


export interface dbMethod {
    getAll: (limit: number, skip: number) => Promise<getDataT<todoType>>,
    getCompleted: (limit: number, skip: number, completed: boolean) => Promise<getDataT<todoType>>,
    getPriority: (limit: number, skip: number, priority: "high" | "low" | "medium") => Promise<getDataT<todoType>>,
    getByCompletedAndPriority: (limit: number, skip: number, completed: boolean, priority: "high" | "low" | "medium") => Promise<getDataT<todoType>>,
    createTodo: (data: typeTodo) => Promise<{ data: typeTodo }>,
    updateTodo: (id: string, data: updateType) => Promise<{ data: updateType }>,
    deleteTodo: (id: string) => Promise<void>
}