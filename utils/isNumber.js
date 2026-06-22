function isNumber(num) {
    return !Number.isNaN(num) && !Number.isNaN(parseInt(num));
}

module.exports = isNumber;