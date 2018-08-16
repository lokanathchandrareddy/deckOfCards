const containsNTimes = (testArray, testValue, n) => {
    let count = 0;
    testArray.forEach(function (testItem) {
        if (testItem == testValue) {
            count++;
        }
    });

    if (count >= n) {
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