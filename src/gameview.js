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
        this.game = new Game("player1", "player2", this.gameCtx)

        const gameBoardPositions = (x, y) => ({
            0: [x, y],
            1: [x + 160, y],
            2: [x + 320, y],
            3: [x + 480, y],
            4: [x + 640, y],
        });

        this.width = this.gameCtx['canvas'].width
        this.height = this.gameCtx['canvas'].height

        this.playPositions = gameBoardPositions((this.width/2) + 100, 200)
        this.discardPositions = gameBoardPositions(this.playPositions[0][0], 700)

        this.playColors = ['#F5F5F5', '#BA55D3', '#9ACD32', '#87CEEB', '#FFA500']
        this.discardColors = ['#F5F5F5', '#BA55D3', '#9ACD32', '#87CEEB', '#FFA500']

        const handPositions = (x, y) => ({
            0: [x, y],
            1: [x + 160, y],
            2: [x + 320, y],
            3: [x + 480, y],
            4: [x + 640, y],
        });

        this.currentPlayerPositions = handPositions(this.width/11, 320);
        this.otherPlayerPositions = handPositions(this.currentPlayerPositions[0][0], this.currentPlayerPositions[0][1] + 320);

        this.clueColorPositions = handPositions(this.otherPlayerPositions[0][0], this.otherPlayerPositions[0][1] + 240)
        this.clueNumberPositions = handPositions(this.otherPlayerPositions[0][0] + 80, this.otherPlayerPositions[0][1] + 240)
    }

    start() {
        this.playColors.sort((a, b) => 0.5 - Math.random());
        this.discardColors.sort((a, b) => 0.5 - Math.random());
        this.createClues();
        this.createFuses()
        this.game.dealCards();
        this.drawObjects(this.gameCtx, this.canvas);
        this.handleEvents();
        
    }

    drawWon() {
        this.gameCtx.clearRect(0,0, this.width, this.height)
        this.gameCtx.font = "100px Cursive"
        this.gameCtx.fillStyle = "black"
        this.gameCtx.fillText("You won!", this.width/3 + 70, 180)
        let image = document.getElementById("firework")
        gameCtx.drawImage(image, this.width/3 + 60, 350, 500, 700)
    }

    drawGameOver() {
        this.gameCtx.clearRect(0,0, this.width, this.height)
        this.gameCtx.font = "100px Cursive"
        this.gameCtx.fillStyle = "black"
        this.gameCtx.fillText(`Game Over! Your score was ${this.game.score}!`, this.width/4, 250)
    }

    handleEvents() {
        if (this.game.won()) {
            this.drawWon()
        } else if (this.game.over()) {
            this.drawGameOver()
        }
        else {
        window.addEventListener("mousemove", (e) => {
            let clickX = e.clientX - e.target.getBoundingClientRect().left;
            let clickY = e.clientY - e.target.getBoundingClientRect().top;
            this.game.players[1].hand.forEach(card => {
                if (card.selected) {
                    let innerXStart = card.pos[0]
                    let innerYStart = card.pos[1] + 240
                    let innerXEnd = innerXStart + 60
                    let innerYEnd = innerYStart + 60
                    if ((clickX >= innerXStart && clickX <= innerXEnd) && (clickY >= innerYStart && clickY <= innerYEnd)) {
                        this.game.handleClueHover(e, "color", card.color)
                        this.drawObjects(this.gameCtx, "color", )
                    } else {
                        innerXStart = card.pos[0] + 97
                        innerYStart = card.pos[1] + 240
                        innerXEnd = innerXStart + 60
                        innerYEnd = innerYStart + 60
                        if ((clickX >= innerXStart && clickX <= innerXEnd) && (clickY >= innerYStart && clickY <= innerYEnd)) {
                            this.game.handleClueHover(e, "number", card.num)
                            this.drawObjects(this.gameCtx, "number", true)
                            
                        } else {
                            this.drawObjects(this.gameCtx, "", false)
                        }
                    }
                }
            })
        })
        window.addEventListener("click", (e) => {
            let clickX = e.clientX - e.target.getBoundingClientRect().left;
            let clickY = e.clientY - e.target.getBoundingClientRect().top;

            //selecting a card
            this.currentHands().forEach(card => {
                // if (card.selected) {
                //     card.handleCardClick(e)
                //     this.drawObjects(this.gameCtx)
                // } else {
                    let xStart = card.pos[0];
                    let yStart = card.pos[1];
                    let xEnd = xStart + 140;
                    let yEnd = yStart + 220;
                    if ((clickX >= xStart && clickX <= xEnd) && (clickY >= yStart && clickY <= yEnd)) {
                        card.handleCardClick(e)
                        this.drawObjects(this.gameCtx)
                    }
                // }
            })

    
            let xStart = this.discardPositions[0][0] - 2
            let yStart = this.discardPositions[0][1]- 2
            let xEnd = this.discardPositions[4][0] + 150
            let yEnd = yStart + 230;
            if ((clickX >= xStart && clickX <= xEnd) && (clickY >= yStart && clickY <= yEnd)) {
                this.game.handleDiscardClick(e, this.discardPositions, this.discardColors);
                this.drawObjects(this.gameCtx)

            }
            xStart = this.playPositions[0][0] - 2
            yStart = this.playPositions[0][1] -2
            xEnd = this.playPositions[4][0] + 150;
            yEnd = yStart + 230;
            if ((clickX >= xStart && clickX <= xEnd) && (clickY >= yStart && clickY <= yEnd)) {
                this.game.handlePlayClick(e, this.discardPositions, this.playPositions, this.playColors, this.discardColors);
                this.drawObjects(this.gameCtx)
            }

            for (let i = 0; i < this.game.players[1].hand.length; i ++) {
                let card = this.game.players[1].hand[i]
                if (card.selected) {
                    xStart = this.clueColorPositions[i][0]
                    yStart = this.clueColorPositions[i][1]
                    xEnd = xStart + 60
                    yEnd = yStart + 60
                    if ((clickX >= xStart && clickX <= xEnd) && (clickY >= yStart && clickY <= yEnd)) {

                        const cluedCards = []
                        this.game.players[1].hand.forEach(card => {
                            if (card.selected || card.secondarySelected) {
                                cluedCards.push(card)
                            }
                        })

                        this.game.giveClue(cluedCards, "color", this.gameCtx)
                        this.currentHands().forEach(card => {
                            card.selected = false;
                            card.secondarySelected = false;
                        })
                        this.game.switchTurns();
                        this.drawObjects(this.gameCtx)

                    } else {
                        xStart = this.clueNumberPositions[i][0]
                        yStart = this.clueNumberPositions[i][1]
                        xEnd = xStart + 60
                        yEnd = yStart + 60
                        if ((clickX >= xStart && clickX <= xEnd) && (clickY >= yStart && clickY <= yEnd)) {
                            const cluedCards = []
                            this.game.players[1].hand.forEach(card => {
                                if (card.selected || card.secondarySelected) {
                                    cluedCards.push(card)
                                }
                            })
                            this.game.giveClue(cluedCards, "number")
                            this.currentHands().forEach(card => {
                                card.selected = false;
                                card.secondarySelected = false;
                            })
                            this.game.switchTurns();
                            this.drawObjects(this.gameCtx)
                        }

                        this.drawObjects(this.gameCtx)
                    }
                }
            }

            
        })
        this.drawObjects(this.gameCtx)
        // }
        
        //add functionality for things to render bigger on mouseover
        
    } 
}

    drawObjects(gameCtx, hoveredStatus, cardHover = false) {
        //render errors
        gameCtx.clearRect(0,0, this.width, this.height)

        this.setupBackground(gameCtx);
        this.addScoreBox(gameCtx);
        this.addText(gameCtx);
        this.renderDiscardText(gameCtx);
        this.renderClueColor(gameCtx, hoveredStatus, this.clueColorPositions);
        this.renderClueNum(gameCtx, hoveredStatus, this.clueNumberPositions)
        this.renderTurnText(gameCtx);

        
        
        //render hands
        for (let i = 0; i < this.game.currentPlayer.hand.length; i++){
            let card = this.game.currentPlayer.hand[i]
            card.pos = this.currentPlayerPositions[i]
            // card.selected = false;
            card.secondarySelected = false;
            card.draw(gameCtx, card.revealedColor, card.revealedNum, hoveredStatus)
        }

        for (let i = 0; i < this.game.players[1].hand.length; i++) {
            let card = this.game.players[1].hand[i]
            card.pos = this.otherPlayerPositions[i]
            card.draw(gameCtx, true, true, hoveredStatus)
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
                    card.selected = false;
                    card.touched = false;
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
                    card.selected = false;
                    card.touched = false;
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
        let fuseImg = document.getElementById('fuse')
        for (let i = 0; i < this.game.numFuses; i++) {
            let fuse = this.fuses[i]
            gameCtx.drawImage(fuseImg, fuse.pos[0], fuse.pos[1], 75, 75)
        }

        let clueImg = document.getElementById('clue')
        for (let i = 0; i < this.game.numClues; i++) {
            let clue = this.clues[i]
            gameCtx.drawImage(clueImg, clue.pos[0], clue.pos[1], 75, 75)
        }
        
    }
   

    addText(gameCtx) {
        gameCtx.font = "50px Futura"
        gameCtx.fillStyle = "green"
        gameCtx.fillText("My Hand", (this.width/4) - 125, this.height/7);

        gameCtx.font = "50px Futura"
        gameCtx.fillStyle = "green"
        gameCtx.fillText(`${this.game.players[1].name}'s hand`, (this.width/4) - 180, ((this.height/7)*2) + 30 );

    }

    renderClueColor(gameCtx, hoveredStatus, clueColorPositions) {
        const cards = this.game.players[1].hand
        for (let i = 0; i < cards.length; i ++) {
            let card = cards[i]
            if (card.selected) {
                gameCtx.beginPath();
                gameCtx.roundRect(this.clueColorPositions[i][0], this.clueColorPositions[i][1], 60, 60, 3);
                gameCtx.fillStyle = card.color;
                gameCtx.fill();
            }
        }
    }

    renderClueNum(gameCtx, hoveredStatus, clueNumberPositions) {
        const cards = this.game.players[1].hand
        for (let i = 0; i < cards.length; i ++) {
            let card = cards[i]
            if (card.selected) {
                gameCtx.beginPath();
                // gameCtx.roundRect(card.pos[0] + 80, card.pos[1] + 240, 60, 60, 3);
                gameCtx.roundRect(clueNumberPositions[i][0],clueNumberPositions[i][1], 60, 60, 3);
                gameCtx.strokeStyle = "black"
                gameCtx.stroke();
                gameCtx.font = "20px Futura"
                gameCtx.fillStyle = "black"
                gameCtx.fillText(`${card.num}`, card.pos[0] + 102, card.pos[1] + 274)

            }
        }
    }

    anyCardsSelected() {
        this.currentHands().forEach(card => {
            if (card.selected) return true;
        })
        return false;
    }

    setupBackground(gameCtx) {
        gameCtx.beginPath();
        let width = (this.width / 2)
        gameCtx.roundRect(0,4, width, 1000, 30)
        gameCtx.fillStyle = "#DBDADA";
        gameCtx.fill();
    }

    addScoreBox(gameCtx,) {
        gameCtx.beginPath();
        gameCtx.roundRect(10, 18, this.width/11, 90, 35);
        gameCtx.strokeStyle = "black"
        gameCtx.stroke();
        gameCtx.font = "20px Futura"
        gameCtx.fillStyle = "black"
        gameCtx.fillText("Score:", 85, 50)
        gameCtx.font = "40px Helvetica"
        gameCtx.fillStyle = "green"
        gameCtx.fillText(`${this.game.score}`, 105, 93)
        // gameCtx.strokeStyle = "green"
        // gameCtx.strokeText(`${this.game.score}`, 105, 93)
    }

    renderTurnText(gameCtx) {
        gameCtx.font = "40px Futura"
        gameCtx.fillStyle = "black"
        gameCtx.fillText(`${this.game.currentPlayer.name}'s turn`, 15, 200)
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
 
    
    createClues() {
        let x = (this.width/5) - 20
        let y = 40
        let i = 0;
        while (i < 4) {
            this.clues.push(new Clue(this, "yellow", [x, y]))
            x += 65
            i++
        }
        y += 100
        x = (this.width/5) - 20
        while (i >= 4 && i < 8) {
            this.clues.push(new Clue(this, "yellow", [x, y]))
            x += 65
            i++
        }
    }

    createFuses() {
        let x = (this.width/2) - 300
        let y = 40
        for(let i = 0; i < 3; i++) {
            this.fuses.push(new Fuse(this, "orange", [x, y]))
            x += 90
        }
    }
    
}

module.exports = GameView;

