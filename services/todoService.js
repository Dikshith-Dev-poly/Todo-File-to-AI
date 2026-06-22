//create,update,read from db
const path = require("node:path");
const createDB = require("../lib/createDB");
const cleanData = require("../utils/cleanData");
const readFileContent = require("../utils/readFileContent");
const appendFileContent = require("../utils/appendFileContent");


const dbPath = path.join(process.cwd(), "db");
const deleteFilePath = path.join(dbPath, "deleted.txt");
const completedFilePath = path.join(dbPath, "completed.txt");
const todoFilePath = path.join(dbPath, "todo.txt");
const idsFilePath = path.join(dbPath, "ids.txt");




function getData() {
    let deletedIds = [];
    let completedIds = [];
    let data = []
    try {
        createDB();
        const dData = readFileContent(deleteFilePath);
        const cData = readFileContent(completedFilePath);
        deletedIds = cleanData(dData, { delimiter: "," });
        completedIds = cleanData(cData, { delimiter: "," });

        const todoData = readFileContent(todoFilePath);
        data = cleanData(todoData, { existValue: "id,taskName,description,createdAt" });

        //convert string to object
        data = data.map((todo) => {
            const splitTodoData = todo.split(",");
            const [id, task, desc, createdAt] = splitTodoData;
            return {
                id,
                task,
                desc,
                completed: completedIds.includes(id),
                createdAt,
            }
        })
        //remove deleted
        data = data.filter((d) => {
            return !deletedIds.includes(d.id);
        })
        return { success: true, response: data };
    } catch (err) {
        console.error("Error fetching todo data:", err.message);
        console.error(err.stack);
        // process.exit(1);
        return { success: false, response: "Something went wrong" };
    }
}


function checkIdRange(id) {
    const idData = readFileContent(idsFilePath);
    const ids = cleanData(idData, { delimiter: "," }).sort((a, b) => Number(a) - Number(b));
    if (ids.length < 2 || id < Number(ids[0]) || id > Number(ids[ids.length - 1])) {
        return { success: false, response: "Invalid id" };
    }
}

function deleteData(id) {
    try {
        createDB();
        const res = checkIdRange(id);
        if (res) {
            return res;
        }
        //check if already there in deleted
        let deletedIds = readFileContent(deleteFilePath);
        deletedIds = cleanData(deletedIds, { delimiter: "," });
        if (deletedIds.includes(id)) {
            return { success: false, response: "Invalid id" };
        }
        //append
        appendFileContent(deleteFilePath, `${id},`);
        return { success: true, response: "Deleted successfully" };
    } catch (err) {
        console.error("Error fetching todo data:", err.message);
        console.error(err.stack);
        // process.exit(1);
        return { success: false, response: "Something went wrong" };
    }
}



function storeData(data) {
    try {
        const idData = readFileContent(idsFilePath);
        const ids = cleanData(idData, { delimiter: "," }).sort((a, b) => Number(a) - Number(b));
        const { taskName, description, createdAt } = data;
        const id = ids[ids.length - 1] ? parseInt(ids[ids.length - 1]) + 1 : 1;
        const res = { id, taskName, description, createdAt, completed: false };;
        appendFileContent(idsFilePath, `${id},`);
        appendFileContent(todoFilePath, `${id},${taskName},${description},${createdAt}\n`);
        return { success: true, response: res };
    } catch (err) {
        console.error("Error:", err.message);
        console.error(err.stack);
        return { success: false, response: "Something went wrong" };
    }
}


function updateValue(id) {
    try {
        const res = checkIdRange(id);
        if (res) {
            return res;
        }
        const completedData = readFileContent(completedFilePath);
        let completedIds = cleanData(completedData, { delimiter: "," });
        const exist = completedIds.includes(id);
        if (exist) {
            completedIds = completedIds.filter((d) => d != id);
            const content = completedIds.length > 0 ? `${completedIds.join(",")},` : "";
            appendFileContent(completedFilePath, `${content}`, { flag: "w" });
            return { success: true, response: "Successful" };
        } else {
            completedIds.push(id);
            appendFileContent(completedFilePath, `${completedIds.join(",")},`, { flag: "w" });
            return { success: true, response: "Successful" };
        }
    } catch (err) {
        console.error("Error:", err.message);
        console.error(err.stack);
        return { success: false, response: "Something went wrong" };
    }
}


module.exports = { getData, deleteData, storeData, updateValue };