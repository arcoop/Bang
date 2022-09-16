# Welcome to the world of Bang!

## Background
This game is based on the classic card game, Hanabi.
In this game, two players work together with the goal of building the perfect firework show.
The deck consists of cards numbered 1-5, of five suits (differentiated by color). 
A perfect fireworks show is represented by a stack of 1-5 in each of the five suits.
The players cannot see their own hands but can see their partner's hand. On a turn, a player can either:
1. Give a clue to the other player about either the number or the color (but not both) of a card
    - If a clue applies to more than one card, a player must give this clue about both cards
2. Discard a card (gains back one clue token)
3. Play a card (uses up one of 8 clue tokens)
The game is over either when either: 
- The players have won
- The last card in the deck is drawn and everyone gets one more turn
- Players mis-play three times

The instructions functionality, and bonus features sections will further detail game play.

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








