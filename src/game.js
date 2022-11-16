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
        this.won = false
        this.over = false;
    }

    draw(ctx, x, y) {
        ctx.roundRect(x, y, 140, 220, 15);
        ctx.lineWidth = 3;
        ctx.strokeStyle = "white"
        ctx.stroke();
    }

    addCard(hand) {
        hand.unshift(this.deck.deckArray.shift())
        console.log("added card")
    }

    dealCards() {
        for (let i = 0; i < this.players.length; i++) {
            let player = this.players[i]
            while (player.hand.length < 5) {
                this.addCard(player.hand)
            }
        }
    }

    //Discard Click Logic
    handleDiscardClick(event, discardPositions, allColors, ctx) {
        event.preventDefault();
        const cards = this.players[0].hand
        cards.forEach(card => {
            if (card.selected) {
                let cardColorIdx = allColors.indexOf(card.color)
                card.pos = discardPositions[cardColorIdx]
                card.selected = false;
                card.revealedColor = true;
                card.revealedNum = true;
                this.playOrDiscard(card, "discard", discardPositions, allColors, ctx)
            }
        })    
    }

    //Play Click Logic
    handlePlayClick(event, discardPositions, playPositions, playColors, discardColors, ctx) {
        event.preventDefault();
        const cards = this.players[0].hand
        cards.forEach(card => {
            if (card.selected) {
                if (this.validMove(card, playColors)) {
                    this.playOrDiscard(card, "play", playPositions, playColors, ctx)
                } else {
                    this.misplay(ctx)
                    this.playOrDiscard(card, "discard", discardPositions, discardColors, ctx, true)
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
                ctx.fillText(`Misfire! ${this.numFuses} fuses left!`, 700, 40)
            } else if (this.numFuses > 0) {
                ctx.fillText(`Misfire! ${this.numFuses} fuses left!`, 700, 40)   
            }
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
        if (this.numFuses === 0 || this.numTurns === 0) {
            this.over = true;
        } else if (this.score === 25) {
            this.won = true;
        } else {
            let temp = this.players[0]
            this.players[0] = this.players[1]
            this.players[1] = temp
            this.currentPlayer = this.players[0]
            if (this.deck.deckArray.length === 0) {
                this.numTurns -= 1
            }
        }
        console.log("switched turns")
    }

    //Play or Dicard moves use similar logic so they are in one method.
    playOrDiscard(pivotCard, moveType, positions, allColors, ctx, misplay=false) {
        console.log(this.currentPlayer.hand)
        const cards = this.currentPlayer.hand
        let pivotIdx = cards.indexOf(pivotCard)
        let pile;
        if (misplay) {
            pile = this.discardPiles
        } else if (moveType === "discard") {
            if (this.numClues < 8) {
                this.numClues +=1 ;
                pile = this.discardPiles
                console.log(pile)
            } else {
                ctx.font = "30px Albert Sans"
                ctx.fillStyle = "red"
                ctx.fillText(`Must have fewer than 8 clues to discard`, 800, 1000)
            }
        } else {
            pile = this.playPiles;
        }

        this.currentPlayer.hand = this.currentPlayer.hand.slice(0, pivotIdx).concat(this.currentPlayer.hand.slice(pivotIdx + 1))
        
        //move card to the play or discard pile that matches the color of the card
        let colorIdx = allColors.indexOf(pivotCard.color)
        pile[colorIdx].push(pivotCard)
        pivotCard.revealedColor = true;
        pivotCard.revealedNum = true;
        pivotCard.selected = false;
        pivotCard.pos = positions[colorIdx]
        if (pivotCard.num === 5) this.numClues += 1
       //if (this.deck.deckArray.length > 0) this.addCard(this.currentPlayer.hand)
        // this.addCard(this.currentPlayer.hand)
        // this.switchTurns();
        // this.updateScore();
    }

    //check if the current card is playable (is equal to one more than the last card played of its color)
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

    //reveal the color or number of card and set it to touched
    giveClue(cards, info) {   
        if (this.numClues > 0) {
            console.log("enough clues")
            cards.forEach(card => {
                card.touched = true;
                if (info === "color") {
                    card.revealedColor = true;
                } else if (info === "number") {
                    card.touched = true;
                    card.revealedNum = true;
                }
            })
            this.numClues -= 1
            
        } else {
            this.ctx.font = "30px Helvetica"
            this.delay(10).then(()=> {
                this.ctx.fillStyle = "red"
                this.ctx.fillText(`Not enough clues! You must discard or play.`, 100, 680)
            })
            this.switchTurns()
        }
    }


    updateScore() {
            //needs to update every time because it should only check the top card of the play pile. Otherwise it would add to the previous score each turn.
            let score = 0
            this.playPiles.forEach(pile => {
                if (pile.length > 0) score += pile[pile.length - 1].num
            })
            this.score = score
    }

    drawWon() {
        this.ctx.clearRect(0,0, this.width, this.height)
        this.ctx.font = "100px Cursive"
        this.ctx.fillStyle = "black"
        this.ctx.fillText("You won!", this.width/3 + 70, 180)
        let image = document.getElementById("firework")
        this.ctx.drawImage(image, this.width/3 + 60, 250, 500, 700)
    }

    drawGameOver() {
        this.ctx.clearRect(0,0, this.width, this.height)
        this.ctx.font = "100px Cursive"
        this.ctx.fillStyle = "black"
        this.ctx.fillText(`Game Over! Your score was ${this.score}!`, 500, 500)
    }

    deckEmpty() {
        return this.deck.deckArray.length === 0;
    }

    currentHands() {
        const cards = this.players[0].hand.concat(this.players[1].hand)
        return cards;
    }

}

module.exports = Game;