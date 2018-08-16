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

        this.ranks.forEach((rank) => {
            if (containsNTimes(this.handRanks, rank, 3)) {
                result = true;
            }
            
        });
        return result;
    }

    containsStraight() {

        const set = new Set(this.handRanks);

        if (set.size !== this.handRanks.length)
            return false;

        const start = Math.min(...this.handRanks);
        const end = Math.max(...this.handRanks);

        if (end - start === 4) // Normal straight
            return true;

        const handRankWithoutAce = this.handRanks.filter(item => item != 14);
        
        const newEnd = Math.max(...handRankWithoutAce);

        // A 2 3 4 5

        return newEnd - start === 3 && end === 14;

    }

    containsFlush() {

        const set = new Set(this.handSuits);

        return set.size === 1;

    }

    //Check hand for Full House [TODO: Refactor]
    containsFullHouse() {
        let result = false,
            pairCount = 0,
            trioCount = 0;

        this.ranks.forEach((rank) => {
            if (containsNTimes(this.handRanks, rank, 3)) {
                trioCount++;
            } else if (containsNTimes(this.handRanks, rank, 2)) {
                pairCount++;
            }
        });

        if (pairCount == 1 && trioCount == 1) {
            result = true;
        }
        return result;
    }

    containsFourOfAKind() {
        let result = false;

        this.ranks.forEach((rank) => {
            if (containsNTimes(this.handRanks, rank, 4)) {
                result = true;
            }
        });
        return result;
    }

    containsStraightFlush() {
        let result = false;

        if (this.containsStraight() && this.containsFlush()) {
            result = true;
        }

        return result;
    }

    containsRoyalFlush() {
        let result = false;

        if (this.containsStraightFlush() && this.sortedHandRanks()[0] == 8) {
            result = true;
        }

        return result;
    }

    highCard() {
        const high = Math.max(...this.handRanks);

        const index = this.handRanks.indexOf(high);
        // console.log(this.handRanks, this.handSuits, index);
        return `${this.constructor.cardMap[high] || high} of ${this.constructor.cardMap[this.handSuits[index]]}`;

    }

     //get the index of each card and sort numerically
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
        let result = "Bust";

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