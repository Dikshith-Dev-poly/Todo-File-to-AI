import type { typeTodo } from "../controllers/createTodo.controller.js";
import deleteTodRepo from "../repositories/deleteTodoRepo.js";

export default async function deleteTodoService(id: string) {
    await deleteTodRepo(id);
}