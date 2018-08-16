const { containsNTimes, compareNumbers } = require('./../modules/util');

class PokerHand {
    
    //defining a method to change the values if required at any moment
    static get cardMap() {
        return {
            14: 'ACE',
            13: 'KING',
            12: 'QUEEN',
            11: 'JACK',
            "H": "HEARTS",
            "D": "DIAMONDS",
            "C": "CLUBS",
            "S": "SPADES"
        };
    }


    constructor(suites) {
        this.suites = suites;
        //creating new array with just card.value
        this.handRanks = suites.map((card) => {
            return card.value;
        });
        //creating a new array with just card.suit
        this.handSuits = suites.map((card) => {
            return card.suit;
        });
        //defining the ranks based on the order of high card
        this.ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
        this.suits = ["H", "D", "C", "S"];
    }

    //checking if pair exists
    containsPair() {
        let result = false;
        //here we are seeing if, a value is matched atleast 2 times.
        this.ranks.forEach((rank) => {
            if (containsNTimes(this.handRanks, rank, 2)) {
                result = true;
            }
        });
        return result;
    };

    //checking if pair exists and also two pair exists, by using the counter
    //counter is used since, 2 different values would be repeated
    containsTwoPair() {

        let pairCount = 0;
        //this function wont work for four of a kind, since they are not unique
        this.ranks.forEach((rank) => {
            if (containsNTimes(this.handRanks, rank, 2)) {
                pairCount++;
            }
        });

        if (pairCount >= 2) {
            return true;
        }
        return false;
    }

    containsThreeOfAKind() {
        let result = false;
        //checking if the number of times the value exists in the array is equal to three
        this.ranks.forEach((rank) => {
            if (containsNTimes(this.handRanks, rank, 3)) {
                result = true;
            }
            
        });
        return result;
    }
    //straight
    containsStraight() {
        // creating a new array and adding only the unique values to the set array(set)
        const set = new Set(this.handRanks);

        //checking if the size of array is not equal to the initial array
        if (set.size !== this.handRanks.length)
            return false;

        //find the max and value in the array using spread operator
        const start = Math.min(...this.handRanks);
        const end = Math.max(...this.handRanks);

        //checking if diff of max and min value is 4
        //this will work for anything except, [A,2,3,4,5]
        if (end - start === 4) // Normal straight
            return true;

        //for [A,2,3,4,5] to be a straight we have to remove/filter the A (value = 14) from the array
        //create anew array without ACE
        const handRankWithoutAce = this.handRanks.filter(item => item != 14);

        //find the max value of the array without Ace
        const newEnd = Math.max(...handRankWithoutAce);

        //using the new max value and old start and end value to find the diff of new max (5) and min (2) is 3
        //and also the end from the old array is A (14)
        return newEnd - start === 3 && end === 14;

    }
    //Flush
    containsFlush() {
        // adding uniques card suit values to the new array(set)
        const set = new Set(this.handSuits);

        //there should exactly be 1 suit value in the array(set)
        return set.size === 1;

    }

    // Full House 
    containsFullHouse() {
        let result = false,
            pairCount = 0,
            triplet = 0;

        //here the array should contain a three of a kind a pair of diff values
        this.ranks.forEach((rank) => {
            if (containsNTimes(this.handRanks, rank, 3)) {
                triplet++; // three of a kind count
            } else if (containsNTimes(this.handRanks, rank, 2)) {
                pairCount++; //pair count
            }
        });

        // there should be exactly one three of a kind and a pair
        if (pairCount == 1 && triplet == 1) {
            result = true;
        }
        return result;
    }
    //four of a kind
    containsFourOfAKind() {
        let result = false;

        //if the array contains 4 similar values regardless of suits
        this.ranks.forEach((rank) => {
            if (containsNTimes(this.handRanks, rank, 4)) {
                result = true;
            }
        });
        return result;
    }
    // straight flush
    containsStraightFlush() {
        let result = false;

        //it is straight flush, iff it has straight and Flush irrespective of min and max value
        if (this.containsStraight() && this.containsFlush()) {
            result = true;
        }

        return result;
    }
    //hasRoyalflush
    containsRoyalFlush() {
        let result = false;

        //here we are using this.sortedHandRanks()[0] == 8, since the the index of 10 in the ranks array is 8
        //this.sortedHandRanks()[0] should return a value as 10
        //it is royal flush, iff it has Ace straight, Flush, straight flush and min and max value of array is 10 and 14 respectively

        if (this.containsStraightFlush() && this.sortedHandRanks()[0] == 8) {
            result = true;
        }

        return result;
    }

    // it executes this function only if none of the other functions return value as true
    highCard() {
        //gettting the max value in the array using the spread operator
        const high = Math.max(...this.handRanks);

        //using the index of high value to find the suit of the card
        const index = this.handRanks.indexOf(high);

        // console.log(this.handRanks, this.handSuits, index);
        // since all of the other fail, here we are returning the full value of the High Card
        return `${this.constructor.cardMap[high] || high} of ${this.constructor.cardMap[this.handSuits[index]]}`;

    }

     //get the index of each card using the rank values, and sort numerically based on the rank index
    sortedHandRanks() {
        let rankArray = [];

        this.handRanks.forEach((rank) => {
            rankArray.push(this.ranks.indexOf(rank));
        });

        rankArray.sort(compareNumbers);
        return rankArray;
    }

    // function to choose the best hand possible hand
    bestHand() {
        // let result = "NOT WORKING: RECHECK";

        // this is exceuted in order of the top poker hand on wiki.
        if (this.containsRoyalFlush()) {
            result = "Royal Flush";
        } else if (this.containsStraightFlush()) {
            result = "Straight Flush";
        } else if (this.containsFourOfAKind()) {
            result = "Four of a Kind";
        } else if (this.containsFullHouse()) {
            result = "Full House";
        } else if (this.containsFlush()) {
            result = "Flush";
        } else if (this.containsStraight()) {
            result = "Straight";
        } else if (this.containsThreeOfAKind()) {
            result = "Three of a Kind";
        } else if (this.containsTwoPair()) {
            result = "Two Pair";
        } else if (this.containsPair()) {
            result = "Pair";
        }
        else {
            result = this.highCard();
        }
        return result;
    }

}

module.exports = PokerHand;