
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

    request('https://deckofcardsapi.com/api/deck/'+id+'/draw/?count=5', (error, response, body) => {
        const data = JSON.parse(body);
         console.log('Remaining Cards in the deck :', data.remaining); // Print the error if one occurred
        // console.dir(data, { depth: null, colors: true });// to show the prettfied JSON
        // let suites = data.cards.map(card => card.value + ' of ' + card.suit); // to store the  required values of JSON
        let suites = data.cards.map(card => new SuitValue(card.value, card.suit, card.code)); //assiging the values to the suitValue as an array
        console.log('\nDrawn Cards are :', data.cards.map(card => card.value + ' of ' + card.suit));
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
        changeValue('ACE', 'A');
        changeValue('KING', 'K');
        changeValue('JACK', 'J');
        changeValue('QUEEN', 'Q');
        changeSuit('SPADES','S');
        changeSuit('DIAMONDS', 'D');
        changeSuit('CLUBS', 'C');
        changeSuit('HEARTS','H');
        console.log('suits:', suites);

        
    });

});