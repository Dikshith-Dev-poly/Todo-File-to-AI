
// options= { delimiter, existValue } 
function cleanData(data, options) {
    const temp = data.split(options.delimiter || "\n");
    const cleanedData = temp.filter((d) => {
        if (d.trim() === "" || d === options.existValue) {
            return false;
        }
        return true;
    })
    return cleanedData;
}

module.exports = cleanData;