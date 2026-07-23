import type { typeTodo } from "../controllers/createTodo.controller.js";
import getDbMethods from "../db/dbMethods.js";
const methods = getDbMethods()

export default async function createTodoRepo(data: typeTodo) {
    const dbResult = await methods.createTodo(data);
    return dbResult;
}