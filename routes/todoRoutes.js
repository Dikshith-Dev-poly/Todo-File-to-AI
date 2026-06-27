import express from "express";
import getTodoController from "../controllers/getTodoController.js"
import createTodoController from "../controllers/createTodoController.js"

const route = express.Router()


route.get("/", getTodoController);
route.post("/", createTodoController);



export default route;
