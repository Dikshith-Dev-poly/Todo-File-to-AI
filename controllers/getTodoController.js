import getTodo from "../services/getTodo.js"

async function getTodoController(req, res) {
    const page = Number(req.query?.page) || 1;
    const limit = Number(req.query?.limit) || 20;
    if (limit > 100 || limit < 0) {
        res.status(400);
        return res.json({ success: false, message: "limit should be between 1-100" });
    }
    const data = await getTodo(page, limit);
    if (data.ok) {
        res.type("application/json");
        return res.status(200).json({ success: true, data: data.data, pagination: data.pagination });
    } else {
        return res.status(500).json({ success: false, message: "Server Down" });
    }
}

export default getTodoController;