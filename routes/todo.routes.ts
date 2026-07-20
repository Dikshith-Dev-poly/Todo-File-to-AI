import { Router } from "express";
import home from "../controllers/home.controller";
import getTodos from "../controllers/getTodo.controller";
import createTodo from "../controllers/createTodo.controller";
import updateTodo from "../controllers/updateTodo.controller";
import deleteTodo from "../controllers/deleteTodo.controller";

const route = Router();


route.get("/", home);
route.get("/todos", getTodos);//filters,pagination
route.post("/todos", createTodo);
route.patch("/todos/:id", updateTodo);//title,desc,priority,completed
route.delete("/todos/:id", deleteTodo);//soft




export default route;
