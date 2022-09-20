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
        this.numClues = 8;
        this.numFuses = 3;
        this.numTurns = 2
        this.playSelected = false;
        this.discardSelected = false;

    }

    //game logic:
    
    //1. player either discards, plays, or gives clue
    //2. if discard --> 
    //  2a. call PlayorDiscard(discard)
    //      2a.a. update discard piles and positions
    //      2a.b if num clues < 8, num clues += 1
    //  2a. switch turns
    //3. if play -->
    //  3a. call play or discard(play)
    //      3a.a check for valid play 
    //          3.a.a if valid --> update play piles and card position
    //          3.a.b if not valid --> move to dsicard, fuse -= 1
    //      switch tunrs
    //4 if clue -->
    //      num clues -=1
    //      clued card.touched = true
    //      if the clue is color 
    //          card.revealedColor = true
    //      else if clue is number
    //          card.revealedNum = true
    //  switch turns
    // 
    draw(ctx, x, y) {
        ctx.roundRect(x, y, 140, 220, 15);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "gray"
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

    
    handleDiscardClick(discardPositions, allColors) {
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

    handlePlayClick(playPositions, allColors) {
        const cards = this.players[0].hand
        cards.forEach(card => {
            if (card.selected) {
                // let cardColorIdx = allColors.indexOf(card.color)
                // card.pos = playPositions[cardColorIdx]
                // card.selected = false;
                this.playOrDiscard(card, "play", playPositions, allColors)
            }
        })    
    }

    handleClueHover(type, attribute) {
        console.log("type: " + type)
            const cards = this.players[1].hand
            if (type === "color") {
                cards.forEach(card => {
                    if (card.color === attribute) {
                        card.selected = true
                    }
                })
            } else {
                cards.forEach(card => {
                    if(card.num === attribute) {
                        card.selected = true
                    }
                })
            }
            window.addEventListener("click", (e) => {
                let clickY = e.clientY - e.target.getBoundingClientRect().top;
                let clickX = e.clientX - e.target.getBoundingClientRect().left;
                console.log(clickX)
                console.log(clickY)
                cards.forEach(card => {
                    let innerXStart = card.pos[0]
                    let innerYStart = card.pos[1] + 240
                    let innerXEnd = innerXStart + 60
                    let innerYEnd = innerXStart + 60
                    if ((clickX >= innerXStart && clickX <= innerXEnd) && (clickY >= innerYStart && clickY <= innerYEnd)) {
                        this.giveClue(card, "color")
                    } else {
                        innerXStart = card.pos[0] + 80
                        innerYStart = card.pos[1] + 240
                        innerXEnd = innerXStart + 60
                        innerYEnd = innerXStart + 60
                        if ((clickX >= innerXStart && clickX <= innerXEnd) && (clickY >= innerYStart && clickY <= innerYEnd)) {
                            this.giveClue(card, "number")
                        }
                    }
                })
            })
    } 

    error(num) {
        switch(num) {
            case 1:
                return "not enough clues, must discard or play"
                break;
            case "misplay":
                return "misplay!"
                break;
        }
        // console.log("Not a valid move")
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
        let pivotIdx = cards.indexOf(pivotCard)
        let pile;
        if (moveType === "discard") {
            if (this.numClues < 8) this.numClues += 1
            pile = this.discardPiles
        } else {
            if (this.validMove(pivotCard, allColors)) {
                pile = this.playPiles;
                // console.log("valid move")
            } else {
                pile = this.discardPiles;
                // console.log(this.discardPiles)
                console.log("misplay")
                this.numFuses -= 1;
                console.log(this.numFuses)
            }
        }
        
        this.currentPlayer.hand = this.currentPlayer.hand.slice(0, pivotIdx).concat(this.currentPlayer.hand.slice(pivotIdx + 1))
        
    
        let colorIdx = allColors.indexOf(pivotCard.color)       
        pile[colorIdx].push(pivotCard)
        pivotCard.revealedColor = true;
        pivotCard.revealedNum = true;
        pivotCard.selected = false;
        pivotCard.pos = positions[colorIdx]
        this.addCard(this.currentPlayer.hand)
        this.switchTurns();
    }

    validMove(currentCard, allColors) {
        // console.log("all colors" + allColors)
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
        
        // this.playPiles.forEach(pile) {
        //     if (pile.length )
        // }


        // const playNums = this.playPiles.map(card => card.num)
        
    }

    giveClue(card, info) {
        if (this.num >= 0) {
            if (info === "color") {
                card.revealedColor = true;
                console.log(card.revealedColor)
            } else if (info === "number") {
                card.revealedNum = true;
                console.log(card.revealedNum)
            }
            this.numClues -= 1
        } else {
            this.error(1)
        }
        
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

    currentHands() {
        const cards = this.players[0].hand.concat(this.players[1].hand)
        return cards;
    }

    anyCardsSelected() {
        const cards = this.players[0].hand.concat(this.players[1])
        console.log(this.currentHands().some(card => card.selected))
        return this.currentHands().some(card => card.selected)
    }


}



module.exports = Game;