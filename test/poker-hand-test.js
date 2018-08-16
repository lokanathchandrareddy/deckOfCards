const PokerHand = require('./../lib/poker/hand');
const assert = require('assert');

describe('Poker Hand', function () {


    it('Should detect a royal flush', function () {

        const suites = [
            { "value": 11, "suit": "C" },
            { "value": 12, "suit": "C" },
            { "value": 13, "suit": "C" },
            { "value": 14, "suit": "C" },
            { "value": 10, "suit": "C" }
        ];

        const royalFlush = new PokerHand(suites);

        assert(royalFlush.containsRoyalFlush());
    });

    it('Should detect a straight', function () {

        const suites = [
            { "value": 11, "suit": "C" },
            { "value": 12, "suit": "C" },
            { "value": 13, "suit": "C" },
            { "value": 14, "suit": "C" },
            { "value": 10, "suit": "C" }
        ];

        const straight = new PokerHand(suites);

        assert(straight.containsStraight());
    });
    it('Should detect a straight FLush', function () {

        const suites = [
            { "value": 11, "suit": "C" },
            { "value": 12, "suit": "C" },
            { "value": 13, "suit": "C" },
            { "value": 9, "suit": "C" },
            { "value": 10, "suit": "C" }
        ];

        const straight = new PokerHand(suites);

        assert(straight.containsStraightFlush());
    });

    it('Should detect a high Card', function () {

        const suites = [
            { "value": 4, "suit": "H" },
            { "value": 12, "suit": "C" },
            { "value": 3, "suit": "H" },
            { "value": 14, "suit": "C" },
            { "value": 10, "suit": "C" }
        ];

        const high = new PokerHand(suites);

        assert.equal(high.highCard(), 'ACE of CLUBS');
    });
    it('Should detect a two pair', function () {

        const suites = [
            { "value": 4, "suit": "H" },
            { "value": 12, "suit": "C" },
            { "value": 3, "suit": "H" },
            { "value": 4, "suit": "C" },
            { "value": 12, "suit": "C" }
        ];

        const twopair = new PokerHand(suites);

        assert(twopair.containsTwoPair());
    });
    it('Should detect a pair', function () {

        const suites = [
            { "value": 4, "suit": "H" },
            { "value": 12, "suit": "C" },
            { "value": 3, "suit": "H" },
            { "value": 5, "suit": "C" },
            { "value": 12, "suit": "C" }
        ];

        const pair = new PokerHand(suites);

        assert(pair.containsPair);
    });
    it('Should detect a three of a kind', function () {

        const suites = [
            { "value": 5, "suit": "H" },
            { "value": 12, "suit": "C" },
            { "value": 3, "suit": "H" },
            { "value": 3, "suit": "C" },
            { "value": 3, "suit": "C" }
        ];

        const three = new PokerHand(suites);

        assert(three.containsThreeOfAKind());
    });
    it('Should detect a four of a kind', function () {

        const suites = [
            { "value": 3, "suit": "H" },
            { "value": 12, "suit": "C" },
            { "value": 3, "suit": "H" },
            { "value": 3, "suit": "C" },
            { "value": 3, "suit": "C" }
        ];

        const four = new PokerHand(suites);

        assert(four.containsFourOfAKind());
    });
    it('Should detect a flush', function () {

        const suites = [
            { "value": 3, "suit": "C" },
            { "value": 12, "suit": "C" },
            { "value": 7, "suit": "C" },
            { "value": 2, "suit": "C" },
            { "value": 3, "suit": "C" }
        ];

        const flush = new PokerHand(suites);

        assert(flush.containsFlush());
    });

    it('should Detect Straight for A 2 3 4 5', function () {
        const suites = [
            { "value": 14, "suit": "H" },
            { "value": 2, "suit": "C" },
            { "value": 3, "suit": "H" },
            { "value": 4, "suit": "C" },
            { "value": 5, "suit": "C" }
        ];

        const astraight = new PokerHand(suites);

        assert(astraight.containsStraight());
    });

    it('should Detect Straight Flush for AC 2C 3C 4C 5C', function () {
        const suites = [
            { "value": 14, "suit": "C" },
            { "value": 2, "suit": "C" },
            { "value": 3, "suit": "C" },
            { "value": 4, "suit": "C" },
            { "value": 5, "suit": "C" }
        ];

        const astraightF = new PokerHand(suites);
        assert(astraightF.containsStraightFlush());
    });

    it('Should detect a full house', function () {

        const suites = [
            { "value": 3, "suit": "H" },
            { "value": 12, "suit": "C" },
            { "value": 12, "suit": "H" },
            { "value": 3, "suit": "C" },
            { "value": 3, "suit": "C" }
        ];

        const full = new PokerHand(suites);

        assert(full.containsFullHouse());
    });

    it('Should not detect a four of a kind', function () {

        const suites = [
            { "value": 2, "suit": "H" },
            { "value": 12, "suit": "C" },
            { "value": 3, "suit": "H" },
            { "value": 3, "suit": "C" },
            { "value": 3, "suit": "C" }
        ];

        const four = new PokerHand(suites);

        assert(four.containsFourOfAKind()=== false);
    });

   
});

describe('Top Hand', function () { 
    it('should return Top Hand as High Card', function(){
        const suites = [
            { "value": 2, "suit": "H" },
            { "value": 12, "suit": "C" },
            { "value": 5, "suit": "H" },
            { "value": 9, "suit": "C" },
            { "value": 10, "suit": "C" }
        ];

        const topCard = new PokerHand(suites);

        assert.equal(topCard.bestHand(), "QUEEN of CLUBS");
    });
    it('should return Top Hand as Pair', function () {
        const suites = [
            { "value": 2, "suit": "H" },
            { "value": 12, "suit": "C" },
            { "value": 2, "suit": "H" },
            { "value": 9, "suit": "C" },
            { "value": 10, "suit": "C" }
        ];

        const topCard = new PokerHand(suites);

        assert(topCard.bestHand()=== "Pair");
    });

    it('should return Top Hand as two Pair for 2 9 2 9 10', function () {
        const suites = [
            { "value": 2, "suit": "H" },
            { "value": 9, "suit": "C" },
            { "value": 2, "suit": "H" },
            { "value": 9, "suit": "C" },
            { "value": 10, "suit": "C" }
        ];

        const topCard = new PokerHand(suites);

        assert(topCard.bestHand() === "Two Pair");
    });
    
    it('should return Top Hand as Three of a Kind for 3 3 3 9 10, and should pass (pair test)', function () {
        const suites = [
            { "value": 3, "suit": "H" },
            { "value": 3, "suit": "C" },
            { "value": 3, "suit": "H" },
            { "value": 9, "suit": "C" },
            { "value": 10, "suit": "C" }
        ];

        const pair = new PokerHand(suites);
        assert(pair.containsPair());
        const topCard = new PokerHand(suites);
        assert(topCard.bestHand() === "Three of a Kind");
    });

    it('should return Top Hand as Four of a Kind for 3 3 3 3 10, and should pass (pair and three of a kind test)', function () {
        const suites = [
            { "value": 3, "suit": "H" },
            { "value": 3, "suit": "C" },
            { "value": 3, "suit": "H" },
            { "value": 3, "suit": "C" },
            { "value": 10, "suit": "C" }
        ];

        // const pair = new PokerHand(suites);
        // assert(pair.containsPair());
        // const twopair = new PokerHand(suites);
        // assert(twopair.containsTwoPair());
        const topCard = new PokerHand(suites);
        assert(topCard.containsPair());
        assert(topCard.containsThreeOfAKind());
        assert(topCard.bestHand() === "Four of a Kind");

        //checking out all of them
        console.log("pair: " + topCard.containsPair());
        console.log("two pair: " + topCard.containsTwoPair());
        console.log("three of kind: " + topCard.containsThreeOfAKind());
        console.log("straight: " + topCard.containsStraight());
        console.log("flush: " + topCard.containsFlush());
        console.log("full house: " + topCard.containsFullHouse());
        console.log("four of a kind: " + topCard.containsFourOfAKind());
        console.log("straight flush: " + topCard.containsStraightFlush());
        console.log("royal flush: " + topCard.containsRoyalFlush());
        console.log("high Card: " + topCard.highCard());
    });

    it('should return Top Hand as Straight for A 2 8 3 9, and pair shoud be false', function () {
        const suites = [
            { "value": 14, "suit": "H" },
            { "value": 2, "suit": "C" },
            { "value": 8, "suit": "H" },
            { "value": 3, "suit": "C" },
            { "value": 9, "suit": "C" }
        ];

        const topCard = new PokerHand(suites);
        assert(topCard.containsPair()=== false);
        assert.equal(topCard.bestHand(), "ACE of HEARTS");
    });

    it('should fail to return Straight for A 2 3 8 9 , and pair shoud be false', function () {
        const suites = [
            { "value": 14, "suit": "H" },
            { "value": 2, "suit": "C" },
            { "value": 8, "suit": "H" },
            { "value": 3, "suit": "C" },
            { "value": 9, "suit": "C" }
        ];

        const topCard = new PokerHand(suites);
        assert(topCard.containsStraight() === false);

    });

});
