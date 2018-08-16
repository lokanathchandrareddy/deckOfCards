const PokerHand = require('./lib/poker/hand');
const DeckOfCardsAPI = require('./lib/deckofcardsapi');

(async () => {

    try {
        const deckApi = new DeckOfCardsAPI();

        const { deck_id } = await deckApi.shuffle();

        const { cards, suites } = await deckApi.draw(deck_id);
        console.log('\nDrawn Cards are :', cards.map(card => card.value + ' of ' + card.suit));

        const pokerHand = new PokerHand(suites);


        console.log('\n \n ---TOP POKER HAND IS: ', pokerHand.bestHand() + ' ----  \n \n ' );

    } catch (e) {

        console.error('Deck of cards API failed!', e.message);

    }


})();