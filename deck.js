const PokerHand = require('./lib/poker/hand');
const DeckOfCardsAPI = require('./lib/deckofcardsapi');

//using async to make sure that all functions returns promise, in this case, functions to fetch data from API
(async () => {

    //using try catch as a precaution
    try {
        const deckApi = new DeckOfCardsAPI();
        //getting the deck_id from the API
        const { deck_id } = await deckApi.shuffle();
        //drawing 5 cards from the deck, using the deck id from the prev line. 
        const { cards, suites } = await deckApi.draw(deck_id);
        //printing the drawn cards on the console
        console.log('\nDrawn Cards are :', cards.map(card => card.value + ' of ' + card.suit));
       
        const pokerHand = new PokerHand(suites);
        //printing the top poker hand on the deck, (poker hand of the 5 cards)
        console.log('\n \n ---TOP POKER HAND IS: ', pokerHand.bestHand() + ' ----  \n \n ' );

    } catch (e) {
        //if the promises fail
        console.error('Deck of cards API failed!', e.message);

    }
})();