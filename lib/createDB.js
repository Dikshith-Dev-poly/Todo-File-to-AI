const fs = require("node:fs");
const path = require("node:path");

const dbFolderPath = path.join(process.cwd(), "db");



function createFilePath(fileName) {
    return path.join(dbFolderPath, fileName);
}


function createFile(fileName, data) {
    const path = createFilePath(fileName);
    const exist = fs.statSync(path, { throwIfNoEntry: false });
    if (!exist) {
        fs.writeFileSync(path, data, { encoding: "utf8" });
        console.log("Created %s file successfully", fileName);
    }
}

function createDB() {
    try {
        let exist = fs.statSync(dbFolderPath, { throwIfNoEntry: false });
        if (!exist) {
            fs.mkdirSync(dbFolderPath);
            createFile("todo.txt", "id,taskName,description,createdAt\n");
            createFile("completed.txt", "");
            createFile("deleted.txt", "");
            createFile("ids.txt", "");
            return;
        }
        createFile("todo.txt", "id,taskName,description,createdAt\n");
        createFile("completed.txt", "");
        createFile("deleted.txt", "");
        createFile("ids.txt", "");
    } catch (err) {
        console.error("Error:", err.message);
        console.error(err.stack);
        process.exit(1);
    }
}


module.exports = createDB;

