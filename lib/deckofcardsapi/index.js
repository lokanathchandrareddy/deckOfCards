
'use strict'
const request = require('request-promise');

const changeValue = (suites, value, letter) => {
    for (const key of Object.keys(suites)) {
        if (suites[key].value == value) {
            suites[key].value = letter;
        }
    }
}

const changeSuit = (suites, value, letter) => {
    for (const key of Object.keys(suites)) {
        if (suites[key].suit == value) {
            suites[key].suit = letter;
        }
    }
}

class DeckOfCardsAPI {

    static get endpoints() {
        return {
            shuffle: 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1',
            draw: 'https://deckofcardsapi.com/api/deck/{id}/draw/?count=5'
        }
    }

    shuffle() {
        return request({
            url: this.constructor.endpoints.shuffle,
            json: true
        });
    }

    async draw(id) {
        const data = await request({
            url: this.constructor.endpoints.draw.replace('{id}', id),
            json: true
        });

        const suites = data.cards.map(card => ({ value: card.value, suit: card.suit }));

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




