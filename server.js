const PokerHand = require('./lib/poker/hand');
const DeckOfCardsAPI = require('./lib/deckofcardsapi');

(async () => {

    try {
        const deckApi = new DeckOfCardsAPI();

        const { deck_id } = await deckApi.shuffle();

        const suites = await deckApi.draw(deck_id);
        console.log(suites.card.value + '' + suites.card.suit);
        console.log('suit', suites);

        const pokerHand = new PokerHand(suites);

        // Test Calls
        console.log("pair: " + pokerHand.containsPair());
        console.log("two pair: " + pokerHand.containsTwoPair());
        console.log("three of kind: " + pokerHand.containsThreeOfAKind());
        console.log("straight: " + pokerHand.containsStraight());
        console.log("flush: " + pokerHand.containsFlush());
        console.log("full house: " + pokerHand.containsFullHouse());
        console.log("four of a kind: " + pokerHand.containsFourOfAKind());
        console.log("straight flush: " + pokerHand.containsStraightFlush());
        console.log("royal flush: " + pokerHand.containsRoyalFlush());

        console.log(pokerHand.bestHand());

    } catch (e) {

        console.error('Deck of cards API failed!', e.message);

    }

})();

