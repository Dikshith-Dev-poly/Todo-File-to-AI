const fs = require("node:fs");


function appendFileContent(filePath, data, options = {}) {
    fs.appendFileSync(filePath, data, options);
}

module.exports = appendFileContent;