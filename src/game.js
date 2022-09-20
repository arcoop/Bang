const Deck = require('./deck.js')
const Player = require('./player.js')
// const GameObject = require('./game_object.js')
const Fuse = require('./fuse.js')
const Clue = require('./clue.js');
const { _ } = require('core-js');


class Game {
    constructor(name1, name2) {
        this.score = 0;
        this.deck = new Deck(this)
        this.player1 = new Player(name1);
        this.player2 = new Player(name2);
        this.players = [this.player1, this.player2]
        this.currentPlayer = this.players[0]
        this.playPiles = [[],[],[],[],[]]
        this.discardPiles = [[],[],[],[],[]]
        this.fuses = []
        this.clues = []
        this.numClues = this.clues.length;
        this.numFuses = this.fuses.length;
        this.numTurns = 2
        this.dealCards();
        this.playSelected = false;
        this.discardSelected = false;

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

    

    

    handleDiscardClick() {
        const cards = this.players[0].hand
        cards.forEach(card => {
            if (card.selected) {
                let cardColorIdx = this.allColors.indexOf(card.color)
                console.log(cardColorIdx)
                card.pos = this.discardPositions[cardColorIdx]
                this.playOrDiscard("discard")
            }
        })    

    }
    handlePlayClick(ctx) {
        const cards = this.players[0].hand
        cards.forEach(card => {
            if (card.selected) {
                console.log("old card pos " + card.pos)
                let cardColorIdx = this.allColors.indexOf(card.color)
                console.log(cardColorIdx)
                card.pos = this.playPositions[cardColorIdx]
                console.log("new card pos " + card.pos)
                this.playOrDiscard("play", ctx)
            }
        })    

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

    
    playOrDiscard(moveType, ctx) {
        let pivotCard;
        let pivotIdx;
        
        const cards = this.currentPlayer.hand

        cards.forEach(card => {
            if (card.selected) {
                pivotCard = card;
                pivotIdx = cards.indexOf(pivotCard);
            }
        })

        let pile;
        let positions;
        
        if (moveType === "discard") {
            pile = this.discardPiles
            positions = this.discardPositions;
        } else {
            pile = this.playPiles;
            positions = this.playPositions;
        }
        
        this.currentPlayer.hand = this.currentPlayer.hand.slice(0, pivotIdx).concat(this.currentPlayer.hand.slice(pivotIdx + 1))

        let colorIdx = this.allColors.indexOf(pivotCard.color)       
        pivotCard.revealedColor == true;
        pivotCard.revealedNum == true;
        pile[colorIdx].push(pivotCard)
        this.addCard(this.currentPlayer.hand)
        // this.drawObjects(ctx)
    }

    misplay() {
        
    }

    clue(info) {
      
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


}



module.exports = Game;