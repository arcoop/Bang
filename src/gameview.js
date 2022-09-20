const Game = require('./game.js')
const Deck = require('./deck.js')
const Card = require('./card.js')
const Player = require('./player.js')
const Fuse = require('./fuse.js')
const Clue = require('./clue.js')

class GameView {
    constructor(ele, gameCtx, canvas){
        this.canvas = canvas
        this.clues = []
        this.fuses = []
        this.ele = ele
        this.gameCtx = gameCtx
        this.game = new Game("player1", "player2")

    
        const gameBoardPositions = (x, y) => ({
            0: [x, y],
            1: [x + 160, y],
            2: [x + 320, y],
            3: [x + 480, y],
            4: [x + 640, y],
        });

        this.playPositions = gameBoardPositions(320, 390)
        this.discardPositions = gameBoardPositions(320, 900)

        this.playColors = ["blue", "white", "red", "yellow", "green"]
        this.discardColors = ["blue", "white", "red", "yellow", "green"]
    }

    start() {
        this.playColors.sort((a, b) => 0.5 - Math.random());
        this.discardColors.sort((a, b) => 0.5 - Math.random());
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
        for(let i = 0; i < 3; i++) {
            this.fuses.push(new Fuse(this, "orange", [x, y]))
            x += 90
        }
    }
    
    handleEvents() {
        window.addEventListener("error", (e) => {
            this.drawObjects(this.gameCtx)
        })
        
        // window.addEventListener("mousemove", (e) => {
        //     let clickY = e.clientY - e.target.getBoundingClientRect().top;
        //     let clickX = e.clientX - e.target.getBoundingClientRect().left;
        //     console.log([clickX, clickY])
        // })
        //add functionality for things to render bigger on mouseover
        window.addEventListener("mousemove", (e) => {
            this.currentHands().forEach(card => {
                let clickX = e.clientX - e.target.getBoundingClientRect().left;
                let clickY = e.clientY - e.target.getBoundingClientRect().top;
                if (card.selected) {
                    let innerXStart = card.pos[0]
                    let innerYStart = card.pos[1] + 240
                    let innerXEnd = innerXStart + 60
                    let innerYEnd = innerXStart + 60
                    if ((clickX >= innerXStart && clickX <= innerXEnd) && (clickY >= innerYStart && clickY <= innerYEnd)) {
                        this.game.handleClueHover("color", card.color)
                        this.drawObjects(this.gameCtx, "color")
                    } else {
                        innerXStart = card.pos[0] + 80
                        console.log(innerXStart)
                        innerYStart = card.pos[1] + 240
                        innerXEnd = innerXStart + 60
                        innerYEnd = innerXStart + 60
                        if ((clickX >= innerXStart && clickX <= innerXEnd) && (clickY >= innerYStart && clickY <= innerYEnd)) {
                            this.game.handleClueHover("number", card.num)
                            this.drawObjects(this.gameCtx, "number")
                        } else {
                            this.drawObjects(this.gameCtx)
                        }
                    }
                    
                }
            })
        })
        
        window.addEventListener("click", (e) => {
            let clickY = e.clientY - e.target.getBoundingClientRect().top;
            let clickX = e.clientX - e.target.getBoundingClientRect().left;
            console.log(clickX)
            console.log(clickY)

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

                // this.currentHands().forEach(card => {
                //     let xStart = card.pos[0];
                //     let yStart = card.pos[1] + 240;
                //     let xEnd = xStart + 60;
                //     let yEnd = yStart + 60;
                //     if ((clickX >= xStart && clickX <= xEnd) && (clickY >= yStart && clickY <= yEnd)) {
                //         console.log("clue clicked")
                //         this.game.handleClueClick(e)
                //         this.drawObjects(this.gameCtx)
                //     }
                // })



            // }
                let xStart = this.discardPositions[0][0] - 2//300
                let yStart = this.discardPositions[0][1]- 2
                let xEnd = this.discardPositions[4][0] + 150//1115;
                let yEnd = yStart + 225;
                if ((clickX >= xStart && clickX <= xEnd) && (clickY >= yStart && clickY <= yEnd)) {
                    this.game.handleDiscardClick(this.discardPositions, this.discardColors);
                    this.drawObjects(this.gameCtx)
                }
                xStart = this.playPositions[0][0] - 2
                yStart = this.playPositions[0][1] -2
                xEnd = this.playPositions[4][0] + 150;
                yEnd = yStart + 225;
                if ((clickX >= xStart && clickX <= xEnd) && (clickY >= yStart && clickY <= yEnd)) {
                    this.game.handlePlayClick(this.playPositions, this.playColors);
                    this.drawObjects(this.gameCtx)
                }


                
        })
        this.drawObjects(this.gameCtx)
    }

    drawObjects(gameCtx, hoveredStatus) {

        gameCtx.clearRect(0,0,1800,1800)
        gameCtx.strokeStyle = "black"

        this.setupBackground(gameCtx);
        this.addScoreBox(gameCtx);
        this.addText(gameCtx);
        this.renderDiscardText(gameCtx);
        this.renderClueText(gameCtx, hoveredStatus);
        this.renderTurnText(gameCtx);

        const handPositions = (x, y) => ({
            0: [x, y],
            1: [x + 160, y],
            2: [x + 320, y],
            3: [x + 480, y],
            4: [x + 640, y],
        });

        const currentPlayerPositions = handPositions(1210, 170);
        const otherPlayerPositions = handPositions(1210, 500);
        
        //render hands
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

        //render discard piles
        for (let i = 0; i < 5; i ++){
            // debugger
            let pile = this.game.discardPiles[i]
            let yDelta = 0;
            let xDelta = 0;
            if (pile.length > 0) {
                pile = pile.sort(function(card1, card2) {
                    if (card1.num > card2.num) {
                        return 1
                    } else return -1
                })
                // console.log(pile)
                pile.forEach(card => {
                    let orig_pos = card.pos
                    card.pos = [card.pos[0] + xDelta, card.pos[1] +yDelta]
                    card.revealedColor = true;
                    card.revealedNum = true;
                    card.draw(gameCtx, card.revealedColor, card.revealedNum)
                    card.pos = orig_pos
                    yDelta += 40
                    xDelta += 2
                })
            } else {
                let x = this.discardPositions[i][0]
                let y = this.discardPositions[i][1]
                this.game.draw(gameCtx, x, y);
                // gameCtx.roundRect(x, y, 140, 220, 15)
                // gameCtx.lineWidth = 1;
                // gameCtx.strokeStyle = "gray"
                // gameCtx.stroke();
            }
        }
        //render play piles
        for (let i = 0; i < 5; i ++){
            let pile = this.game.playPiles[i]
            let yDelta = 0;
            let xDelta = 0;
            if (pile.length > 0) {
                pile = pile.sort(function(card1, card2) {
                    if (card1.num > card2.num) {
                        return 1
                    } else return -1
                })
                pile.forEach(card => {
                    let orig_pos = card.pos
                    card.pos = [card.pos[0] + xDelta, card.pos[1] +yDelta]
                    card.revealedColor = true;
                    card.revealedNum = true;
                    card.draw(gameCtx, card.revealedColor, card.revealedNum)
                    card.pos = orig_pos
                    xDelta += 2
                    yDelta += 40
                })
            
            } else {
                let x = this.playPositions[i][0]
                let y = this.playPositions[i][1]
                this.game.draw(gameCtx, x, y);
                // gameCtx.roundRect(x, y, 140, 220, 15)
                // gameCtx.lineWidth = 1;
                // gameCtx.strokeStyle = "gray"
                // gameCtx.stroke();
            }
        }

        //render fuses
        if (this.game.numFuses < 3) {
            let length = 3 
            for (let i = 0; i < length; i++) {
                let fuse = this.fuses[i]
                fuse.draw(gameCtx, fuse.pos[0], fuse.pos[1])
            }
            for (let i = length; i < 3; i ++) {
                fuse.draw(gameCtx, fuse.pos[0], fuse.pos[1])
                //draw Xs
            }
        } else {
            for (const fuse of this.fuses) {
                fuse.draw(gameCtx, fuse.pos[0], fuse.pos[1])
            }
        }

        //render clues
        if (this.game.numClues < 8) {
            let length = 8
            for (let i = 0; i < length; i++) {
                let clue = this.clues[i]
                clue.draw(gameCtx, clue.pos[0], clue.pos[1])
            }
            for (let i = length; i < 8; i ++) {
                clue.draw(gameCtx, clue.pos[0], clue.pos[1])
                //draw Xs
            }
        } else {
            for (const clue of this.clues) {
                clue.draw(gameCtx, clue.pos[0], clue.pos[1])
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

    renderClueText(gameCtx, hoveredStatus) {
     
        const cards = this.game.players[1].hand

        cards.forEach(card => {
            if (card.selected) {
                gameCtx.beginPath();
                gameCtx.roundRect(card.pos[0], card.pos[1] + 240, 60, 60, 3);
                gameCtx.fillStyle = card.color;
                gameCtx.fill();
                if (hoveredStatus === "color") {
                    gameCtx.lineWidth = "40px"
                    gameCtx.strokeStyle = "pink"
                    gameCtx.stroke();
                }

                gameCtx.beginPath();
                gameCtx.roundRect(card.pos[0] + 80, card.pos[1] + 240, 60, 60, 3);
                gameCtx.strokeStyle = "black"
                gameCtx.stroke();
                if (hoveredStatus === "number") {
                    gameCtx.lineWidth = "40px"
                    gameCtx.strokeStyle = "pink"
                    gameCtx.stroke();
                }

                gameCtx.font = "30px Helvetica"
                gameCtx.fillStyle = "black"
                gameCtx.fillText(card.num, card.pos[0] + 97, card.pos[1] + 280)

            }
        })
    }

    anyCardsSelected() {
        this.currentHands().forEach(card => {
            if (card.selected) return true;
        })
        return false;
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
            gameCtx.strokeText("Discard", this.discardPositions[0][0] + 325, this.discardPositions[0][1] - 40)
            gameCtx.strokeText("Play", this.playPositions[2][0] + 32, this.playPositions[0][1] - 40)
          
        } else {
            gameCtx.font = "35px Helvetica"
            gameCtx.strokeStyle = "black"
            gameCtx.strokeText("Discard", this.discardPositions[2][0] + 7, this.discardPositions[0][1] - 40) 
            gameCtx.strokeText("Play", this.playPositions[2][0] + 32, this.playPositions[0][1] - 40) 
        }
    } 

    currentHands() {
        const hands = this.game.players[0].hand.concat(this.game.players[1].hand)
        return hands;
    }
  
    
}

module.exports = GameView;

