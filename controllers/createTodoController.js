import createTodo from "../services/createTodo.js";

export default async function createTodoController(req, res) {
    const data = req.body;
    if (!data || !("title" in data) || !("description" in data)) {
        return res.status(400).json({ success: false, message: "Invalid data" });
    }
    const createdTodo = await createTodo(data);
    if (createdTodo.ok) {
        return res.status(200).json({ success: true, data: createdTodo.data });
    } else {
        return res.status(500).json({ success: false, message: createdTodo?.message || "Server Down" });
    }
}


