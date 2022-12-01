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
    }

    start() {
        this.playColors.sort((a, b) => 0.5 - Math.random());
        this.discardColors.sort((a, b) => 0.5 - Math.random());
        this.game.dealCards();
        this.setupBoard()
        // this.selectClues()
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
        myHandHeading.innerHTML = `${this.game.players[0].name}'s Hand`
        otherHandHeading.innerHTML = `${this.game.players[1].name}'s Hand`
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
            currentPlayerCard.setAttribute("class", card.revealedColor ? "card-spot-color" : "card-spot")
            currentPlayerCard.setAttribute("id", `current-player-${card.id}`)
            if (currentPlayerCard.touched) currentPlayerCard.classList.add("touched")
            const text = document.createElement("p")
            text.setAttribute("class", card.revealedNum ? "card-num revealed" : "card-num not-revealed")
            text.innerHTML = card.num;
            currentPlayerCard.append(text)
            currentPlayerCards.append(currentPlayerCard)
        })
        this.game.players[1].hand.forEach((card, idx) => {
            const otherPlayerCard = document.createElement("div")
            otherPlayerCard.setAttribute("class", `hand-card-spot`)
            const cardObject = document.createElement("div")
            cardObject.setAttribute("class", `card-object a${card.color.slice(1)}`)
            cardObject.setAttribute("id", `other-player-${card.id}-${idx}`)
            otherPlayerCard.append(cardObject)
            const numText = document.createElement("p")
            numText.setAttribute("class", "card-num revealed")
            numText.innerHTML = card.num;
            //attach number to cards
            cardObject.append(numText)
            const cardColorText = document.createElement('p')
            cardColorText.setAttribute("class", 'color-text')
            cardColorText.innerHTML = card.color;
            cardObject.append(cardColorText)
            //render hidden clue options
            const clueOptions = document.createElement("div")
            clueOptions.setAttribute("class", "clue-options")
            clueOptions.setAttribute("id", `clue-options-${cardObject.id}`)
            const numClue = document.createElement("div")
            numClue.setAttribute("class", "clue num-clue")
            var numclueHTML = numClue.innerHTML;
            numClue.innerHTML = card.num
            const colorClue = document.createElement("div")
            colorClue.setAttribute("class", `clue color-clue a${card.color.slice(1)}`)
            const clueColorText = document.createElement('p')
            clueColorText.setAttribute("class", 'color-text')
            clueColorText.innerHTML = card.color;
            colorClue.append(clueColorText)
            clueOptions.append(numClue)
            clueOptions.append(colorClue)
            otherPlayerCard.append(clueOptions)

            //attach to document
            otherPlayerCards.append(otherPlayerCard)
        })
        handsSection.append(currentPlayerHand);
        handsSection.append(otherPlayerHand);
        this.renderGiveClueText(handsSection)
    }

    renderGiveClueText(handsSection) {
        const giveClue = document.createElement("div")
        giveClue.setAttribute("class", "give-clue not-clicked")
        giveClue.setAttribute("id", "give-clue-button")
        giveClue.innerHTML = "Give Clue"
        handsSection.append(giveClue)
        giveClue.addEventListener("click", () => {
            const cards = document.querySelectorAll(".selected")
            cards.forEach(card => {
                card.touched = true;
            })
            this.redrawBoard()
        })
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
        this.selectCards()
    }

    redrawBoard() {
        this.game.gameSwitchTurns()
        const board = document.getElementById("game-board")
        board.innerHTML=""
        this.setupBoard()
    }

    selectCards() {
        const cards = document.querySelectorAll('.card-object')
        cards.forEach((card, idx) => {
            card.addEventListener("click", () => {
                if (card.classList.contains("selected")) {
                    const clue = document.getElementById(`clue-options-${card.id}`)
                    card.classList.remove("selected")
                    clue.classList.remove("clicked")
                } else {
                    cards.forEach(card => {
                        const clue = document.getElementById(`clue-options-${card.id}`)
                        card.classList.remove("selected")
                        clue.classList.remove("clicked")
                    })
                    const clue = document.getElementById(`clue-options-${card.id}`)
                    card.classList.add("selected")
                    clue.classList.add("clicked")
                    this.selectClues(card, clue)
                }
            })
        })
    }

    selectClues(mainCard, clue) {
        const clueOptions = clue.childNodes;
        const cards = document.querySelectorAll('.card-object')
        const giveClueButton = document.getElementById('give-clue-button')
        clueOptions.forEach(clueOption => {
            clueOption.addEventListener("mouseover", () => {
                    cards.forEach(card => {
                    if (clueOption.className.includes("color")) {
                        const color = clueOption.className.slice(16)
                        if (card.className.includes(color)) {
                            if (!card.classList.contains("selected")) card.classList.add("selected")
                        } else if (card.classList.contains("selected")) card.classList.remove("selected")
                    } else if (card.childNodes[0].innerHTML === clueOption.innerHTML) {
                        if (!card.classList.contains("selected")) card.classList.add("selected")
                    }
                })
            })

            const clueMouseOut = () => {
                giveClueButton.classList.remove("clue-clicked")
                giveClueButton.classList.add("not-clicked")
            }

            const cardMouseOut = () => {
                cards.forEach(card => {
                    if (card !== mainCard && card.classList.contains("selected")) card.classList.remove("selected")
                })
            }
            clueOption.addEventListener("mouseout", cardMouseOut)
            clueOption.addEventListener("mouseout", clueMouseOut)

            clueOption.addEventListener("click", () => {
                clueOption.removeEventListener("mouseout", clueMouseOut)
                clueOption.removeEventListener("mouseout", cardMouseOut)
                if (giveClueButton.classList.contains("not-clicked")) {
                    giveClueButton.classList.remove("not-clicked")
                    giveClueButton.classList.add("clue-clicked")
                } else {
                    clueOption.addEventListener("mouseout", cardMouseOut)
                    giveClueButton.classList.remove("clue-clicked")
                    giveClueButton.classList.add("not-clicked")
                }
            })
        })
    }
}

module.exports = GameView;