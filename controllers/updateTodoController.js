import updateTodo from "../services/updateTodo.js";

export default async function updateTodoController(req, res) {
    const { id } = req.params;
    const body = req.body;
    if (!("title" in body) || !("description" in body)) {
        return res.json({ success: false, message: "Invalid input" });
    }

    const updatedTodo = await updateTodo(id, body);

    if (updatedTodo.ok) {
        return res.json({ success: true, data: updatedTodo.data });
    } else {
        return res.json({ success: false, message: updatedTodo?.message || "Server Down" });
    }

}

