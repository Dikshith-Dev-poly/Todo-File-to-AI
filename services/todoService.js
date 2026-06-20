//create,update,read from db
const path = require("node:path");
const createDB = require("../lib/createDB");
const cleanData = require("../utils/cleanData");
const readFileContent = require("../utils/readFileContent");



const deleteFilePath = path.join(process.cwd(), "db", "deleted.txt");
const completedFilePath = path.join(process.cwd(), "db", "completed.txt");
const todoFilePath = path.join(process.cwd(), "db", "todo.txt");




function getData() {
    let deletedIds = [];
    let completedIds = [];
    let data = []
    try {
        createDB();
        const dData = readFileContent(deleteFilePath);
        const cData = readFileContent(completedFilePath);
        deletedIds = cleanData(dData, { existValue: "id" });
        completedIds = cleanData(cData, { existValue: "id" });

        const todoData = readFileContent(todoFilePath);
        data = cleanData(todoData, { existValue: "id,taskName,description,createdAt,completed" });

        //convert string to object
        data = data.map((todo) => {
            const splitTodoData = todo.split(",");
            return {
                id: splitTodoData[0],
                task: splitTodoData[1],
                desc: splitTodoData[2],
                completed: completedIds.includes(splitTodoData[0]),
                createdAt: splitTodoData[3],
            }
        })
        //remove deleted
        data = data.filter((d) => {
            return !deletedIds.includes(d.id);
        })
        return data;
    } catch (err) {
        console.error("Error fetching todo data:", err.message);
        console.error(err.stack);
        process.exit(1);
    }
}


module.exports = { getData };