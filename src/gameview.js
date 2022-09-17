const Game = require('./game.js')
const Card = require('./card.js')

class GameView {
    constructor(ele, gameCtx, playerCtx){
        this.ele = ele
        this.gameCtx = gameCtx
        this.playerCtx = playerCtx
        this.game = new Game(["player1", "player2"])
    }

    start() {
        this.setupBackground(this.playerCtx)
        this.addText(this.playerCtx)
        this.game.drawObjects(this.gameCtx, this.playerCtx)
    }
    
    setupBackground(playerCtx) {
        playerCtx.beginPath();
        playerCtx.roundRect(0,0,800,1000, 30);
        playerCtx.fillStyle = "#8CF1DB";
        playerCtx.fill();

    }

    addText(playerCtx) {
        playerCtx.font = "50px Helvetica"
        playerCtx.fillStyle = "black"
        playerCtx.strokeText("My Hand", 280, 120);
        // playerCtx.textAlign = "center";

        playerCtx.font = "50px Helvetica"
        playerCtx.fillStyle = "black"
        playerCtx.strokeText("Player 2's Hand", 220, 480);

    }

    handleClick(e) {
        this.ele.addEventListener("click")
        if (e.target.nodeName === "LI") {
            let pos = e.target.id
            //card = selected
            this.carryOutMove(pos)
        }
    }

    carryOutMove(pos) {
        // let ele = document.getElementById(pos)

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