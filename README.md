# Welcome to Bang!

## Link Link: [Bang](https://arcoop.github.io/Bang/)

## Instructions:
Bang! is based on the classic tabletop card game, [Hanabi](https://boardgamegeek.com/boardgame/98778/hanabi). 
In this game, two players work together towards the goal of building the perfect firework show.
The game consists of 5 suits (differentiated by color). Each suit has one 1, two 2s, two 3s, two 4s, and one 5 (40 cards total).
The perfect firework show is represented by having played the numbers 1-5 in every color on the board.
While Bang is a two-person game, this app is currently intended for one person two simulate the two-person experience. 
Each player has five cards in their hand. They cannot see their own hand but can see their teammate's hand.
On a given turn, they can either:
1. Play a card
2. Discard a card
3. Give the other player a clue about either the color or the number (not both) of cards in their hand. Any clue about one card much be given about all the cards that fit the same attribute (ie if there are three 4s you must clue about all of them.)
### Playing
In order to play a card, select the card you'd like to play and then click anywhere in the "play area", as seen in the image below. 
A card is playable if it is one number higher than the previous card on the board of that color. For example a purple 2 is playable if there is already a purple 1 played. 
#### Misplays
If an unplayable card is played, this is considered a "misfire." There are three misfires per game, represented by the fuses in the top right corner (see image).
### Discarding
Similarly, to discard, select the card you'd like to discard and then click anywhere in the "discard area." 
Conventionally, players should discard from the rightmost card of their untouched cards. A touched card referes to any card that has been clued. In this app those will be indicated by a light blue border. See image for details.
### Clueing
There are 8 clues in the game.
In order to clue a card, click on the card in the other player's hand that you would like to clue. A box will pop up below where you can choose either the color or the number. Whichever you choose will automatically select the other cards in the hand that match that attribute. Those cards will now become "touched."
### End of a turn
A turn ends after either playing, discarding, or clueing. In this app, the hands will switch and you will now play as the other player.

### End of Game
The game goes until either:
- It is won (all five 5s are out)
- It is lost (all fuses have been used)
- The deck is empty


With some pictures or gifs demoing your project
Technical implementation details with (good-looking) code snippets.
To-dos / future features.

## Technologies Used
This app was built entirely using Canvas to draw, select, and animate the game elements.
I used Google Fonts to implement fonts that are universally available rather than broswer-dependent.
In addition, I used Webpack and Babel to bundle the Javascript code and npm to manage the dependencies. I am using Github to host the site.


## Technical Implementation
This app was built on Canvas, relying on event listeners and the positions of items in order to make the game move.
The game starts with an HTML Aside element where users can log in. The Javascript captures their names, rendering the game canvas and starting a new game with the players' names.
There is an event listener for click and mouseover which compares the location of cards to the location of the mouse in order to determine if a card was clicked. A click of a card triggers the drawObjects method which will redraw the cards based on their "selected" status.
A click of the "play" or "discard" areas will update the card's position and trigger drawObjects which will read the card's position and draw them there.
The game also tracks the score using an updateScore method.
Users can also toggle the view so that they can see what the other player knows about their hand.

## To Dos and Bonus Features
I am working towards creating a computer player class with some basic AI functionality. 
The computer will prioritize when to give clues, discard, or play.
I would also like to introduce an "undo" feature that users can use to redo a play when desired.
I hope to create a sixth suit, as the original game has, which will allow users to choose from a variety of difficulty settings.
I will also work towards a log that tracks and prints recent moves.







