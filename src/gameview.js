const Game = require('./game.js')
const Deck = require('./deck.js')
const Card = require('./card.js')
const Player = require('./player.js')
const Fuse = require('./fuse.js')
const Clue = require('./clue.js')

class GameView {
    constructor(ele, game) {
        this.clues = []
        this.fuses = []
        this.ele = ele
        this.game = game
        this.playColors = ['#F5F5F5', '#BA55D3', '#9ACD32', '#87CEEB', '#FFA500']
        this.discardColors = ['#F5F5F5', '#BA55D3', '#9ACD32', '#87CEEB', '#FFA500']
    }

    start() {
        this.playColors.sort((a, b) => 0.5 - Math.random());
        this.discardColors.sort((a, b) => 0.5 - Math.random());
        this.drawObjects()
    }

    renderHands() {
        
    }

    renderDiscardAndPlayPiles() {
        const pilesSection = document.createElement("div")
        pilesSection.setAttribute("class", "game-play-piles")
        pilesSection.setAttribute("id", "piles-section")
        const playPile = document.createElement("div")
        const discardPile = document.createElement("div")
        discardPile.setAttribute("class", "play-discard-pile")
        discardPile.setAttribute("id", "discard-pile")
        playPile.setAttribute("class", "play-discard-pile")
        playPile.setAttribute("id", "play-pile")
        for (let i = 0; i < 5; i++) {
            const discardSpot = document.createElement("div")
            const playSpot = document.createElement("div")
            playSpot.setAttribute("class", "card-spot")
            playSpot.setAttribute("id", `play${i}`)
            playPile.append(playSpot)
            discardSpot.setAttribute("class", "card-spot")
            discardSpot.setAttribute("id", `discard${i}`)
            discardPile.append(discardSpot)
        }
        pilesSection.append(discardPile)
        pilesSection.append(playPile)
        this.ele.append(pilesSection)
    }

    drawObjects() {
        this.renderDiscardAndPlayPiles()
    }
}

module.exports = GameView;