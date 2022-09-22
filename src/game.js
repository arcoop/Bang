const Deck = require('./deck.js')
const Player = require('./player.js')
// const GameObject = require('./game_object.js')
const Fuse = require('./fuse.js')
const Clue = require('./clue.js');
const { _ } = require('core-js');


class Game {
    constructor(name1, name2, ctx) {
        this.score = 0;
        this.ctx = ctx
        this.deck = new Deck(this)
        this.player1 = new Player(name1);
        this.player2 = new Player(name2);
        this.players = [this.player1, this.player2]
        this.currentPlayer = this.players[0]
        this.playPiles = [[],[],[],[],[]]
        this.discardPiles = [[],[],[],[],[]]
        this.numClues = 8;
        this.numFuses = 3;
        this.numTurns = 2
        this.playSelected = false;
        this.discardSelected = false;

    }

    draw(ctx, x, y) {
        ctx.roundRect(x, y, 140, 220, 15);
        ctx.lineWidth = 3;
        ctx.strokeStyle = "white"
        ctx.stroke();
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

    
    handleDiscardClick(event, discardPositions, allColors) {
        event.preventDefault();
        const cards = this.players[0].hand
        cards.forEach(card => {
            if (card.selected) {
                let cardColorIdx = allColors.indexOf(card.color)
                card.pos = discardPositions[cardColorIdx]
                card.selected = false;
                card.revealedColor = true;
                card.revealedNum = true;
                this.playOrDiscard(card, "discard", discardPositions, allColors)
            }
        })    
    }

    handlePlayClick(event, discardPositions, playPositions, playColors, discardColors) {
        event.preventDefault();
        const cards = this.players[0].hand
        cards.forEach(card => {
            if (card.selected) {
                if (this.validMove(card, playColors)) {
                    this.playOrDiscard(card, "play", playPositions, playColors, this.ctx)
                } else {
                    this.misplay(this.ctx)
                    this.playOrDiscard(card, "discard", discardPositions, discardColors, this.ctx, true)
                }
            }
        })    
    }

    delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    misplay(ctx) {
        this.numFuses -= 1
        this.delay(300).then(() => {
            ctx.font = "30px Futura"
            ctx.fillStyle = "red"
            if (this.numFuses === 1 ) {
                ctx.fillText(`Misfire! ${this.numFuses} fuses left!`, 930, 180)
            } else ctx.fillText(`Misfire! ${this.numFuses} fuses left!`, 930, 180)
        })
    }

    handleClueHover(e, type, attribute) {
        e.preventDefault();
        const cards = this.players[1].hand
        if (type === "color") {
                cards.forEach(card => {
                    if (card.color === attribute) {
                        card.secondarySelected = true
                    }
                })
            } else {
                cards.forEach(card => {
                    if(card.num === attribute) {
                        card.secondarySelected = true
                    }
                })
            }
    } 

    switchTurns() {
        let temp = this.players[0]
        this.players[0] = this.players[1]
        this.players[1] = temp
        this.currentPlayer = this.players[0]
    }

    playOrDiscard(pivotCard, moveType, positions, allColors, ctx, misplay=false) {
        const cards = this.currentPlayer.hand
        let pivotIdx = cards.indexOf(pivotCard)
        let pile;
        if (misplay) {
            pile = this.discardPiles
        } else if (moveType === "discard") {
            if (this.numClues < 8) {
                this.numClues +=1 ;
                pile = this.discardPiles
            } else {
                ctx.font = "30px Futura"
                ctx.fillStyle = "red"
                ctx.fillText(`Must have fewer than 8 clues to discard`, 800, 1000)
            }
        } else {
            pile = this.playPiles;
        }

        this.currentPlayer.hand = this.currentPlayer.hand.slice(0, pivotIdx).concat(this.currentPlayer.hand.slice(pivotIdx + 1))
        
        let colorIdx = allColors.indexOf(pivotCard.color)
        pile[colorIdx].push(pivotCard)
        pivotCard.revealedColor = true;
        pivotCard.revealedNum = true;
        pivotCard.selected = false;
        pivotCard.pos = positions[colorIdx]
        if (pivotCard.num === 5) this.numClues += 1
        this.addCard(this.currentPlayer.hand)
        this.switchTurns();
        this.updateScore();
    }

    validMove(currentCard, allColors) {
        let colorIdx = allColors.indexOf(currentCard.color)

        let pile = this.playPiles[colorIdx]

        if (pile.length > 0) {
            if (pile[pile.length - 1].num + 1 === currentCard.num) {
                return true
            }
        } else if (pile.length === 0) {
            if (currentCard.num === 1) return true
        }
        return false;
  
        
    }

    giveClue(cards, info, ctx) {   
        if (this.numClues >= 0) {
            cards.forEach(card => {
                card.touched = true;
                if (info === "color") {
                    card.revealedColor = true;
                } else if (info === "number") {
                    card.touched = true;
                    card.revealedNum = true;
                }
            })
            this.delay(200).then(() => {
                this.numClues -= 1
            })
            
        } else {
            ctx.font = "30px Helvetica"
            ctx.fillStyle = "red"
            ctx.fillText(`Not enough clues! You must discard or play.`, 800, 1000)
        }
        
    }

    updateScore() {
        let score = 0
        this.playPiles.forEach(pile => {
            if (pile.length > 0) score += pile[pile.length - 1].num
        })
        return this.score = score
    }

    won() {
        return this.score === 25
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

    currentHands() {
        const cards = this.players[0].hand.concat(this.players[1].hand)
        return cards;
    }

    // anyCardsSelected() {
    //     const cards = this.players[0].hand.concat(this.players[1])
    //     return this.currentHands().some(card => card.selected)
    // }


}



module.exports = Game;