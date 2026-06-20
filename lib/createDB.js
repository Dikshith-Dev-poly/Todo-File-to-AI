const fs = require("node:fs");
const path = require("node:path");

const dbFolderPath = path.join(process.cwd(), "db");
const dbPath = path.join(dbFolderPath, "todo.txt");


function createDB() {
    try {
        let exist = fs.statSync(dbFolderPath, { throwIfNoEntry: false });
        if (!exist) {
            fs.mkdirSync(dbFolderPath);
            fs.writeFileSync(dbPath, "", { encoding: "utf8" });
            console.log("Created todo.txt file successfully");
            return;
        }
        exist = fs.statSync(dbPath, { throwIfNoEntry: false });
        if (!exist) {
            fs.writeFileSync(dbPath, "", { encoding: "utf8" });
            console.log("Created todo.txt file successfully");
        }
    } catch (err) {
        console.error("Error:", err.message);
        console.error(err.stack);
        process.exit(1);
    }
}


module.exports = createDB;

