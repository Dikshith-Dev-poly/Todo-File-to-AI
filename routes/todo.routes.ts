import { Router } from "express";
import home from "../controllers/home.controller.js";
import getTodos from "../controllers/getTodo.controller.js";
import createTodo from "../controllers/createTodo.controller.js";
import updateTodo from "../controllers/updateTodo.controller.js";
import deleteTodo from "../controllers/deleteTodo.controller.js";

const route = Router();


route.get("/", home);
route.get("/todos", getTodos);
route.post("/todos", createTodo);
route.patch("/todos/:id", updateTodo);
route.delete("/todos/:id", deleteTodo);




export default route;
