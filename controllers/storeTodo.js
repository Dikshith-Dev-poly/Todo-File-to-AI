const { storeData } = require("../services/todoService");

function storeTodo(req, res) {
    const data = req.body;
    if (!("taskName" in data) || !("description" in data) || !("createdAt" in data) || data.taskName.trim() == "" || data.description.trim() == "" || data.createdAt.trim() == "") {
        res.status(200);
        return res.json({ success: false, response: "Invalid data" });
    }
    const response = storeData(data);
    res.status(200);
    res.json(response);
}


module.exports = storeTodo;