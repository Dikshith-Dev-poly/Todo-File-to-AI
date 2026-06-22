const express = require("express");
const route = express.Router();
const getTodo = require("../controllers/getTodo");
const deleteTodo = require("../controllers/deleteTodo");
const storeTodo = require("../controllers/storeTodo");
const updateComplete = require("../controllers/updateComplete");


route.get("/", getTodo);
route.post("/", storeTodo);
route.patch("/complete", updateComplete);
route.delete("/:id", deleteTodo);

module.exports = route;