const containsNTimes = (arr, val, nTimes) => {
    let counter = 0;
    arr.forEach(function (item) {
        if (item == val) {
            counter++;
        }
    });

    if (counter >= nTimes) {
        return true;
    } else {
        return false;
    }
};

//helper function for sorting
function compareNumbers(a, b) {
    return a - b;
}

module.exports = {
    containsNTimes,
    compareNumbers
}