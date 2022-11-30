const Game = require('./game.js')
const Deck = require('./deck.js')
const Card = require('./card.js')
const Player = require('./player.js')
const Fuse = require('./fuse.js')
const Clue = require('./clue.js')

class GameView {
    constructor(ele, player1, player2) {
        this.clues = []
        this.fuses = []
        this.ele = ele
        this.game = new Game(player1, player2)
        this.playColors = ['#F5F5F5', '#BA55D3', '#9ACD32', '#87CEEB', '#FFA500']
        this.discardColors = ['#F5F5F5', '#BA55D3', '#9ACD32', '#87CEEB', '#FFA500']
    }

    start() {
        // this.playColors.sort((a, b) => 0.5 - Math.random());
        // this.discardColors.sort((a, b) => 0.5 - Math.random());
        this.game.dealCards();
        this.setupBoard()
    }

    renderHands() {
        const handsSection = document.createElement("div")
        handsSection.setAttribute("class", "game-play-piles")
        handsSection.setAttribute("id", "hands-section")
        this.ele.append(handsSection)
        const currentPlayerHand = document.createElement("div")
        const otherPlayerHand = document.createElement("div")
        currentPlayerHand.setAttribute("class", "hands-pile")
        currentPlayerHand.setAttribute("id", "current-player-pile")
        otherPlayerHand.setAttribute("class", "hands-pile")
        otherPlayerHand.setAttribute("id", "other-player-pile")
        this.game.currentPlayer.hand.forEach(card => {
            console.log(card)
            const currentPlayerCard = document.createElement("div")
            currentPlayerCard.setAttribute("class", "card-spot")
            currentPlayerCard.setAttribute("id", `current-player-${card.id}`)
            currentPlayerHand.append(currentPlayerCard)
        })
        this.game.players[1].hand.forEach(card => {
            const otherPlayerCard = document.createElement("div")
            otherPlayerCard.setAttribute("class", "card-spot")
            otherPlayerCard.setAttribute("id", `other-player-${card.id}`)
            otherPlayerHand.append(otherPlayerCard)
        })
        handsSection.append(currentPlayerHand);
        handsSection.append(otherPlayerHand);

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

    setupBoard() {
        this.renderHands()
        this.renderDiscardAndPlayPiles()
    }
}

module.exports = GameView;