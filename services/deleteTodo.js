import Todo from "../model/Todo.js";

export default async function deleteTodo(id) {
    try {
        const deleted = await Todo.findById(id);
        if (!deleted) {
            return { ok: false, message: "Todo not found" };
        } else if (deleted.del === true) {
            return { ok: false, message: "Todo not found" };
        } else {
            deleted.del = true;
            await deleted.save();
            return { ok: true };
        }
    } catch (err) {
        console.log(err);
        if (err.namee === "CastError") {
            return { ok: false, message: "Invalid id" };
        }
        return { ok: false, message: "Server Down" };
    }
}