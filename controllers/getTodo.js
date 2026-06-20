const { getData } = require("../services/todoService");

function getTodo(req, res) {
    const todo = getData();
    res.status(200);
    res.type("application/json");
    res.send(todo);
}

module.exports = getTodo;