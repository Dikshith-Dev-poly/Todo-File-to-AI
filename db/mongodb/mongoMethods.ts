import type { typeTodo } from "../../controllers/createTodo.controller.js";
import type { updateType } from "../../controllers/updateTodo.controller.js";
import type { dbMethod } from "../../types/dbMethodTypes.js";
import MongoTodo, { type todoType } from "./TodoModel.js";





const mongoMethods: dbMethod = {
    getAll: async (limit, skip) => {
        const totalDocument = await MongoTodo.estimatedDocumentCount();
        const result = await MongoTodo.find({}).select("title description priority completed -_id").lean().skip(skip).limit(limit).exec();
        return { total: totalDocument, data: result };
    },
    getCompleted: async (limit: number, skip: number, completed: boolean) => {
        const result = await MongoTodo.find({ completed }).select({ title: 1, description: 1, priority: 1, completed: 1, _id: 0 }).skip(skip).limit(limit).lean().exec();
        const total = await MongoTodo.countDocuments({ completed });
        return { total, data: result };
    },
    getPriority: async (limit, skip, priority) => {
        const result = await MongoTodo.find({ priority }).select({ title: 1, description: 1, priority: 1, completed: 1, _id: 0 }).skip(skip).limit(limit).lean().exec();
        const total = await MongoTodo.countDocuments({ priority });
        return { total, data: result };
    },
    getByCompletedAndPriority: async (limit, skip, completed, priority) => {
        const result = await MongoTodo.find({ completed, priority }).select({ title: 1, description: 1, priority: 1, completed: 1, _id: 0 }).skip(skip).limit(limit).lean().exec();
        const total = await MongoTodo.countDocuments({ completed, priority });
        return { total, data: result };
    },
    createTodo: async (data: typeTodo) => {
        const result = await MongoTodo.insertOne(data);
        return {
            data: {
                title: result.title, description: result.description ?? null, priority: result.priority, completed: result.completed
            }
        }
    },
    updateTodo: async (id: string, data: updateType) => {
        const result = await MongoTodo.findByIdAndUpdate(id, data, { returnDocument: "after" });
        if (result === null) {
            throw new Error("Invalid Id");
        }
        return { data: { title: result.title, description: result.description ?? "", priority: result.priority, completed: result.completed } };
    },
    deleteTodo: async (id: string) => {
        const result = await MongoTodo.findOneAndDelete({ _id: id });
        if (result === null) {
            throw new Error("Invalid Id");
        }
    }
}
export default mongoMethods;