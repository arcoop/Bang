const Deck = require('./deck.js')
const Player = require('./player.js')
// const GameObject = require('./game_object.js')
const Fuse = require('./fuse.js')
const Clue = require('./clue.js')


class Game {
    constructor(name1, name2) {
        this.deck = new Deck
        this.player1 = new Player(name1);
        this.player2 = new Player(name2);
        this.players = [this.player1, this.player2]
        this.currentPlayer = this.player1
        this.playPiles = []
        this.discardPiles = []
        this.fuses = []
        this.clues = []
        this.numClues = this.clues.length
        this.numFuses = this.fuses.length;
        this.dealCards();
        this.numTurns = 2
    }

    createFuses() {
        let x = 300
        let y = 70
        while (this.fuses.length < 3) {
            this.fuses.push(new Fuse(this, "orange", [x, y]))
            x += 70
        }
    }

    createClues() {
        let x = 200
        let y = 70
        while (this.clues.length < 4) {
            this.clues.push(new Clue(this, "yellow", [x, y]))
            x += 70
        }
        y += 70
        while (this.clues.length >= 4 && this.clues.length < 8) {
            this.clues.push(new Clue(this, "yellow", [x, y]))
            y += 70
        }
    }


    addCard(hand) {
        hand.unshift(this.deckArray.shift())
    }

    dealCards() {
        for (let i = 0; i < this.players.length; i++) {
            let player = this.players[i]
            while (player.hand.length < 5) {
                this.addCard(player.hand)
            }
        }
    }

    drawObjects(ctx) {
        // let xPos = 600
        // let yPos = 40
        for (let i = 0; i < this.currentPlayer.hand.length; i++) {
            let card = this.player1.hand[i]
            console.log(card)
            card.draw(ctx, xPos, yPos, card.color, card.num)
            // xPos += 70
        }
    }

    switchTurns() {
        this.currentPlayer === this.player1 ? this.currentPlayer = this.player2 : this.currentPlayer = this.player1
    }

    makeMove() {
        if (this.numTurns >= 2) {
              //user selects a card from the other player's hand
            //they can either select a pile from the play area or a pile from the discard area or clue
        } else {
            //make move
            this.numTurns -= 1
        }
      
    }
    
    playOrDiscard(moveType) {
        let pile;
        let pivotCard;
        let hand = this.currentPlayer.hand
        if (moveType === "discard") {
            pile = this.discardPiles
            pivotCard = hand[hand.length-1]
            hand = hand.slice(0, length - 1)
        } else {
            pile = this.playPiles;
            //need to change this to be based on where the user chooses to click 
            cardIdx = hand[0]
            hand = hand.slice(0, cardIdx).concat(hand.slice(cardIdx + 1))
        }
        pile.push(pivotCard)
        this.addCard()
    }

    misplay() {
        // this.playPiles.each 
        //num_fuses -= 1
    }

    clue() {
        // choose either "number" or "color"
        //game will select all the other cards that that also applies to
        //select "give clue"
        //num_clues -=1
    }

    won() {
        return this.playPiles.every(pile => {
            pile[pile.length - 1] === 5
        })
    }

    lost() {
       return this.over() && !won()
    }

    deckEmpty() {
        return deckArray.length === 0;
    }

    over() {
        return this.numTurns === 0 || this.numFuses === 0
    }

    


}



module.exports = Game;