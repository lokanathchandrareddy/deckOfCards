
const request = require('request');
const SuitValue = require("./suitvalue");

// const id = null; 
const remaining = null;
request('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1', (error, response, body) => {
    if (response && response.statusCode != 200) {
        console.log(" Need to rework");
        return;
    }
    const dat = JSON.parse(body);
    console.log("\n--Shuffling and Creating a new DECK --\n");
    console.log("New Deck ID : ", dat.deck_id);
    let id = dat.deck_id;
    console.log("\n--Now Drawing the 5 cards from the deck(existing)--\n");

    request('https://deckofcardsapi.com/api/deck/' + id + '/draw/?count=5', (error, response, body) => {
        const data = JSON.parse(body);
        console.log('Remaining Cards in the deck :', data.remaining); // Print the error if one occurred
        // console.dir(data, { depth: null, colors: true });// to show the prettfied JSON
        // let suites = data.cards.map(card => card.value + ' of ' + card.suit); // to store the  required values of JSON
        // let suites = data.cards.map(card => new SuitValue(card.value, card.suit, card.code)); //assiging the values to the suitValue as an array
        console.log('\nDrawn Cards are :', data.cards.map(card => card.value + ' of ' + card.suit));

        var suites = data.cards.map(card => { let obje = { "value": card.value, "suit": card.suit }; return obje });

        // console.log('suit:', data.cards[0].suit);
        // console.log('suit:', data.cards.filter(card => card.suit));
        function changeValue(value, letter) {
            for (var i in suites) {
                if (suites[i].value == value) {
                    suites[i].value = letter;
                }
            }
        }
        function changeSuit(value, letter) {
            for (var i in suites) {
                if (suites[i].suit == value) {
                    suites[i].suit = letter;
                }
            }
        }
        changeValue('ACE', '14');
        changeValue('KING', '13');
        changeValue('QUEEN', '12');
        changeValue('JACK', '11');
        changeSuit('SPADES', 'S');
        changeSuit('DIAMONDS', 'D');
        changeSuit('CLUBS', 'C');
        changeSuit('HEARTS', 'H');
        // console.log('suits:', suites);

        // suites = [
        //     { "value": 14, "suit": "C" },
        //     { "value": 13, "suit": "C" },
        //     { "value": 12, "suit": "C" },
        //     { "value": 11, "suit": "C" },
        //     { "value": 10, "suit": "C" }
        // ];
        var ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
        var suits = ["H", "D", "C", "S"];

        var handRanks = suites.map((card) => {
            return card.value;
        });

        var handSuits = suites.map((card) => {
            return card.suit;
        });
        //test an array for N occurances of a value
        var containsNTimes = (testArray, testValue, n) => {
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
        var sortedHandRanks = () => {
            var rankArray = [];

            handRanks.forEach((rank) => {
                rankArray.push(ranks.indexOf(rank));
            });

            rankArray.sort(compareNumbers);
            return rankArray;
        };

        //find difference between highest and lowest rank
        var rankDifference = (suites) => {
            var rankHighIndex = sortedHandRanks(suites)[sortedHandRanks(suites).length - 1];
            var rankLowIndex = sortedHandRanks(suites)[0];
            var diff = rankHighIndex - rankLowIndex;
            return diff;
        };

        //HAND FUNCTIONS
        var containsPair = (suites) => {
            var result = false;

            ranks.forEach( (rank) => {
                if (containsNTimes(handRanks, rank, 2)) {
                    result = true;
                }
            });
            return result;
        };

        var containsTwoPair = (suites) => {
            
                pairCount = 0;

            ranks.forEach(function (rank) {
                if (containsNTimes(handRanks, rank, 2)) {
                    pairCount++;
                }
            });

            if (pairCount >= 2) {
                return true;
            }
            return false ;
        };

        var containsThreeOfAKind = function (suites) {

            ranks.forEach(function (rank) {
                if (containsNTimes(handRanks, rank, 3)) {
                    return true;
                }
            });
            return false ;
        };

        var containsStraight = function (suites) {
           

            ranks.forEach(function (rank) {
                if (!containsPair(suites)) {
                    if (rankDifference(suites) == 4) {
                        return true;
                    }
                }
            });
            return false ;
        };

        var containsFlush = function (suites) {

            suits.forEach(function (suit) {
                if (containsNTimes(handSuits, suit, 5)) {
                    return true;
                }
            });
            return false;
        };

        //Check hand for Full House [TODO: Refactor]
        var containsFullHouse = function (suites) {
            var result = false,
                pairRank,
                trioRank,
                pairCount = 0,
                trioCount = 0;

            var handRanks = suites.map(function (card) {
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

        var containsFourOfAKind = function (suites) {
            var result = false;

            ranks.forEach(function (rank) {
                if (containsNTimes(handRanks, rank, 4)) {
                    result = true;
                }
            });
            return result;
        };

        var containsStraightFlush = function (suites) {
            var result = false;

            if (containsStraight(suites) && containsFlush(suites)) {
                result = true;
            }

            return result;
        };

        var containsRoyalFlush = function (suites) {
            var result = false;

            if (containsStraightFlush(suites) && sortedHandRanks(suites)[0] == 8) {
                result = true;
            }

            return result;
        };

        // Test Calls
        console.log("pair: " + containsPair(suites));
        console.log("two pair: " + containsTwoPair(suites));
        console.log("three of kind: " + containsThreeOfAKind(suites));
        console.log("straight: " + containsStraight(suites));
        console.log("flush: " + containsFlush(suites));
        console.log("full house: " + containsFullHouse(suites));
        console.log("four of a kind: " + containsFourOfAKind(suites));
        console.log("straight flush: " + containsStraightFlush(suites));
        console.log("royal flush: " + containsRoyalFlush(suites));

        // Find best hand
        let bestHand = (suites) => {
            var result = "Bust";

            if (containsRoyalFlush(suites)) {
                result = "Royal Flush";
            } else if (containsStraightFlush(suites)) {
                result = "Straight Flush";
            } else if (containsFourOfAKind(suites)) {
                result = "Four of a Kind";
            } else if (containsFullHouse(suites)) {
                result = "Full House";
            } else if (containsFlush(suites)) {
                result = "Flush";
            } else if (containsStraight(suites)) {
                result = "Straight";
            } else if (containsThreeOfAKind(suites)) {
                result = "Three of a Kind";
            } else if (containsTwoPair(suites)) {
                result = "Two Pair";
            } else if (containsPair(suites)) {
                result = "Pair";
            }
            return result;
        };
        console.log(bestHand(suites));

    });

});
// console.log('suits:', suites);
        