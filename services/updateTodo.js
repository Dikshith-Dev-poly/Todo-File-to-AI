import Todo from "../model/Todo.js";
export default async function updateTodo(id, body) {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(id, { t: body.title, d: body.description }, { returnDocument: "after", runValidators: true }).select("t d c");
        if (!updatedTodo) {
            return { ok: false, message: "Invalid id" };
        }
        return { ok: true, data: { title: updatedTodo.t, description: updatedTodo.d, completed: updatedTodo.c } };
    } catch (err) {
        if (err.name === "CastError") {
            return { ok: false, message: "Invalid id" };
        } else if (err.name === "ValidationError") {
            return { ok: false, message: "Invalid input" };
        }
        return { ok: false, message: "Server down" };
    }
}

