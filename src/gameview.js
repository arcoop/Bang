const Game = require('./game.js')
const Deck = require('./deck.js')
const Card = require('./card.js')
const Player = require('./player.js')

class GameView {
    // constructor(ele, gameCtx, playerCtx){
    constructor(ele, gameCtx, canvas){
        this.canvas = canvas
        this.ele = ele
        this.gameCtx = gameCtx
        // this.playerCtx = playerCtx
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

    start() 
        this.drawObjects(this.gameCtx, this.canvas);
        // this.play();
    }
    
    handleEvents() {
        window.addEventListener("click", (e) => {
            let clickX = e.pageX;
            let clickY = e.pageY;
            console.log(clickX)
            console.log(clickY)
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
                let xStart = 85
                let yStart = 290
                let xEnd = 220;
                let yEnd = 330;
                if ((clickX >= xStart && clickX <= xEnd) && (clickY >= yStart && clickY <= yEnd)) {
                    this.game.handleDiscardClick();
                    this.drawObjects(this.gameCtx)
                }

                xStart = 680
                yStart = 380
                xEnd = 780;
                yEnd = 428;
                if ((clickX >= xStart && clickX <= xEnd) && (clickY >= yStart && clickY <= yEnd)) {
                    this.game.handlePlayClick(this.gameCtx);
                    this.drawObjects(this.gameCtx)
                }

        })
        
        this.drawObjects(this.gameCtx, this.canvas)
        
    }

    drawObjects(gameCtx, canvas) {

        gameCtx.clearRect(0,0,1800,1800)

        this.game.setupBackground(gameCtx);
        this.game.renderClueText(gameCtx);
        this.game.addScoreBox(gameCtx);
        this.game.addText(gameCtx);
        this.game.renderDiscardText(gameCtx);
        this.game.renderPlayPiles(gameCtx);
        this.game.renderClueText(gameCtx);

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
            card.draw(gameCtx, card.pos[0], card.pos[i], card.selected, card.revealedColor, card.revealedNum)
            
        }

        for (let i = 0; i < this.game.players[1].hand.length; i++) {
            let card = this.game.players[1].hand[i]
            card.pos = otherPlayerPositions[i]
            card.draw(gameCtx, card.pos[0], card.pos[i], card.selected, card.revealedColor, card.revealedNum)
        }

        for (const fuse of this.game.fuses) {
            fuse.draw(gameCtx, fuse.pos[0], fuse.pos[1])
        }

        for (const clue of this.game.clues) {
            clue.draw(gameCtx, clue.pos[0], clue.pos[1])
        }

        //render discard piles
        for (let i = 0; i < 5; i ++){
            let pile = this.game.discardPiles[i]
            if (pile.length > 0) {
                pile.forEach(card => {
                    card.draw(gameCtx, card.pos[0], card.pos[i], card.selected, card.revealedColor, card.revealedNum)
                })
            } else {
                let x = this.discardPositions[i][0]
                let y = this.discardPositions[i][1]
                gameCtx.roundRect(x, y, 140, 200, 15)
                gameCtx.lineWidth = 1;
                gameCtx.strokeStyle = "gray"
                gameCtx.stroke();
            }
        }

    }

    currentHands() {
        const hands = this.game.players[0].hand.concat(this.game.players[1].hand)
        // const hands = [];
        // this.game.players.forEach(player => {
        //     hands.push(player.hand)
        // })
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
        
        