# Welcome to Bang!

## Link Link: [Bang](https://arcoop.github.io/Bang/)

## Instructions:
Bang! is based on the classic tabletop card game, [Hanabi](https://boardgamegeek.com/boardgame/98778/hanabi). 
In this game, two players work together towards the end foal of building the perfect firework show.
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
In order to clue a card, click on the card in the other player's hand that you would like to discard. A box will pop up below where you can choose either the color or the number. Whichever you choose will automatically select the other cards in the hand that match that attribute. Those cards will now become "touched."
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


# Functionality & MVPs
## In Bang! users will be able to:
- Start a new game
- View their teammate's cards
- Select cards to clue, discard, or play
- View their points and progress throughout the game
- End a game

## In addition, this project will include:
- An AI player version
- An extra suit for choosing various settings
- Toggle the view so they can see what information their partner has
- an "Undo move" feature
- a "Replay" feature where players can view the last few movies
- instructions
- README

## Wireframes
[https://wireframe.cc/pegn8d]
- Game controls will include new game, end game, undo last move (bonus)
- Red cards will be various colors based on their suits


## Technologies, Libraries, APIs
For this project I will use:
- Canvas to build and draw the game elements.
- DOM to create HTML elements. 
- Webpack and Babel to bundle the Javascript code
- npm to manage dependencies
I am also considering using:
- [This library](https://github.com/einaregilsson/cards.js) which provides code for creating playing cards. Since my game does not use the standard deck of cards, I would need to modify the cards to reflect the deck I'm using.
- [Firebase](https://firebase.google.com/docs/games/setup) to make the two-player user experience smoother.

## Implementation Timeline
- Friday afternoon and Weekend:
    - Continue researching libraries
    - Begin rendering elements using Canvas and DOM
    - Create player class and deck
- Monday:
    - Create game class
    - Begin implementing game logic
- Tuesday
    - Create working controllers to start and end game
- Wednesday
    - Finish rendering elements and complete game functionality
    - Work on styling game
    - Begin work on AI logic
- Thursday
    - Finish up project
    - Deploy to GitHub








