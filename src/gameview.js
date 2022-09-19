const Game = require('./game.js')
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
    }

    start() {
        this.game.drawObjects(this.gameCtx, this.canvas);
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
                        this.game.drawObjects(this.gameCtx)
                    }
            })
                let xStart = 85
                let yStart = 290
                let xEnd = 220;
                let yEnd = 330;
                if ((clickX >= xStart && clickX <= xEnd) && (clickY >= yStart && clickY <= yEnd)) {
                    this.game.handleDiscardClick();
                    this.game.drawObjects(this.gameCtx)
                }

                xStart = 680
                yStart = 380
                xEnd = 780;
                yEnd = 428;
                if ((clickX >= xStart && clickX <= xEnd) && (clickY >= yStart && clickY <= yEnd)) {
                    this.game.handlePlayClick(this.gameCtx);
                    this.game.drawObjects(this.gameCtx)
                }

        })
        
        this.game.drawObjects(this.gameCtx, this.canvas)
        
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
        
        