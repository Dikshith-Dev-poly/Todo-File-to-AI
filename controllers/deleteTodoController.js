import deleteTodo from "../services/deleteTodo.js";

export default async function (req, res) {
    const { id } = req.params;
    const deletedTodo = await deleteTodo(id);
    if (deletedTodo.ok) {
        return res.status(204).json({ success: true });
    } else {
        return res.status(400).json({ success: false, message: deletedTodo?.message || "Server Down" });
    }
}