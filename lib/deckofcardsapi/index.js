
'use strict'
const request = require('request-promise');

//defining a function to change the values: Example: ACE -> 14, King ->13 etc
const changeValue = (suites, value, letter) => {
    for (const key of Object.keys(suites)) {
        if (suites[key].value == value) {
            suites[key].value = letter;
        }
    }
}
//defining a function to change the suit values: Example: CLUBS -> C, SPADES -> S etc
// pass the array, value that need to the changed and the modified value
const changeSuit = (suites, value, letter) => {
    for (const key of Object.keys(suites)) {
        if (suites[key].suit == value) {
            suites[key].suit = letter;
        }
    }
}

//defining a class to fetch the data from the API 
class DeckOfCardsAPI {

    
    static get endpoints() {
        return {
            shuffle: 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1',
            draw: 'https://deckofcardsapi.com/api/deck/{id}/draw/?count=5'
        }
    }

    //to request the data from the shuffle API 
    shuffle() {
        return request({
            url: this.constructor.endpoints.shuffle,
            json: true
        });
    }
    //to request data from the draw API using the deck id 
    //Assumption: here i have assumed the count is 5. to draw 5 cards
    async draw(id) {
        const data = await request({
            url: this.constructor.endpoints.draw.replace('{id}', id),
            json: true
        });

        //creating an array with the fetched, JSON parsed values 
        const suites = data.cards.map(card => ({ value: card.value, suit: card.suit }));
        //changing the values and adding it back to suites
        changeValue(suites, 'ACE', '14');
        changeValue(suites, 'KING', '13');
        changeValue(suites, 'QUEEN', '12');
        changeValue(suites, 'JACK', '11');
        changeSuit(suites, 'SPADES', 'S');
        changeSuit(suites, 'DIAMONDS', 'D');
        changeSuit(suites, 'CLUBS', 'C');
        changeSuit(suites, 'HEARTS', 'H');

        return { cards: data.cards, suites };
    }


}

module.exports = DeckOfCardsAPI;




