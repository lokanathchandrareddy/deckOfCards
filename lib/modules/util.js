// function to check number of times a value is repeated in the array
// for example for [2,4,5,2,6] the counter should be should be 2 for 2
// logic from the text book

const containsNTimes = (arr, val, nTimes) => {
    let counter = 0;
    arr.forEach(function (item) {
        if (item == val) {
            counter++;
        }
    });
// >= is used since, if we are looking for pair, [2,2,2,3,4] it would return counter as 3
// three of a kind also contains a pair
    if (counter >= nTimes) {
        return true;
    } else {
        return false;
    }
};

//function to help sort a string, from text book 
function compareNumbers(a, b) {
    return a - b;
}

module.exports = {
    containsNTimes,
    compareNumbers
}