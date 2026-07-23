import getDbMethods from "../db/dbMethods.js";


const method = getDbMethods();

export default async function deleteTodRepo(id: string) {
    await method.deleteTodo(id);
}