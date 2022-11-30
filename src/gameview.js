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
        this.player1 = player1;
        this.player2 = player2;
        this.game = new Game(this.player1, this.player2)
        this.playColors = ['#F5F5F5', '#BA55D3', '#9ACD32', '#87CEEB', '#FFA500']
        this.discardColors = ['#F5F5F5', '#BA55D3', '#9ACD32', '#87CEEB', '#FFA500']
        // this.deck = new Deck()
    }

    start() {
        this.playColors.sort((a, b) => 0.5 - Math.random());
        this.discardColors.sort((a, b) => 0.5 - Math.random());
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
        const myHandHeading = document.createElement("h2")
        const otherHandHeading = document.createElement("h2")
        var myHandhtml = myHandHeading.innerHTML;
        myHandHeading.innerHTML = `${this.player1}'s Hand`
        otherHandHeading.innerHTML = `${this.player2}'s Hand`
        currentPlayerHand.append(myHandHeading)
        otherPlayerHand.append(otherHandHeading)
        const currentPlayerCards = document.createElement("div")
        currentPlayerCards.setAttribute("class", "player-cards")
        currentPlayerHand.append(currentPlayerCards)
        const otherPlayerCards = document.createElement("div")
        otherPlayerCards.setAttribute("class", "player-cards")
        otherPlayerHand.append(otherPlayerCards)
        this.game.currentPlayer.hand.forEach(card => {
            const currentPlayerCard = document.createElement("div")
            currentPlayerCard.setAttribute("class", card.revealedColor ? "hand-card-spot-color" : "card-spot")
            currentPlayerCard.setAttribute("id", `current-player-${card.id}`)
            const text = document.createElement("p")
            text.setAttribute("class", card.revealedNum ? "card-num revealed" : "card-num not-revealed")
            var html = text.innerHTML;
            text.innerHTML = card.num;
            currentPlayerCard.append(text)
            currentPlayerCards.append(currentPlayerCard)
        })
        this.game.players[1].hand.forEach(card => {
            console.log(card)
            const otherPlayerCard = document.createElement("div")
            otherPlayerCard.setAttribute("class", `hand-card-spot a${card.color.slice(1)}`)
            otherPlayerCard.setAttribute("id", `other-player-${card.id}`)
            const text = document.createElement("p")
            text.setAttribute("class", "card-num revealed")
            var html = text.innerHTML;
            text.innerHTML = card.num;
            otherPlayerCard.append(text)
            otherPlayerCards.append(otherPlayerCard)
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
        this.playColors.forEach((color, i) => {
            const discardSpot = document.createElement("div")
            const playSpot = document.createElement("div")
            playSpot.setAttribute("class", `card-spot` )
            playSpot.setAttribute("id", `play${i}`)
            playPile.append(playSpot)
            discardSpot.setAttribute("class", `card-spot`)
            discardSpot.setAttribute("id", `discard${i}`)
            discardPile.append(discardSpot)

        })
        pilesSection.append(discardPile)
        pilesSection.append(playPile)
        this.ele.append(pilesSection)
    }

    setupBoard() {
        this.renderHands()
        this.renderDiscardAndPlayPiles()
    }

    selectCards() {
        const card = document.querySelector('.hand-card-spot')
        card.addEventListener("click", () => {
            if (card.selected) {
                card.selected = false;
            } else card.selected = true;
        })
    }
}

module.exports = GameView;