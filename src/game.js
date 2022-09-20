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
        // this.fuses = []
        // this.clues = []
        this.numClues = 8;
        this.numFuses = 3;
        this.numTurns = 2
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

    
    handleDiscardClick(discardPositions, allColors) {
        const cards = this.players[0].hand
        cards.forEach(card => {
            if (card.selected) {
                let cardColorIdx = allColors.indexOf(card.color)
                card.pos = discardPositions[cardColorIdx]
                card.selected = false;
                this.playOrDiscard(card, "discard", discardPositions, allColors)
            }
        })    
    }

    handlePlayClick(playPositions, allColors) {
        const cards = this.players[0].hand
        cards.forEach(card => {
            if (card.selected) {
                let cardColorIdx = allColors.indexOf(card.color)
                card.pos = playPositions[cardColorIdx]
                card.selected = false;
                this.playOrDiscard(card, "play", playPositions, allColors)
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


    playOrDiscard(pivotCard, moveType, positions, allColors) {
        const cards = this.currentPlayer.hand

        // let pivotCard = card
        let pivotIdx = cards.indexOf(pivotCard)

        let pile;
        
        if (moveType === "discard") {
            this.numClues -= 1
            pile = this.discardPiles
        } else {
            pile = this.playPiles;
        }
        
        this.currentPlayer.hand = this.currentPlayer.hand.slice(0, pivotIdx).concat(this.currentPlayer.hand.slice(pivotIdx + 1))

        let colorIdx = allColors.indexOf(pivotCard.color)       
        pivotCard.revealedColor = true;
        pivotCard.revealedNum = true;
        // pivotCard.selected = false;
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

    // currentHands() {
    //     const hands = []
    //     this.players[0].
    //     console.log(this.players[0].hand)
    //     console.log(this.players[0].hand.concat(this.players[1].hand))
    //     const cards = this.players[0].hand.concat(this.players[1]).hand
    //     console.log(cards)
    //     return cards;
    // }

    anyCardsSelected() {
        const cards = this.players[0].hand.concat(this.players[1])
        console.log(this.currentHands().some(card => card.selected))
        return this.currentHands().some(card => card.selected)
    }


}



module.exports = Game;