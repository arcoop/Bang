const Game = require('./game.js')
const Deck = require('./deck.js')
const Card = require('./card.js')
const Player = require('./player.js')
const Fuse = require('./fuse.js')
const Clue = require('./clue.js')

class GameView {
    // constructor(ele, gameCtx, playerCtx){
    constructor(ele, gameCtx, canvas){
        this.canvas = canvas
        this.clues = []
        this.fuses = []
        this.ele = ele
        this.gameCtx = gameCtx
        this.game = new Game("player1", "player2")
        this.playPositions = {
            0: [320, 500],
            1: [480, 500],
            2: [640, 500],
            3: [800, 500],
            4: [960, 500],
        }

        this.discardPositions = {
            0: [320, 800],
            1: [480, 800],
            2: [640, 800],
            3: [800, 800],
            4: [960, 800],
        }
        this.allColors = ["blue", "white", "red", "yellow", "green"]
    }

    start() {
        this.createClues();
        this.createFuses()
        this.game.dealCards();
        this.drawObjects(this.gameCtx, this.canvas);
        // this.play();
    }

    createClues() {
        let x = 640
        let y = 148
        let i = 0;
        while (i < 4) {
            this.clues.push(new Clue(this, "yellow", [x, y]))
            x += 65
            i++
        }
        y += 70
        x = 640
        while (i >= 4 && i < 8) {
            this.clues.push(new Clue(this, "yellow", [x, y]))
            x += 65
            i++
        }
    }

    createFuses() {
        let x = 650
        let y = 70
        let i = 0;
        for(let i = 0; i < 3; i++) {
            this.fuses.push(new Fuse(this, "orange", [x, y]))
            x += 90
        }
    }
    
    handleEvents() {
        window.addEventListener("mousemove", (e) => {
            let clickY = e.clientY - e.target.getBoundingClientRect().top;
            let clickX = e.clientX - e.target.getBoundingClientRect().left;
            console.log([clickX, clickY])
        })
        window.addEventListener("click", (e) => {
            let clickY = e.clientY - e.target.getBoundingClientRect().top;
            let clickX = e.clientX - e.target.getBoundingClientRect().left;
            console.log(clickY)
            console.log(clickX)

            //add any selected logic
                this.currentHands().forEach(card => {
                    let xStart = card.pos[0];
                    let yStart = card.pos[1];
                    let xEnd = xStart + 140;
                    let yEnd = yStart + 220;
                    if ((clickX >= xStart && clickX <= xEnd) && (clickY >= yStart && clickY <= yEnd)) {
                        card.handleCardClick(e)
                        this.drawObjects(this.gameCtx)
                    }
                })
            // }
                let xStart = 300
                let yStart = 750
                let xEnd = 1115;
                let yEnd = 1030;
                if ((clickX >= xStart && clickX <= xEnd) && (clickY >= yStart && clickY <= yEnd)) {
                    this.game.handleDiscardClick(this.discardPositions, this.allColors);
                    this.drawObjects(this.gameCtx)
                }
                xStart = 300
                yStart = 362
                xEnd = 1115;
                yEnd = 730;
                if ((clickX >= xStart && clickX <= xEnd) && (clickY >= yStart && clickY <= yEnd)) {
                    this.game.handlePlayClick(this.playPositions, this.allColors);
                    this.drawObjects(this.gameCtx)
                }

        })
        
        this.drawObjects(this.gameCtx)
        
    }

    drawObjects(gameCtx) {

        gameCtx.clearRect(0,0,1800,1800)

        this.setupBackground(gameCtx);
        this.addScoreBox(gameCtx);
        this.addText(gameCtx);
        this.renderDiscardText(gameCtx);
        this.renderClueText(gameCtx);
        this.renderTurnText(gameCtx);

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

        for (let i = 0; i < this.game.currentPlayer.hand.length; i++){
            let card = this.game.currentPlayer.hand[i]
            card.pos = currentPlayerPositions[i]
            card.draw(gameCtx)
        }

        for (let i = 0; i < this.game.players[1].hand.length; i++) {
            let card = this.game.players[1].hand[i]
            card.pos = otherPlayerPositions[i]
            card.draw(gameCtx, true, true)
        }

        for (const fuse of this.fuses) {
            fuse.draw(gameCtx, fuse.pos[0], fuse.pos[1])
        }

        for (const clue of this.clues) {
            clue.draw(gameCtx, clue.pos[0], clue.pos[1])
        }

        //render x's on used clues
        //render x's on used bombs

        //render discard piles
        for (let i = 0; i < 5; i ++){
            let pile = this.game.discardPiles[i]
            let yDelta = 0;
            if (pile.length > 0) {
                pile.forEach(card => {
                    card.draw(gameCtx, card.pos[0], card.pos[i] + yDelta, card.selected, card.revealedColor, card.revealedNum)
                    yDelta += 220
                })
            } else {
                let x = this.discardPositions[i][0]
                let y = this.discardPositions[i][1]
                gameCtx.roundRect(x, y, 140, 220, 15)
                gameCtx.lineWidth = 1;
                gameCtx.strokeStyle = "gray"
                gameCtx.stroke();
            }
        }
        //render play piles
        for (let i = 0; i < 5; i ++){
            let pile = this.game.playPiles[i]
            if (pile.length > 0) {
                pile.forEach(card => {
                    card.draw(gameCtx, card.pos[0], card.pos[i], card.selected, card.revealedColor, card.revealedNum)
                })
            } else {
                let x = this.playPositions[i][0]
                let y = this.playPositions[i][1]
                gameCtx.roundRect(x, y, 140, 220, 15)
                gameCtx.lineWidth = 1;
                gameCtx.strokeStyle = "gray"
                gameCtx.stroke();
            }
        }

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
        gameCtx.fillText(`${this.game.currentPlayer.name}'s turn`, 1240, 50)
    }

    renderClueText(gameCtx) {
        const cards = this.game.players[1].hand

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

    setupBackground(gameCtx) {
        gameCtx.beginPath();
        gameCtx.roundRect(1200,0,800,1000, 30);
        gameCtx.fillStyle = "#DBDADA";
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
        gameCtx.strokeText(`${this.game.score}`, 105, 145)
    }


    renderDiscardText(gameCtx) {
        const cards = this.game.currentPlayer.hand
 
        if (cards.some(card => card.selected)) {
            gameCtx.font = "45px Helvetica"
            gameCtx.strokeStyle = "red"
            gameCtx.strokeText("Discard", 640, 780)
            gameCtx.strokeText("Play", 650, 400)
          
        } else {
            gameCtx.font = "35px Helvetica"
            gameCtx.strokeStyle = "black"
            gameCtx.strokeText("Discard", 640, 780) 
            gameCtx.strokeText("Play", 650, 400) 
        }
    } 

    currentHands() {
        const hands = this.game.players[0].hand.concat(this.game.players[1].hand)
        return hands;
    }
  

    play() {
        // this.game.drawObjects(this.gameCtx, this.playerCtx)
        // this.game.switchTurns();
    }
    
}

module.exports = GameView;


     // let xStart = 50;
            // let yStart = 300;
            // let xEnd = 200;
            // let yEnd= 340;
            // if ((clickX >= xStart && clickX <= xEnd) && (clickY >= yStart && clickY <= yEnd)) {
            //     console.log("discard selected")
            //     this.game.handleMoveClick(e, this.gameCtx, clickX, clickY)
            //     this.game.drawObjects(this.gameCtx, this.playerCtx)
            // }
            
    

            // window.addEventListener("click", (e) => {
            // let clickX = e.pageX;
            // let clickY = e.pageY;
            // let xStart = 50;
            // let yStart = 300;
            // let xEnd = 150;
            // let yEnd= 340;
            // if ((clickX >= xStart && clickX <= xEnd) && (clickY >= yStart && clickY <= yEnd)) {
            //     this.game.handleMoveClick(e, this.gameCtx)
            //     this.game.drawObjects(this.gameCtx, this.playerCtx)
            // }
            // const piles = this.game.playPositions.concat(this.game.discardPositions)
            // const piles = this.game.playPiles.concat(this.game.discardPiles)
            // const pilePositions = this.game
            // this.game.playPiles.forEach(pile => {
            //     for (let i = 0; i < piles.length; i++) {
            //         let xStart = piles[i][0];
            //         let yStart = piles[i][1];
            //         // console.log("card y start" + yStart)
            //         let xEnd = xStart + 140;
            //         // console.log("card x end" + xEnd)
            //         let yEnd = yStart + 200;
            //         handleCardClick(e);
            //         this.game.drawObjects(this.gameCtx, this.canvas)
            //     }
                
            // })
        
        