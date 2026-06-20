const fs = require("node:fs");

function readFileContent(filePath) {
    return fs.readFileSync(filePath, { encoding: "utf8" });
}

module.exports = readFileContent;