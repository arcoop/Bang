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

    // createFuses() {
    //     let x = 348
    //     let y = 100
    //     while (this.fuses.length < 3) {
    //         this.fuses.push(new Fuse(this, "orange", [x, y]))
    //         x += 90
    //     }
    // }
    createFuses() {
        let x = 650
        let y = 70
        while (this.fuses.length < 3) {
            this.fuses.push(new Fuse(this, "orange", [x, y]))
            x += 90
        }
    }

    createClues() {
        let x = 640
        let y = 148
        while (this.clues.length < 4) {
            this.clues.push(new Clue(this, "yellow", [x, y]))
            x += 65
        }
        y += 70
        x = 640
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
    // drawObjects(gameCtx, playerCtx) {
    drawObjects(gameCtx) {
        // console.log("inside game.drawobjects")

        
        const currentPlayerPositions = {
            0: [910, 170],
            1: [1070, 170],
            2: [1230, 170],
            3: [1390, 170],
            4: [1550, 170],
        }

        const otherPlayerPositions = {
            0: [910, 500],
            1: [1070, 500],
            2: [1230, 500],
            3: [1390, 500],
            4: [1550, 500],
        }

        for (let i = 0; i < this.currentPlayer.hand.length; i++) {
            let card = this.currentPlayer.hand[i]
            card.pos = currentPlayerPositions[i]
            // console.log(card.selected)
            let color;
            // card.draw(playerCtx, currentPlayerPositions[i][0], currentPlayerPositions[i][1], "gray", card.selected)
            if (card.revealed || card.revealedColor) {
                color = card.color
            } else color = "gray"

            card.draw(gameCtx, currentPlayerPositions[i][0], currentPlayerPositions[i][1], color, card.selected)
            if (card.revealed || card.revealedNum) {
                card.drawCardNum(gameCtx, currentPlayerPositions[i][0], currentPlayerPositions[i][i], card.num)
            }
        }

        for (let i = 0; i < this.players[1].hand.length; i++) {
            let card = this.players[1].hand[i]
            card.pos = otherPlayerPositions[i]
            // console.log(card.selected)
            // card.draw(playerCtx, otherPlayerPositions[i][0], otherPlayerPositions[i][1], card.color, card.selected)
            // card.drawCardNum(playerCtx, otherPlayerPositions[i][0], otherPlayerPositions[i][1], card.num)
            card.draw(gameCtx, otherPlayerPositions[i][0], otherPlayerPositions[i][1], card.color, card.selected)
            card.drawCardNum(gameCtx, otherPlayerPositions[i][0], otherPlayerPositions[i][1], card.num)
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

    // play() {
    //     this.drawObjects(this.gameCtx, this.playerCtx)
    //     console.log("inside play function")

        
    // }

    
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

    // play() {
    //     //get move
    //     // make move
    //         //clear rect
    //         //redraw (drag?)
    //     //update score
    //     //switch turns
    // }

}



module.exports = Game;