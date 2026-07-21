import type { todoType } from "../db/mongodb/TodoModel.js"


export interface getDataT<T = unknown> {
    total: number
    data: T[]
}


export interface dbMethod {
    getAll: (limit: number, skip: number) => Promise<getDataT<todoType>>,
    getCompleted: (limit: number, skip: number, completed: boolean) => Promise<getDataT<todoType>>,
    getPriority: (limit: number, skip: number, priority: "high" | "low" | "medium") => Promise<getDataT<todoType>>,
    getByCompletedAndPriority: (limit: number, skip: number, completed: boolean, priority: "high" | "low" | "medium") => Promise<getDataT<todoType>>,
}