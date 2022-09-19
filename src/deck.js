const Card = require('./card.js')

class Deck {
    constructor(game) {
        this.game = game
        this.deckArray = []
        this.createDeck()
    }
    

    createDeck() {
        const CARDNUMS = [1,1,1,2,2,3,3,4,4,5]
        const CARDCOLORS = ['white', 'red', 'green', 'blue', 'yellow']
        // let x = 600
        // const YPOS = 40
        
        for (let i = 0; i < CARDCOLORS.length; i++) {
            for (let j = 0; j < CARDNUMS.length; j++) {
                
                let color = CARDCOLORS[i];
                let num = CARDNUMS[j]
                this.deckArray.push(new Card(this.game, color, [], num))
                // x += 70
            }
        }
        //this.deckArray
        this.shuffleDeck()
        
    }

    shuffleDeck() {
        //need to ask about using this algo
        const shuffledArr = this.deckArray.sort((a, b) => 0.5 - Math.random());

        return this.deckArray = shuffledArr;
    }
}


module.exports = Deck
