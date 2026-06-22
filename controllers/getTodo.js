const { getData } = require("../services/todoService");

function getTodo(req, res) {
    const response = getData();
    res.status(200);
    res.type("application/json");
    res.json(response);
}

module.exports = getTodo;