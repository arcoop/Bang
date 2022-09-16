const Card = require('./card.js')

class Deck {
    constructor() {
        this.deckArray = []
        this.createDeck()
        this.shuffleDeck()
    }


    createDeck() {
        const CARDNUMS = [1,1,1,2,2,3,3,4,4,5]
        const CARDCOLORS = ["white", "red", "green", "blue", "yellow"]

        for (let i = 0; i < CARDCOLORS.length; i++) {
            for (let j = 0; j < CARDNUMS.length; j++) {

            let color = CARDCOLORS[i];
            let num = CARDNUMS[j]
            this.deckArray.push(new Card(color, num))
        }
    }
        return this.deckArray
    }

    shuffleDeck() {
        //need to ask about using this algo
        const shuffledArr = this.deckArray.sort((a, b) => 0.5 - Math.random());

        return this.deckArray = shuffledArr;
    }
}


module.exports = Deck
