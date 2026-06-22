const { updateValue } = require("../services/todoService");
const isNumber = require("../utils/isNumber");

function updateComplete(req, res) {
    const id = req.query?.id;
    if (!id || !isNumber(id)) {
        res.status(400);
        return res.json({ success: false, response: "Invalid value" });
    }
    const response = updateValue(id);
    res.status(200);
    res.json(response);
}


module.exports = updateComplete;