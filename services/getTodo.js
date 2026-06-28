import { get } from "mongoose";
import Todo from "../model/Todo.js";

async function getTodo(page, limit = 20) {
    try {
        const total = await Todo.estimatedDocumentCount();
        const totalPage = Math.ceil(total / limit);

        const pagination = {
            page,
            limit,
            total,
            totalPage,
            hasNext: page < totalPage,
            hasPrev: page > 1,
        }
        if (page > totalPage && total > 0) {
            return { data: [], pagination };
        };


        const skip = (page - 1) * limit;
        const todos = await Todo.find({ del: false }).skip(skip).limit(limit).lean().select("t d c");
        const result = todos.map((todo) => {
            return {
                title: todo.t,
                description: todo.d,
                completed: todo.c
            }
        })
        return { ok: true, data: result, pagination };
    } catch (err) {
        return { ok: false };
    }
}

export default getTodo;