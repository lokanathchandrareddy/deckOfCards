# deckOfCards

Node.js application to find Top Poker hand using the deck of cards API (https://deckofcardsapi.com/) 
  
Should Perform these things.

* Creates and shuffles a deck of cards
* Draws 5 cards from the hand and prints their numbers and suits to the console
* Identifies the top scoring poker hand (https://en.wikipedia.org/wiki/List_of_poker_hands) that the cards fulfill and prints it to the console.
------------------------------------------------------------------------------------------------------------------------------
### Follow these steps
* Step 1: Clone the repository using git clone in the terminal
* Step 2: cd deckOfCards ( navigate inside of the directory)
* Step 3: **npm install** (to install all the modules in package.json)
* Step 4: **npm audit fix** (if required or if it suggests in the terminal)
* Step 5: To run the app - use **npm start or node deck.js** 
* Step 6: To test the test cases using mocha **npm test or node node_modules/.bin/mocha test/**

------------------------------------------------------------------------------------------------------------------------------
## Assumptions
* Changed the values of __'ACE' -> 14, 'KING'-> 13, 'QUEEN' -> 12, 'JACK' ->11 and 'CLUBS' -> 'C', 'SPADES' -> 'S', 'HEARTS' -> 'H', 'DIAMONDS' -> 'D'__ to use just numbers and single letter to compare.
* Used the same deck_id obtained from the shuffle to draw the cards(we can also use 'new' if dont want use the same deck id)
* **Pair** -> Two cards of the same value
* __Two pair__ -> Two cards of the one value and two cards of another value, it should fullfill the pair function
* __Three of a kind__ -> Three cards of the same value and it should pass the pair function, but fail the two pair function
* __Straight__ -> Five card values in a sequence ( considered the difference of high and low value = 4 for all the straight except __[A, 2,3,4,5]__)
* __Straight__ -> for __[A,2,3,4,5]__, remove 'A' and pass it new array and check the difference of high and low is 3
* __Flush__ -> Five card suits of same values( passed the unique suit values to the new array and check if the size = 1)
* __Full House__ -> check if there exactly one three of a kind and one pair of different values
* __Four of a Kind__ -> Four cards of same card value ( pair shoud pass, but two pair should fail)
* __Straight flush__ -> check if it is flush and also straight, A,2,3,4,5 should also work
* __Royal flush__ -> check if it is straight, flush, straigh flush and also the low value is 10
* Count of cards drawn = 5
