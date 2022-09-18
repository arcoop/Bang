const Game = require('./game.js')
const Card = require('./card.js')
const Player = require('./player.js')

class GameView {
    constructor(ele, gameCtx, playerCtx){
        this.ele = ele
        this.gameCtx = gameCtx
        // this.playerCtx = playerCtx
        this.game = new Game("player1", "player2")
    }

    start() {
        // this.setupBackground(this.playerCtx)
        this.setupBackground(this.gameCtx)
        // this.addText(this.playerCtx)
        this.addText(this.gameCtx)
        this.addScoreBox(this.gameCtx);
        // this.renderTurnText(this.playerCtx);
        this.renderTurnText(this.gameCtx);
        // this.game.drawObjects(this.gameCtx, this.playerCtx)
        this.game.drawObjects(this.gameCtx)
        this.play();
        
        // console.log(`${this.game.currentPlayer.name}'s turn`)
        // setInterval(this.game.drawObjects.bind(this), 10)
    }

    
    // setupBackground(playerCtx) {
    //     playerCtx.beginPath();
    //     playerCtx.roundRect(0,0,800,1000, 30);
    //     playerCtx.fillStyle = "#8CF1DB";
    //     playerCtx.fill();
    // }
    setupBackground(gameCtx) {
        gameCtx.beginPath();
        gameCtx.roundRect(900,0,800,1000, 30);
        gameCtx.fillStyle = "#8CF1DB";
        gameCtx.fill();
    }

    renderDiscardPiles(gameCtx) {
        


    }

    renderPlayPiles(gameCtx) {

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

    // addText(playerCtx) {
    //     playerCtx.font = "50px Helvetica"
    //     playerCtx.fillStyle = "black"
    //     playerCtx.strokeText("My Hand", 280, 120);
    //     // playerCtx.textAlign = "center";

    //     playerCtx.font = "50px Helvetica"
    //     playerCtx.fillStyle = "black"
    //     playerCtx.strokeText("Player 2's Hand", 220, 480);

    // }
    addText(gameCtx) {
        gameCtx.font = "50px Helvetica"
        gameCtx.fillStyle = "black"
        gameCtx.strokeText("My Hand", 1200, 120);
        // gameCtx.textAlign = "center";

        gameCtx.font = "50px Helvetica"
        gameCtx.fillStyle = "black"
        gameCtx.strokeText("Player 2's Hand", 1100, 480);

    }

    // renderTurnText(playerCtx) {
    //     // gameCtx.font = "20px Helvetica"
    //     // gameCtx.fillStyle = "black"
    //     // gameCtx.fillText("Score:", 85, 100)
    //     playerCtx.font = "20px Helvetica"
    //     playerCtx.fillStyle = "black"
    //     console.log(`${this.game.currentPlayer.name}'s turn`)
    //     playerCtx.fillText(`${this.game.currentPlayer.name}'s turn`, 40, 50)
    //     // gameCtx.fill();
    // }
    renderTurnText(gameCtx) {
        // gameCtx.font = "20px Helvetica"
        // gameCtx.fillStyle = "black"
        // gameCtx.fillText("Score:", 85, 100)
        gameCtx.font = "20px Helvetica"
        gameCtx.fillStyle = "black"
        console.log(`${this.game.currentPlayer.name}'s turn`)
        gameCtx.fillText(`${this.game.currentPlayer.name}'s turn`, 920, 50)
        // gameCtx.fill();
    }

    handleEvents() {
        window.addEventListener("click", (e) => {
            // console.log("handle click")
            let clickX = e.clientX;
            let clickY = e.clientY;
            console.log("click x: " + clickX);
            console.log("click y: " + clickY) 
            this.currentHands().forEach(hand => {
                console.log("hand:" + hand)
                hand.forEach(card => {
                    let xStart = card.pos[0];
                    let yStart = card.pos[1];
                    // console.log("card y start" + yStart)
                    let xEnd = xStart + 140;
                    // console.log("card x end" + xEnd)
                    let yEnd = yStart + 220;
                    // console.log("card y end" + yEnd)
                    console.log("card?: " + ((clickX >= xStart && clickX <= xEnd) && (clickY >= yStart && clickY <= yEnd)))
                    console.log("clickX: " + clickX)
                    console.log("clickY: " + clickY)
                    console.log("xStart: " + xStart)
                    console.log("yStart: " + yStart)
                    if ((clickX >= xStart && clickX <= xEnd) && (clickY >= yStart && clickY <= yEnd)) {
                        console.log("card position" + card.pos)
                        // card.handleCardClick(e, this.playerCtx)
                        card.handleCardClick(e, this.gameCtx)
                        console.log("calling game.draw objects:")
                        // this.game.drawObjects(this.gameCtx, this.playerCtx)
                        this.game.drawObjects(this.gameCtx, this.playerCtx)
                        
                    }
                })
            })
            
        })
        
    }

    currentHands() {
        const hands = [];
        this.game.players.forEach(player => {
            hands.push(player.hand)
        })
        return hands;
    }

    play() {
        this.game.drawObjects(this.gameCtx, this.playerCtx)
        this.game.switchTurns();
    }
    

        // renderCurrentPlayerHand() {
        //    // iterate through players hand
        //    // if the card is revealed, set that li ele to revealed
        //    // else, set it to not revealed
        // }

        // renderOtherPlayerHand() {
        //     //iterate through hand, show full hand 
        // }


        // let currentPlayerHand = document.createElement("ul")
        // let heading1 = document.createElement("h2")
        // let heading1Text = document.createTextNode("My Hand")
        // heading1.append(heading1Text)
        // this.ele.append(heading1)
        // currentPlayerHand.setAttribute("class", "current-player-hand")
        // for (let i = 0; i < 5; i++) {
        //     let cardLocation = document.createElement("li")
        //     cardLocation.id = `current-player-${i}`
        //     currentPlayerHand.append(cardLocation)
        // }

        // this.ele.append(currentPlayerHand)

        // let otherPlayerHand = document.createElement("ul")
        // let heading2 = document.createElement('h2')
        // let heading2Text = document.createTextNode(`Player 2's Hand`)
        // heading2.append(heading2Text)
        // this.ele.append(heading2)
        // otherPlayerHand.setAttribute("class", "other-player-hand")
        // for (let i = 0; i < 5; i ++) {
        //     let cardLocation = document.createElement("li")
        //     cardLocation.id = `other-player-${i}`

        //     otherPlayerHand.append(cardLocation)
        // }
        // this.ele.append(otherPlayerHand)
}

module.exports = GameView;