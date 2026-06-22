
// options= { delimiter, existValue } 
function cleanData(data, options) {
    let temp = data.split(options.delimiter || "\n");
    temp = temp.map((d) => {
        return d.replace("\r", "");
    })
    const cleanedData = temp.filter((d) => {
        if (d.trim() === "" || d === options.existValue) {
            return false;
        }
        return true;
    })
    return cleanedData;
}

module.exports = cleanData;