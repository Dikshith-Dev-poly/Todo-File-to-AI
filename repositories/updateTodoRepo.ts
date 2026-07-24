import getDbMethods from "../db/dbMethods.js";
import type { updateType } from "../controllers/updateTodo.controller.js";

const methods = getDbMethods()


export default async function updateTodoRepo(id: string, data: updateType) {
    const result = await methods.updateTodo(id, data);
    return result;
}