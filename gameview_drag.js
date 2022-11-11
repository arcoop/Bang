const Game = require('./game.js')
const Deck = require('./deck.js')
const Card = require('./card.js')
const Player = require('./player.js')
const Fuse = require('./fuse.js')
const Clue = require('./clue.js')

class GameView {
    constructor(ele, gameCtx, canvas, player1name, player2name){
        this.player1name = player1name
        this.player2name - player2name
        this.canvas = canvas
        this.clues = []
        this.fuses = []
        this.ele = ele
        this.gameCtx = gameCtx
        this.game = new Game(player1name, player2name, this.gameCtx)


        //create dynamic positions for all play and discard cards
        const gameBoardPositions = (x, y) => ({
            0: [x, y],
            1: [x + 160, y],
            2: [x + 320, y],
            3: [x + 480, y],
            4: [x + 640, y],
        });
        
        this.width = this.gameCtx['canvas'].width
        this.height = this.gameCtx['canvas'].height
        
        this.playPositions = gameBoardPositions((this.width/2) + 100, (this.height/5) - 75)
        this.discardPositions = gameBoardPositions(this.playPositions[0][0], 520)
        
        this.playColors = ['#F5F5F5', '#BA55D3', '#9ACD32', '#87CEEB', '#FFA500']
        this.discardColors = ['#F5F5F5', '#BA55D3', '#9ACD32', '#87CEEB', '#FFA500']
        
        //create dynamic positions for all dealt hands
        const handPositions = (x, y) => ({
            0: [x, y],
            1: [x + 160, y],
            2: [x + 320, y],
            3: [x + 480, y],
            4: [x + 640, y],
        });
        
        //use handpositions to render the current player hand (top of page) and the second players hand (bottom of page)
        this.currentPlayerPositions = handPositions(95, 118);
        this.otherPlayerPositions = handPositions(this.currentPlayerPositions[0][0], this.currentPlayerPositions[0][1] + 290);
        
        //use handpositions to render clue positions in relation to their card positions
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
        // this.handleDrags();
        // this.handleClicks();
        this.handleEvents();
    }

    //bulk of game logic in event listeners:
    handleClicks() {

    } 
    
    handleEvents() {
        window.addEventListener("mousedown", (e) => {
            let x = e.clientX - e.target.getBoundingClientRect().left
            let y = e.clientY - e.target.getBoundingClientRect().top
            this.game.currentPlayer.hand.forEach(card => {
                // console.log("------")
                // console.log(idx)
                // console.log(card.pos[0])
                // console.log(card.pos[0] + card.width)
                // console.log(card.pos[1])
                // console.log(card.pos[1] + card.height)
                // console.log("------")
                if ((x >= card.pos[0] && x <= card.pos[0]+card.width) && (y >= card.pos[1] && y <= card.pos[1]+card.height)) {
                    if (!card.selected) card.selected = true;
                    const dragCard = (e) => {
                        let currentX = e.clientX - e.target.getBoundingClientRect().left;
                        let currentY = e.clientY - e.target.getBoundingClientRect().top
                    // console.log("y")
                    // console.log(y)
                    // console.log("x")
                    // console.log(x)
                        card.pos[0] = currentX;
                        card.pos[1] = currentY;
                        window.setInterval(this.drawObjects(this.gameCtx), 200)
                        const releaseCard = (e) => {
                            let releasedX = e.clientX - e.target.getBoundingClientRect().left;
                            let releasedY = e.clientY - e.target.getBoundingClientRect().top
                            if ((releasedX >= this.playPositions[0][0] - 100 && releasedX <= this.playPositions[4][0] + 100) && (releasedY >= this.playPositions[0][1] - 100 && releasedY <= this.playPositions[4][1] + 100)) {
                                this.game.handlePlayClick(card, this.discardPositions, this.playPositions, this.playColors, this.discardColors)
                                this.drawObjects(this.gameCtx)
                            } else if ((releasedX >= this.discardPositions[0][0] - 100 && releasedX <= this.discardPositions[4][0] + 100) && (releasedY >= this.discardPositions[0][1] - 100 && releasedY <= this.discardPositions[4][1] + 100)) {
                                this.game.handleDiscardClick(this.discardPositions, allColors)
                                this.drawObjects(this.gameCtx)
                            }
                            window.removeEventListener("mouseup", releaseCard)
                            window.removeEventListener("mousemove", dragCard)
                        }
                        window.addEventListener("mouseup", releaseCard)
                    }

                    window.addEventListener("mousemove", dragCard)
                }
            })
        })

    }                
               

    renderClueNum(gameCtx){
        const cards = this.game.players[1].hand
        let numImage;
        for (let i = 0; i < cards.length; i ++) {
            let card = cards[i]
            if (card.selected) {
                numImage = document.getElementById(`${card.num}`)
                this.gameCtx.drawImage(numImage, card.pos[0] + 90, card.pos[1] + 258, 20, 30)
                // this.gameCtx.beginPath();
                // this.gameCtx.roundRect(this.clueNumberPositions[i][0],this.clueNumberPositions[i][1], 60, 60, 3);
                // this.gameCtx.strokeStyle = "black"
                // this.gameCtx.stroke();
                // this.gameCtx.font = "20px Futura"
                // this.gameCtx.fillStyle = "black"
                // this.gameCtx.fillText(`${card.num}`, card.pos[0] + 102, card.pos[1] + 274)
                
            }
        }
    }
    
    drawObjects(gameCtx, won=false, over=false) {
        //render errors
        gameCtx.clearRect(0,0, this.width, this.height)
        
        this.setupBackground(gameCtx);
        this.addText(gameCtx);
        this.renderDiscardText(gameCtx);
        this.renderClueColor(gameCtx);
        this.renderClueNum(gameCtx)
        this.renderTurnText(gameCtx);
        this.renderViewTeammatesHandText();
        this.addScore(gameCtx);
        
        gameCtx.font = "20px Albert Sans"
        if (this.game.deck.deckArray.length > 5) {
            gameCtx.fillStyle = "black"
            gameCtx.fillText(`Cards left: ${this.game.deck.deckArray.length}`, 830, this.height - 20)
        } else {
            gameCtx.fillStyle = "red"
            gameCtx.fillText(`Cards left: ${this.game.deck.deckArray.length}`, 830, this.height - 20)
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
        
        for (let i = 0; i < this.game.currentPlayer.hand.length; i++){
            let card = this.game.currentPlayer.hand[i]
            card.pos = this.currentPlayerPositions[i]
            card.secondarySelected = false;
            card.draw(gameCtx, card.revealedColor, card.revealedNum)
        }
        
        for (let i = 0; i < this.game.players[1].hand.length; i++) {
            let card = this.game.players[1].hand[i]
            card.pos = this.otherPlayerPositions[i]
            card.draw(gameCtx, true, true)
        }
        
        //render fuses
        let fuseImg = document.getElementById('fuse')
        for (let i = 0; i < this.game.numFuses; i++) {
            let fuse = this.fuses[i]
            gameCtx.drawImage(fuseImg, fuse.pos[0], fuse.pos[1], 75, 70)
        }

        if (this.game.score === 25) {
            this.gameCtx.clearRect(0,0, this.width, this.height)
            this.gameCtx.font = "100px Cursive"
            this.gameCtx.fillStyle = "black"
            this.gameCtx.fillText("You won!", this.width/3 + 70, 180)
            let image = document.getElementById("firework")
            this.gameCtx.drawImage(image, this.width/3 + 60, 350, 500, 700)
        }

        if (this.game.numFuses === 0) {
            this.gameCtx.clearRect(0,0, this.width, this.height)
            this.gameCtx.font = "100px Albert Sans"
            this.gameCtx.fillStyle = "black"
            this.gameCtx.fillText(`Game Over! Your score was ${this.game.score}!`, 280, 350)

        }
        

        let clueImg = document.getElementById('clue')
        for (let i = 0; i < this.game.numClues; i++) {
            let clue = this.clues[i]
            if (this.game.score !== 25 && this.game.numFuses > 0) {
                gameCtx.drawImage(clueImg, clue.pos[0], clue.pos[1], 55, 60)
            }
        }

    }
    
    
    addText(gameCtx) {
        gameCtx.font = "40px Albert Sans"
        gameCtx.fillStyle = "green"
        gameCtx.fillText(`${this.game.currentPlayer.name}'s hand`, (this.width/4) - 85, this.height/7 - 22);
        
        gameCtx.font = "40px Albert Sans"
        gameCtx.fillStyle = "green"
        gameCtx.fillText(`${this.game.players[1].name}'s hand`, (this.width/4) - 120, (this.height/2) + 14 );
        
    }
    
    renderClueColor(gameCtx) {
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
    
    addScore(gameCtx,) {
        gameCtx.font = "20px Albert Sans"
        gameCtx.fillStyle = "black"
        gameCtx.fillText("Score:", 50, 40)
        gameCtx.font = "40px Helvetica"
        gameCtx.fillStyle = "green"
        gameCtx.fillText(`${this.game.score}`, 70, 80)
    }
    
    renderViewTeammatesHandText() {
        this.gameCtx.font = "20px Albert Sans"
        this.gameCtx.fillStyle = "black"
        this.gameCtx.fillText(`What does ${this.game.players[1].name} know?`, 20 , this.height - 20,)
    }
    
    //This method redraws cards in the other player's hands based on what they know.
    //Uses a delay and then returns the hand back to the normal rendering.
    viewTeammatesPerspective() {
        this.game.players[1].hand.forEach(card => {
            this.gameCtx.clearRect(card.pos[0], card.pos[1], 140, 220)
            card.draw(this.gameCtx, card.revealedColor, card.revealedNum, false)
            this.game.delay(2000).then(() => {
                this.drawObjects(this.gameCtx)
            })
        })
    }
    
    setupBackground(gameCtx) {
        gameCtx.beginPath();
        gameCtx.rect(0,0,this.width, this.height)
        gameCtx.fillStyle = "#4B0082" //indigo
        gameCtx.fill();
        gameCtx.beginPath();
        let shadowWidth = (this.width/2 + 50) + 6
        gameCtx.roundRect(0, 2, shadowWidth, this.height, 30)
        gameCtx.fillStyle = "#606060" //shadow gray
        gameCtx.fill();
        gameCtx.beginPath();
        let width = (this.width / 2) + 47
        gameCtx.roundRect(0,6, width, this.height, 30)
        gameCtx.fillStyle = "#E0F8F7";
        gameCtx.fill();
    }
    
    renderTurnText(gameCtx) {
        gameCtx.font = "30px Albert Sans"
        gameCtx.fillStyle = "black"
        gameCtx.fillText(`${this.game.currentPlayer.name}'s turn`, 15, 110)
    }
    
    renderDiscardText(gameCtx) {
        const cards = this.game.currentPlayer.hand
        
        if (cards.some(card => card.selected)) {
            gameCtx.font = "45px Albert Sans,"
            gameCtx.fillStyle = "yellow"
            gameCtx.fillText("Discard", this.discardPositions[0][0] + 325, this.discardPositions[0][1] - 40)
            gameCtx.fillText("Play", this.playPositions[2][0] + 32, this.playPositions[0][1] - 40)
            
        } else {
            gameCtx.font = "35px Albert Sans"
            gameCtx.fillStyle = "white"
            gameCtx.fillText("Discard", this.discardPositions[2][0] + 7, this.discardPositions[0][1] - 40) 
            gameCtx.fillText("Play", this.playPositions[2][0] + 32, this.playPositions[0][1] - 40) 
        }
    } 
    
    currentHands() {
        const hands = this.game.players[0].hand.concat(this.game.players[1].hand)
        return hands;
    }
    
    
    createClues() {
        let x = 30
        let y = 345
        let i = 0;
        while (i < 4) {
            this.clues.push(new Clue(this, "yellow", [x, y]))
            x += 65
            i++
        }
        y = 345
        x = 700
        while (i >= 4 && i < 8) {
            this.clues.push(new Clue(this, "yellow", [x, y]))
            x += 65
            i++
        }
    }
    
    createFuses() {
        let x = (this.width/3 + 85)
        let y = 35
        for(let i = 0; i < 3; i++) {
            this.fuses.push(new Fuse(this, "orange", [x, y]))
            x += 90
        }
    }
    
}

module.exports = GameView;