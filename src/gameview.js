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
        this.game = new Game(this.ele, this.player1, this.player2)
        this.playColors = ['#F5F5F5', '#BA55D3', '#9ACD32', '#87CEEB', '#FFA500']
        this.discardColors = ['#F5F5F5', '#BA55D3', '#9ACD32', '#87CEEB', '#FFA500']
    }

    start() {
        this.playColors.sort((a, b) => 0.5 - Math.random());
        this.discardColors.sort((a, b) => 0.5 - Math.random());
        this.game.dealCards();
        this.setupBoard()
        this.dragCards()
        // this.selectClues()
    }

    renderMisplayText() {
        const misplayText = document.createElement("h3")
        misplayText.innerHTML = this.game.numFuses === 1 ? 'Misfire! 1 fuse left' : `Misfire! ${this.game.numFuses} fuses left!`
        misplayText.setAttribute("class", "misplay-text")
        misplayText.classList.add("invisible")
        this.ele.append(misplayText)
    }

    renderClueImages() {
        const allClues = document.createElement("div")
        allClues.setAttribute("class", "all-clues")
        const numClues = document.createElement("h3")
        numClues.setAttribute("class", "num-clues-text")
        numClues.innerText = this.game.numClues === 1 ? (this.game.numClues + " clue") : (this.game.numClues + " clues")
        allClues.append(numClues)
        for (let i = 0; i < this.game.numClues; i++) {
            const clue = document.createElement("div")
            clue.setAttribute("class", "clue-div")
            clue.setAttribute("id", `clue-${i}`)
            const clueText = document.createElement("i")
            clueText.setAttribute("class", "fa-solid fa-magnifying-glass")
            clue.append(clueText)
            allClues.append(clue)
        }
        this.ele.append(allClues)
    }

    renderHands() {
        const boardArea = document.getElementById("board-area")
        const handsSection = document.createElement("div")
        handsSection.setAttribute("class", "game-play-piles")
        handsSection.setAttribute("id", "hands-section")
        boardArea.append(handsSection)
        const currentPlayerHand = document.createElement("div")
        const otherPlayerHand = document.createElement("div")
        currentPlayerHand.setAttribute("class", "hands-pile")
        currentPlayerHand.setAttribute("id", "current-player-pile")
        otherPlayerHand.setAttribute("class", "hands-pile")
        otherPlayerHand.setAttribute("id", "other-player-pile")
        const myHandHeading = document.createElement("h2")
        const otherHandHeading = document.createElement("h2")
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
            currentPlayerCard.setAttribute("class", "card-spot")
            const cardObject = document.createElement("div")
            cardObject.setAttribute("class", card.revealedColor ? `card-object a${card.color.slice(1)} current-hand` : "card-object current-hand" )
            cardObject.setAttribute("id", `current-player-${card.id}`)
            if (card.touched) currentPlayerCard.classList.add("touched")
            cardObject.setAttribute("draggable", true)
            const text = document.createElement("p")
            text.setAttribute("class", card.revealedNum ? "card-num revealed" : "card-num not-revealed")
            text.innerHTML = card.num;
            cardObject.append(text)
            currentPlayerCard.append(cardObject)
            currentPlayerCards.append(currentPlayerCard)
        })
        this.game.players[1].hand.forEach(card => {
            const cardAndClue = document.createElement("div")
            cardAndClue.setAttribute("class", "card-and-clue")
            const otherPlayerCard = document.createElement("div")
            otherPlayerCard.setAttribute("class", `card-spot other-player`)
            const cardObject = document.createElement("div")
            cardObject.setAttribute("class", `card-object a${card.color.slice(1)}`)
            cardObject.setAttribute("id", `other-player-${card.id}`)
            cardAndClue.append(otherPlayerCard)
            if (card.touched) otherPlayerCard.classList.add("touched")
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
            cardAndClue.append(clueOptions)

            //attach to document
            otherPlayerCards.append(cardAndClue)
        })
        handsSection.append(currentPlayerHand);
        handsSection.append(otherPlayerHand);
        this.renderGiveClueText(handsSection)
    }

    renderGiveClueText(handsSection) {
        const giveNumClue = document.createElement("div")
        giveNumClue.setAttribute("class", "give-clue not-clicked")
        giveNumClue.setAttribute("id", "give-num-clue-button")
        giveNumClue.innerHTML = "Give Clue"
        handsSection.append(giveNumClue)
        giveNumClue.addEventListener("click", () => {
            const cards = document.querySelectorAll(".selected")
            cards.forEach(card => {
                this.game.players[1].hand.forEach(playerCard => {
                    if (playerCard.id === parseInt(card.childNodes[0].id.slice(13))) {
                        playerCard.touched = true;
                        playerCard.revealedNum = true;
                    }
                })
            })
            this.game.numClues -= 1;
            this.redrawBoard()
        })
        const giveColorClue = document.createElement("div")
        giveColorClue.setAttribute("class", "give-clue not-clicked")
        giveColorClue.setAttribute("id", "give-color-clue-button")
        giveColorClue.innerHTML = "Give Clue"
        handsSection.append(giveColorClue)
        giveColorClue.addEventListener("click", () => {
            const cards = document.querySelectorAll(".selected")
            cards.forEach(card => {
                this.game.players[1].hand.forEach(playerCard => {
                    if (playerCard.id === parseInt(card.childNodes[0].id.slice(13))) {
                        playerCard.touched = true;
                        playerCard.revealedColor = true;
                    }
                })
            })
            this.game.numClues -= 1;
            this.redrawBoard()
        })
    }

    renderDiscardAndPlayPiles() {
        const boardArea = document.getElementById("board-area")
        const pilesSection = document.createElement("div")
        pilesSection.setAttribute("class", "game-play-piles")
        pilesSection.setAttribute("id", "piles-section")
        boardArea.append(pilesSection)
        const playPile = document.createElement("div")
        const discardPile = document.createElement("div")
        discardPile.setAttribute("class", "play-discard-pile")
        discardPile.setAttribute("id", "discard-pile")
        playPile.setAttribute("class", "play-discard-pile")
        playPile.setAttribute("id", "play-pile")
        const playHeading = document.createElement("h2")
        playHeading.innerHTML = "Play"
        playPile.append(playHeading)
        const playPileCards = document.createElement("div")
        playPileCards.setAttribute("class", "dp-pile-cards")
        playPile.append(playPileCards)
        this.playColors.forEach((color, i) => {
            const playSpot = document.createElement("div")
            playSpot.setAttribute("class", "card-spot")
            playSpot.setAttribute("id", `play${i}`)
            if (this.game.playPiles[i].length > 0) {
                this.game.playPiles[i].forEach(card => {
                    card.revealedColor = true;
                    card.revealedNum = true;
                    const cardEl = document.createElement("div")
                    cardEl.setAttribute("class", `card-object a${card.color.slice(1)} discarded-played`)
                    cardEl.setAttribute("id", `played-card-${card.id}`)
                    const numText = document.createElement("p")
                    numText.innerHTML = card.num
                    cardEl.append(numText)
                    playSpot.append(cardEl)
                })
            }
            playPileCards.append(playSpot)
        })
        const discardPileCards = document.createElement("div")
        discardPileCards.setAttribute("class", "dp-pile-cards")
        const discardHeading = document.createElement("h2")
        discardHeading.innerHTML = "Discard"
        discardPile.append(discardHeading)
        discardPile.append(discardPileCards)
        this.discardColors.forEach((color, i) => {
            const discardSpot = document.createElement("div")
            discardSpot.setAttribute("class", `card-spot discard`)
            discardSpot.setAttribute("id", `discard${i}`)
            if (this.game.discardPiles[i].length > 0) {
                let top = 0;
                this.game.discardPiles[i].forEach((card, idx) => {
                    card.revealedColor = true;
                    card.revealedNum = true;
                    const cardEl = document.createElement("div") 
                    cardEl.setAttribute("class", `card-object a${card.color.slice(1)} discarded-played discarded-card cardNum${idx}`)
                    cardEl.setAttribute("id", `discarded-card-${card.id}`)
                    cardEl.setAttribute("style", `z-index: ${idx}; top: ${top}px`)
                    const numText = document.createElement("p")
                    numText.innerHTML = card.num
                    cardEl.append(numText)
                    discardSpot.append(cardEl)
                    top += 50;
                })
            }
            discardPileCards.append(discardSpot)
        })
        pilesSection.append(playPile)
        pilesSection.append(discardPile)
    }

    setupBoard() {
        this.renderMisplayText()
        this.renderClueImages()
        const boardArea = document.createElement("div")
        boardArea.setAttribute("class", "board-area")
        boardArea.setAttribute("id", "board-area")
        this.ele.append(boardArea)
        this.renderHands()
        this.renderDiscardAndPlayPiles()
        this.selectCards()
    }

    redrawBoard() {
        this.game.gameSwitchTurns();
        const board = document.getElementById("game-board");
        board.innerHTML="";
        this.setupBoard();
        this.dragCards();
    }

    selectCards() {
        const cards = document.querySelectorAll('.other-player')
        cards.forEach((card, idx) => {
            card.addEventListener("click", () => {
                if (card.classList.contains("selected")) {
                    const clue = document.getElementById(`clue-options-${card.childNodes[0].id}`)
                    card.classList.remove("selected")
                    // clue.classList.remove("clicked")
                } else {
                    cards.forEach(card => {
                        const clue = document.getElementById(`clue-options-${card.childNodes[0].id}`)
                        card.classList.remove("selected")
                        clue.classList.remove("clicked")
                    })
                    const clue = document.getElementById(`clue-options-${card.childNodes[0].id}`)
                    card.classList.add("selected")
                    clue.classList.add("clicked")
                    this.selectClues(card, clue)
                }
            })
        })
    }

    selectClues(mainCard, clue) {
        const clueOptions = clue.childNodes;
        const cards = document.querySelectorAll('.other-player')
        const giveColorClueButton = document.getElementById('give-color-clue-button')
        const giveNumClueButton = document.getElementById('give-num-clue-button')
        clueOptions.forEach(clueOption => {
            clueOption.addEventListener("mouseover", () => {
                    cards.forEach(card => {
                    if (clueOption.className.includes("color")) {
                        const color = clueOption.className.slice(16)
                        if (card.childNodes[0].className.includes(color)) {
                            if (!card.classList.contains("selected")) card.classList.add("selected")
                        } else if (card.classList.contains("selected")) card.classList.remove("selected")
                    } else if (card.childNodes[0].childNodes[0].innerHTML === clueOption.innerHTML) {
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
            // clueOption.addEventListener("mouseout", clueMouseOut)

            clueOption.addEventListener("click", () => {
                clueOption.removeEventListener("mouseout", clueMouseOut)
                clueOption.removeEventListener("mouseout", cardMouseOut)
                if (clueOption.className.includes("num")) {
                    if (giveNumClueButton.classList.contains("not-clicked")) {
                        giveNumClueButton.classList.remove("not-clicked")
                        giveNumClueButton.classList.add("clue-clicked")
                    } else {
                        clueOption.addEventListener("mouseout", cardMouseOut)
                        giveNumClueButton.classList.remove("clue-clicked")
                        giveNumClueButton.classList.add("not-clicked")
                    }
                } else {
                    if (giveColorClueButton.classList.contains("not-clicked")) {
                        giveColorClueButton.classList.remove("not-clicked")
                        giveColorClueButton.classList.add("clue-clicked")
                    } else {
                        clueOption.addEventListener("mouseout", cardMouseOut)
                        giveColorClueButton.classList.remove("clue-clicked")
                        giveColorClueButton.classList.add("not-clicked")
                    }
                }
            })
        })
    }

    dragCards() {
        const cards = document.querySelectorAll('.current-hand')
        const playZone = document.getElementById("play-pile")
        const discardZone = document.getElementById("discard-pile")
        let pivotCard;
        cards.forEach(card => {
            card.addEventListener("dragstart", e => {
                pivotCard = e.target;
                e.dataTransfer.setData("text/html", e.target.outerHTML);
                e.dataTransfer.setData("text/html", e.target.innerHTML);
                e.dataTransfer.dropEffect = "move"
            })
        })
        
        playZone.addEventListener("dragover", e => {
            e.preventDefault();
            e.dataTransfer.dropEffect = "move"
        })

        playZone.addEventListener("drop", e => {
            e.preventDefault();
            this.game.currentPlayer.hand.forEach(card => {
                if (card.id === parseInt(pivotCard.id.slice(15))) {
                    this.game.handlePlayClick(card, this.playColors, this.discardColors)
                }
            })
            this.redrawBoard()
        })

        discardZone.addEventListener("dragover", e => {
            e.preventDefault();
            e.dataTransfer.dropEffect = "move"
        })

        discardZone.addEventListener("drop", e => {
            e.preventDefault();
            this.game.currentPlayer.hand.forEach(card => {
                if (card.id === parseInt(pivotCard.id.slice(15))) {
                    this.game.handleDiscardClick(card, this.discardColors)
                }
            })
            // const data = e.dataTransfer.getData("text/html")
            // e.target.setAttribute("class", "played-card")
            const board = document.getElementById("game-board");
            board.innerHTML="";
            // this.game.playOrDiscard()
            this.redrawBoard()
        })

    }
}

module.exports = GameView;