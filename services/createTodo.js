import Todo from "../model/Todo.js";

export default async function createTodo(data) {
    try {
        const created = await Todo.insertOne({ "t": data.title, "d": data.description });
        return { ok: true, data: { title: created.t, description: created.d, completed: created.c } };
    } catch (err) {
        if (err.name === "ValidationError") {
            return { ok: false, message: "Invalid input" };
        }
        return { ok: false };
    }
}


