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
        this.createFuses();
        this.createClues();
        this.dealCards();
        this.playSelected = false;
        this.discardSelected = false;

        this.playPositions = {
            0: [320, 500],
            1: [480, 500],
            2: [640, 500],
            3: [800, 500],
            4: [960, 500],
        }

        this.discardPositions = {
            0: [15, 320],
            1: [15, 480],
            2: [15, 640],
            3: [15, 800],
            4: [15, 960],
        }

        this.allColors = ["blue", "white", "red", "yellow", "green"]
    }

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

    drawObjects(gameCtx) {

        gameCtx.clearRect(0, 0, 1800, 1800)

        this.setupBackground(gameCtx);
        this.renderTurnText(gameCtx);
        this.addScoreBox(gameCtx);
        this.addText(gameCtx)
        this.renderDiscardPiles(gameCtx)
        this.renderPlayPiles(gameCtx)
        this.renderClueText(gameCtx)

        // console.log("cleared")
        const currentPlayerPositions = {
            0: [1210, 170],
            1: [1370, 170],
            2: [1530, 170],
            3: [1690, 170],
            4: [1850, 170],
        }

        const otherPlayerPositions = {
            0: [1210, 500],
            1: [1370, 500],
            2: [1530, 500],
            3: [1690, 500],
            4: [1850, 500],
        }

        for (let i = 0; i < this.currentPlayer.hand.length; i++) {
            let card = this.currentPlayer.hand[i]
            card.pos = currentPlayerPositions[i]
            let color;
            if (card.revealed || card.revealedColor) {
                color = card.color
            } else color = card.color//"gray"

            card.draw(gameCtx, currentPlayerPositions[i][0], currentPlayerPositions[i][1], color, card.selected)
            if (card.revealed || card.revealedNum) {
                card.drawCardNum(gameCtx, currentPlayerPositions[i][0], currentPlayerPositions[i][i], card.num)
            }
        }

        for (let i = 0; i < this.players[1].hand.length; i++) {
            let card = this.players[1].hand[i]
            card.pos = otherPlayerPositions[i]
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

    setupBackground(gameCtx) {
        gameCtx.beginPath();
        gameCtx.roundRect(1200,0,800,1000, 30);
        gameCtx.fillStyle = "#8CF1DB";
        gameCtx.fill();
    }

    addScoreBox(gameCtx) {
        gameCtx.beginPath();
        gameCtx.roundRect(10, 70, 230, 90, 35);
        gameCtx.strokeStyle = "black"
        gameCtx.stroke();
        gameCtx.font = "20px Helvetica"
        gameCtx.fillStyle = "black"
        gameCtx.fillText("Score:", 85, 100)
        gameCtx.font = "40px Helvetica"
        gameCtx.strokeStyle = "green"
        gameCtx.strokeText(`${this.score}`, 105, 145)
    }

    addText(gameCtx) {
        gameCtx.font = "50px Helvetica"
        gameCtx.fillStyle = "black"
        gameCtx.strokeText("My Hand", 1500, 120);

        gameCtx.font = "50px Helvetica"
        gameCtx.fillStyle = "black"
        gameCtx.strokeText("Player 2's Hand", 1400, 480);

    }

    renderTurnText(gameCtx) {
        gameCtx.font = "20px Helvetica"
        gameCtx.fillStyle = "black"
        gameCtx.fillText(`${this.currentPlayer.name}'s turn`, 1240, 50)
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

    renderClueText(gameCtx) {
        const cards = this.players[1].hand

        cards.forEach(card => {
            if (card.selected) {
                gameCtx.beginPath();
                gameCtx.roundRect(card.pos[0], card.pos[1] + 240, 60, 60, 3);
                gameCtx.fillStyle = card.color;
                gameCtx.fill();
                gameCtx.font = "30px Helvetica"
                gameCtx.fillStyle = "black"
                gameCtx.fillText(card.num, card.pos[0] + 75, card.pos[1] + 280)

            }
        })

    }

    renderDiscardPiles(gameCtx) {
        const cards = this.currentPlayer.hand
 
        if (cards.some(card => card.selected)) {
            gameCtx.font = "45px Helvetica"
            gameCtx.strokeStyle = "red"
            gameCtx.strokeText("Discard", 50, 300)
          
        } else {
            gameCtx.font = "35px Helvetica"
            gameCtx.strokeStyle = "black"
            gameCtx.strokeText("Discard", 50, 300) 
        }
        this.discardPiles.forEach(pile => {

            if (pile.length > 0) {
                pile.forEach(card => {
                    card.draw(gameCtx, card.pos[0], card.pos[1], card.color, card.selected)
                })
            } else {
                for (let i = 0; i < 5; i ++) {
                    let x = this.discardPositions[i][0]
                    let y = this.discardPositions[i][1]
                    gameCtx.roundRect(x, y, 140, 200, 15);
                    gameCtx.lineWidth = 1;
                    gameCtx.strokeStyle = "gray"
                    gameCtx.stroke();
                }
            }
        })
    }

    renderPlayPiles(gameCtx) {
        const cards = this.currentPlayer.hand
        if (cards.some(card => card.selected)) {
                // selectedCard = card;
                gameCtx.font = "45px Helvetica"
                gameCtx.strokeStyle = "red"
                gameCtx.strokeText("Play", 650, 400)
            } else {
                gameCtx.font = "35px Helvetica"
                gameCtx.strokeStyle = "black"
                gameCtx.strokeText("Play", 650, 400) 
            }

        this.playPiles.forEach(pile => {
            if (pile.length > 0) {
                pile.forEach(card => {
                    card.draw(gameCtx, card.pos[0], card.pos[1], card.color, card.selected)
                })
            } else {
                for (let i = 0; i < 5; i ++) {
                    let x = this.playPositions[i][0]
                    let y = this.playPositions[i][1]
                    gameCtx.roundRect(x, y, 140, 200, 15);
                    gameCtx.lineWidth = 1;
                    gameCtx.strokeStyle = "gray"
                    gameCtx.stroke();
                }
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
        pile[colorIdx].push(pivotCard)
        pivotCard.revealedColor == true;
        pivotCard.revealedNum == true;
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