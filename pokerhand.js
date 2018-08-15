var hand = [
    { "rank": "ace", "suit": "clubs" },
    { "rank": "ten", "suit": "clubs" },
    { "rank": "queen", "suit": "clubs" },
    { "rank": "jack", "suit": "clubs" },
    { "rank": "king", "suit": "clubs" }
];

//rank and suit arrays
var ranks = ["two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "jack", "queen", "king", "ace"];
var suits = ["hearts", "diamonds", "clubs", "spades"];

var handRanks = hand.map(function (card) {
    return card.rank;
});

var handSuits = hand.map(function (card) {
    return card.suit;
});

//test an array for N occurances of a value
var containsNTimes = function (testArray, testValue, n) {
    var count = 0;
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

//get the index of each card and sort numerically
var sortedHandRanks = function () {
    var rankArray = [];

    handRanks.forEach(function (rank) {
        rankArray.push(ranks.indexOf(rank));
    });

    rankArray.sort(compareNumbers);
    return rankArray;
};

//find difference between highest and lowest rank
var rankDifference = function (hand) {
    var rankHighIndex = sortedHandRanks(hand)[sortedHandRanks(hand).length - 1];
    var rankLowIndex = sortedHandRanks(hand)[0];
    var diff = rankHighIndex - rankLowIndex;
    return diff;
};

//HAND FUNCTIONS
var containsPair = function (hand) {
    var result = false;

    ranks.forEach(function (rank) {
        if (containsNTimes(handRanks, rank, 2)) {
            result = true;
        }
    });
    return result;
};

var containsTwoPair = function (hand) {
    var result = false,
        pairCount = 0;

    ranks.forEach(function (rank) {
        if (containsNTimes(handRanks, rank, 2)) {
            pairCount++;
        }
    });

    if (pairCount >= 2) {
        result = true;
    }
    return result;
};

var containsThreeOfAKind = function (hand) {
    var result = false;

    ranks.forEach(function (rank) {
        if (containsNTimes(handRanks, rank, 3)) {
            result = true;
        }
    });
    return result;
};

var containsStraight = function (hand) {
    var result = false;

    ranks.forEach(function (rank) {
        if (!containsPair(hand)) {
            if (rankDifference(hand) == 4) {
                result = true;
            }
        }
    });
    return result;
};

var containsFlush = function (hand) {
    var result = false;

    suits.forEach(function (suit) {
        if (containsNTimes(handSuits, suit, 5)) {
            result = true;
        }
    });
    return result;
};

//Check hand for Full House [TODO: Refactor]
var containsFullHouse = function (hand) {
    var result = false,
        pairRank,
        trioRank,
        pairCount = 0,
        trioCount = 0;

    var handRanks = hand.map(function (card) {
        return card.rank;
    });

    ranks.forEach(function (rank) {
        if (containsNTimes(handRanks, rank, 3)) {
            trioCount++;
            trioRank = rank;
        } else if (containsNTimes(handRanks, rank, 2)) {
            pairCount++;
            pairRank = rank;
        }
    });

    if (pairCount == 1 && trioCount == 1) {
        result = true;
    }
    return result;
};

var containsFourOfAKind = function (hand) {
    var result = false;

    ranks.forEach(function (rank) {
        if (containsNTimes(handRanks, rank, 4)) {
            result = true;
        }
    });
    return result;
};

var containsStraightFlush = function (hand) {
    var result = false;

    if (containsStraight(hand) && containsFlush(hand)) {
        result = true;
    }

    return result;
};

var containsRoyalFlush = function (hand) {
    var result = false;

    if (containsStraightFlush(hand) && sortedHandRanks(hand)[0] == 8) {
        result = true;
    }

    return result;
};

// Test Calls
console.log("pair: " + containsPair(hand));
console.log("two pair: " + containsTwoPair(hand));
console.log("three of kind: " + containsThreeOfAKind(hand));
console.log("straight: " + containsStraight(hand));
console.log("flush: " + containsFlush(hand));
console.log("full house: " + containsFullHouse(hand));
console.log("four of a kind: " + containsFourOfAKind(hand));
console.log("straight flush: " + containsStraightFlush(hand));
console.log("royal flush: " + containsRoyalFlush(hand));

// Find best hand
var bestHand = function (hand) {
    var result = "Bust";

    if (containsRoyalFlush(hand)) {
        result = "Royal Flush";
    } else if (containsStraightFlush(hand)) {
        result = "Straight Flush";
    } else if (containsFourOfAKind(hand)) {
        result = "Four of a Kind";
    } else if (containsFullHouse(hand)) {
        result = "Full House";
    } else if (containsFlush(hand)) {
        result = "Flush";
    } else if (containsStraight(hand)) {
        result = "Straight";
    } else if (containsThreeOfAKind(hand)) {
        result = "Three of a Kind";
    } else if (containsTwoPair(hand)) {
        result = "Two Pair";
    } else if (containsPair(hand)) {
        result = "Pair";
    }
    return result;
};

console.log(bestHand(hand));