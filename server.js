const  request = require('request');

request('https://deckofcardsapi.com/api/deck/new/draw/?count=5', function (error, response, body) {
    const data = JSON.parse(body);
    console.log('remaining :', data.remaining); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    // console.dir(data, { depth: null, colors: true });// to show the prettfied JSON
    let suites = data.cards.map(card => card.value + 'of'+ card.suit); // to store the  required values of JSON
    console.log('Hand:', suites);
    // console.log('suit:', data.cards[0].suit);
    // console.log('suit:', data.cards.filter(card => card.suit));
});

