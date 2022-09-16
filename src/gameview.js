const Game = require('./game.js')

class GameView {
    constructor(ctx, ele){
        this.ele = ele
        this.ctx = ctx
        this.game = new Game(["player1", "player2"])
        this.setupBoard()
    }

    setupBoard() {
        //use ul and li elements to create a board for the other player and current player
        let currentPlayerHand = document.createElement("ul")
        currentPlayerHand.setAttribute("class", "current-player-hand")
        currentPlayerHand.innerText = "My Hand"
        for (let i = 0; i < 5; i++) {
            let cardLocation = document.createElement("li")
            cardLocation.id = `current-player-${i}`
            currentPlayerHand.append(cardLocation)
        }

        this.ele.append(currentPlayerHand)

        let otherPlayerHand = document.createElement("ul")
        otherPlayerHand.setAttribute("class", "other-player-hand")
        otherPlayerHand.innerText = `${this.game.player2.name}'s Hand`
        for (let i = 0; i < 5; i ++) {
            let cardLocation = document.createElement("li")
            cardLocation.id = `other-player-${i}`
            otherPlayerHand.append(cardLocation)
        }
        this.ele.append(otherPlayerHand)


            //inner text will either be "my hand" or "player 2's hand"
            // set data attributes
            //each card in the hand will go inside each li
        //call render on each hand at the end of this method

    }

    start () {
        // this.game.draw(this.ctx)
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
        let ele = document.getElementById(pos)


    }
    

    renderCurrentPlayerHand() {
       // iterate through players hand
       // if the card is revealed, set that li ele to revealed
       // else, set it to not revealed
    }

    renderOtherPlayerHand() {
        //iterate through hand, show full hand 
    }
}

module.exports = GameView;