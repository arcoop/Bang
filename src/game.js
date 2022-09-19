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

        gameCtx.clearRect(0, 0, 1800, 1800)

        this.setupBackground(gameCtx);
        this.addScoreBox(gameCtx);
        this.addText(gameCtx)
        this.renderDiscardPiles(gameCtx)
        this.renderPlayPiles(gameCtx)

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
        // gameCtx.textAlign = "center";

        gameCtx.font = "50px Helvetica"
        gameCtx.fillStyle = "black"
        gameCtx.strokeText("Player 2's Hand", 1400, 480);

    }

    renderTurnText(gameCtx) {
        // gameCtx.font = "20px Helvetica"
        // gameCtx.fillStyle = "black"
        // gameCtx.fillText("Score:", 85, 100)
        gameCtx.font = "20px Helvetica"
        gameCtx.fillStyle = "black"
        console.log(`${this.currentPlayer.name}'s turn`)
        gameCtx.fillText(`${this.currentPlayer.name}'s turn`, 920, 50)
        // gameCtx.fill();
    }

    handleMoveClick(event, ctx, x, y) {
        const cards = this.player1.hand.concat(this.player2.hand)
        cards.forEach(card => {
            if (card.selected) {
                let cardColorIdx = this.allColors.indexOf(card.color)
                // console.log(cardColorIdx);
                card.pos = this.discardPositions[cardColorIdx]
                // console.log(this.discardPositions[cardColorIdx])
                this.playOrDiscard("discard")
                // console.log("card pos: " + card.pos)
            }
        })
        // cards.forEach(card => {
        //     if (card.selected)
        // })

    }

    renderDiscardPiles(gameCtx) {
        const cards = this.currentPlayer.hand
        // console.log(cards)
        // gameCtx.strokeStyle = "black"
        if (cards.some(card => card.selected)) {
            gameCtx.font = "45px Helvetica"
            console.log("card is selected")
            gameCtx.strokeStyle = "red"
            gameCtx.strokeText("Discard", 50, 300)
            // gameCtx.strokeText("Discard", 50, 300)
            // console.log("discard pile selected card?" + card.selected)
        } else {
            gameCtx.font = "35px Helvetica"
            gameCtx.strokeStyle = "black"
            gameCtx.strokeText("Discard", 50, 300) 
        }
        if (this.discardPiles.length === 0) {
            for (let i = 0; i < 5; i ++) {
                let x = this.discardPositions[i][0]
                let y = this.discardPositions[i][1]
                gameCtx.roundRect(x, y, 220, 140, 15);
                gameCtx.lineWidth = 1;
                gameCtx.strokeStyle = "gray"
                gameCtx.stroke();

            }
        }
    }

    renderPlayPiles(gameCtx) {
        const cards = this.currentPlayer.hand
        // console.log(cards)
        // gameCtx.strokeStyle = "black"
        if (cards.some(card => card.selected)) {
            gameCtx.font = "45px Helvetica"
            console.log("card is selected")
            gameCtx.strokeStyle = "red"
            gameCtx.strokeText("Play", 650, 400)
            // gameCtx.strokeText("Discard", 50, 300)
            // console.log("discard pile selected card?" + card.selected)
        } else {
            gameCtx.font = "35px Helvetica"
            gameCtx.strokeStyle = "black"
            gameCtx.strokeText("Play", 650, 400) 
        }

        // gameCtx.font = "35px Helvetica"
        // gameCtx.strokeStyle = "black"
        // gameCtx.strokeText("Play", 650, 400)
        // let totalPiles = 5;
        // let max = totalPiles - this.playPiles.length;
        if (this.playPiles.length === 0) {
            for (let i = 0; i < 5; i ++) {
                let x = this.playPositions[i][0]
                let y = this.playPositions[i][1]
                gameCtx.roundRect(x, y, 140, 200, 15);
                gameCtx.lineWidth = 1;
                gameCtx.strokeStyle = "gray"
                gameCtx.stroke();

            }
        } else {
            this.playPiles.forEach(pile => {
                let x = this.playPositions[i][0]
                let y = this.playPositions[i][1]
                let card = pile[pile.length-1]
                card.draw(gameCtx, card.pos[0], card.pos[y], 140, 220, 15)
            })
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