const Deck = require('./deck.js')
const Player = require('./player.js')
// const GameObject = require('./game_object.js')
const Fuse = require('./fuse.js')
const Clue = require('./clue.js')


class Game {
    constructor(name1, name2) {
        this.score = 0;
        this.deck = new Deck
        this.player1 = new Player(name1);
        this.player2 = new Player(name2);
        this.players = [this.player1, this.player2]
        this.currentPlayer = this.players[0]
        this.playPiles = []
        this.discardPiles = []
        this.fuses = []
        this.clues = []
        this.numClues = this.clues.length;
        this.numFuses = this.fuses.length;
        this.numTurns = 2
        this.createFuses();
        this.createClues();
        this.dealCards();
    }

    createFuses() {
        let x = 348
        let y = 100
        while (this.fuses.length < 3) {
            this.fuses.push(new Fuse(this, "orange", [x, y]))
            x += 90
        }
    }

    createClues() {
        let x = 340
        let y = 200
        while (this.clues.length < 4) {
            this.clues.push(new Clue(this, "yellow", [x, y]))
            x += 65
        }
        y += 70
        x = 340
        while (this.clues.length >= 4 && this.clues.length < 8) {
            this.clues.push(new Clue(this, "yellow", [x, y]))
            x += 65
        }
    }

    addCard(hand) {
        hand.unshift(this.deck.deckArray.shift())
    }


    dealCards() {
        
        for (let i = 0; i < this.players.length; i++) {
            let player = this.players[i]
            while (player.hand.length < 5) {

                this.addCard(player.hand)
            }
        }
    }

    drawObjects(gameCtx, playerCtx) {
        const currentPlayerPositions = {
            0: [10, 170],
            1: [170, 170],
            2: [330, 170],
            3: [500, 170],
            4: [670, 170],
        }

        const otherPlayerPositions = {
            0: [10, 500],
            1: [170, 500],
            2: [330, 500],
            3: [500, 500],
            4: [670, 500],
        }

        // let xPos = 10
        // let yPos = 170
        for (let i = 0; i < this.currentPlayer.hand.length; i++) {
            let card = this.currentPlayer.hand[i]
            // console.log(card)
            card.draw(playerCtx, currentPlayerPositions[i][0], currentPlayerPositions[i][1], "gray")
            // xPos += 160
        }

        xPos = 10
        yPos = 500
        for (let i = 0; i < this.players[1].hand.length; i++) {
            let card = this.players[1].hand[i]
            // console.log(card)
            card.draw(playerCtx, xPos, yPos, card.color)
            card.drawCardNum(playerCtx, xPos, yPos, card.num)
            xPos += 160
        }

        for (const fuse of this.fuses) {
            fuse.draw(gameCtx, fuse.pos[0], fuse.pos[1])
        }

        for (const clue of this.clues) {
            clue.draw(gameCtx, clue.pos[0], clue.pos[1])
        }
    }

    switchTurns() {
        let temp = this.players[0]
        this.players[0] = this.players[1]
        this.players[1] = temp
        this.currentPlayer = this.players[0]
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

    clue(info) {
        // choose either "number" or "color"
        //game will select all the other cards that that also applies to
        //select "give clue"
        //num_clues -=1
    }

    updateScore() {
        this.playPiles.forEach(pile => {
            this.score += pile[pile.length - 1]
        })
        return this.score
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

    play() {
        //get move
        // make move
            //clear rect
            //redraw (drag?)
        //update score
        //switch turns
    }

}



module.exports = Game;