const isNumber = require("../utils/isNumber");
const { deleteData } = require("../services/todoService");

function deleteTodo(req, res) {
    const { id } = req.params;
    if (!isNumber(id)) {
        res.status(400);
        return res.json({ success: false, response: "Id should be a number" });
    }
    const response = deleteData(id);
    res.status(200);
    res.json(response);
}

module.exports = deleteTodo;