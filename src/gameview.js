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
        this.dragCards()
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
            currentPlayerCard.setAttribute("class", card.revealedColor ? `card-spot a${card.color.slice(1)} ` : "card-spot current-hand")
            currentPlayerCard.setAttribute("id", `current-player-${card.id}`)
            if (card.touched) currentPlayerCard.classList.add("touched")
            currentPlayerCard.setAttribute("draggable", true)
            const text = document.createElement("p")
            text.setAttribute("class", card.revealedNum ? "card-num revealed" : "card-num not-revealed")
            text.innerHTML = card.num;
            currentPlayerCard.append(text)
            currentPlayerCards.append(currentPlayerCard)
        })
        this.game.players[1].hand.forEach(card => {
            const otherPlayerCard = document.createElement("div")
            otherPlayerCard.setAttribute("class", `hand-card-spot`)
            const cardObject = document.createElement("div")
            cardObject.setAttribute("class", `card-object a${card.color.slice(1)}`)
            cardObject.setAttribute("id", `other-player-${card.id}`)
            if (card.touched) cardObject.classList.add("touched")
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
        const giveNumClue = document.createElement("div")
        giveNumClue.setAttribute("class", "give-clue not-clicked")
        giveNumClue.setAttribute("id", "give-num-clue-button")
        giveNumClue.innerHTML = "Give Clue"
        handsSection.append(giveNumClue)
        giveNumClue.addEventListener("click", () => {
            const cards = document.querySelectorAll(".selected")
            cards.forEach(card => {
                this.game.players[1].hand.forEach(playerCard => {
                    console.log(card.id.slice(13))
                    if (playerCard.id === parseInt(card.id.slice(13))) {
                        playerCard.touched = true;
                        playerCard.revealedNum = true;
                    }
                })
            })
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
                    console.log(card.id.slice(13))
                    if (playerCard.id === parseInt(card.id.slice(13))) {
                        playerCard.touched = true;
                        playerCard.revealedColor = true;
                    }
                })
            })
            this.redrawBoard()
        })
    }

    dragover_handler(e) {
        e.preventDefault();
        console.log("dragover handler", e)
    }

    drop_handler(e) {
        e.preventDefault();
        console.log("dragover handler", e)
    }

    renderDiscardAndPlayPiles() {
        const pilesSection = document.createElement("div")
        pilesSection.setAttribute("class", "game-play-piles")
        pilesSection.setAttribute("id", "piles-section")
        const playPile = document.createElement("div")
        const discardPile = document.createElement("div")
        discardPile.setAttribute("class", "play-discard-pile")
        discardPile.setAttribute("id", "discard-pile")
        // discardPile.setAttribute("ondragover", "dragover_handler(event)")
        discardPile.setAttribute("ondrop", "console.log('drop')")
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
        pilesSection.append(playPile)
        pilesSection.append(discardPile)
        this.ele.append(pilesSection)
    }

    setupBoard() {
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
        const giveColorClueButton = document.getElementById('give-color-clue-button')
        const giveNumClueButton = document.getElementById('give-num-clue-button')
        clueOptions.forEach(clueOption => {
            clueOption.addEventListener("mouseover", () => {
                console.log(clueOption)
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
        const play = document.getElementById("play-pile")
        cards.forEach(card => {
            card.addEventListener("dragstart", e => {
                // e.dataTransfer.setData("text/html", e.target.outerHTML);
                e.dataTransfer.dropEffect = "move"
            })
        })
        play.addEventListener("dragover", e => {
            e.preventDefault();
            e.dataTransfer.dropEffect = "move"
        })

        play.addEventListener("drop", e => {
            e.preventDefault();
            const data = e.dataTransfer.getData("text/html")
            e.target.setAttribute("class", "played-card")
            
            board.innerHTML="";
            this.setupBoard();
            this.dragCards();

            // e.target.appendChild(document.getElementById(data))
        })
    }
}

module.exports = GameView;