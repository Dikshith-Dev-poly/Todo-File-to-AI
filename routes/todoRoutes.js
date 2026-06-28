import express from "express";
import getTodoController from "../controllers/getTodoController.js"
import createTodoController from "../controllers/createTodoController.js"
import updateTodoController from "../controllers/updateTodoController.js";
import deleteTodoController from "../controllers/deleteTodoController.js";

const route = express.Router()


route.get("/", getTodoController);
route.post("/", createTodoController);
route.patch("/:id", updateTodoController);
route.delete("/:id", deleteTodoController);


export default route;
