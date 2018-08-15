//HAND FUNCTIONS

const { containsNTimes, compareNumbers } = require('./../../modules/util');

class PokerHandUtils {

    constructor(suites) {
        this.suites = suites;
        this.handRanks = suites.map((card) => {
            return card.value;
        });
        this.handSuits = suites.map((card) => {
            return card.suit;
        });
        this.ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
        this.suits = ["H", "D", "C", "S"];
    }

    containsPair() {
        var result = false;

        this.ranks.forEach((rank) => {
            if (containsNTimes(this.handRanks, rank, 2)) {
                result = true;
            }
        });
        return result;
    };

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

        this.ranks.forEach((rank) => {
            if (containsNTimes(this.handRanks, rank, 3)) {
                return true;
            }
        });
        return false;
    }

    containsStraight() {


        this.ranks.forEach((rank) => {
            if (!this.containsPair()) {
                if (this.rankDifference() == 4) {
                    return true;
                }
            }
        });
        return false;
    }

    containsFlush() {

        this.suits.forEach((suit) => {
            if (containsNTimes(this.handSuits, suit, 5)) {
                return true;
            }
        });
        return false;
    }

    //Check hand for Full House [TODO: Refactor]
    containsFullHouse() {
        let result = false,
            pairRank,
            trioRank,
            pairCount = 0,
            trioCount = 0;

        this.ranks.forEach((rank) => {
            if (containsNTimes(this.handRanks, rank, 3)) {
                trioCount++;
                trioRank = rank;
            } else if (containsNTimes(this.handRanks, rank, 2)) {
                pairCount++;
                pairRank = rank;
            }
        });

        if (pairCount == 1 && trioCount == 1) {
            result = true;
        }
        return result;
    }

    containsFourOfAKind() {
        var result = false;

        this.ranks.forEach((rank) => {
            if (containsNTimes(this.handRanks, rank, 4)) {
                result = true;
            }
        });
        return result;
    }

    containsStraightFlush() {
        let result = false;

        if (this.containsStraight(this.suites) && this.containsFlush(this.suites)) {
            result = true;
        }

        return result;
    }

    containsRoyalFlush() {
        let result = false;

        if (this.containsStraightFlush(this.suites) && this.sortedHandRanks(this.suites)[0] == 8) {
            result = true;
        }

        return result;
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

    //find difference between highest and lowest rank
    rankDifference() {
        let rankHighIndex = this.sortedHandRanks()[this.sortedHandRanks().length - 1];
        let rankLowIndex = this.sortedHandRanks()[0];
        let diff = rankHighIndex - rankLowIndex;
        return diff;
    }

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
        return result;
    }

}

module.exports = PokerHandUtils;