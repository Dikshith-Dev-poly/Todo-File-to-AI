import type { typeTodo } from "../controllers/createTodo.controller.js";
import createTodoRepo from "../repositories/createTodoRepo.js";

export default async function createTodoService(data: typeTodo) {
    const result = await createTodoRepo(data);
    return result;
}