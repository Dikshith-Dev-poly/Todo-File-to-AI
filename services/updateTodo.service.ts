import type { updateType } from "../controllers/updateTodo.controller.js";
import updateTodoRepo from "../repositories/updateTodoRepo.js";

export default async function updateTodoService(id: string, data: updateType) {
    const result = await updateTodoRepo(id, data);
    return result;
}