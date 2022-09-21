const Card = require('./card.js')

class Deck {
    constructor(game) {
        this.game = game
        this.deckArray = []
        this.createDeck()
    }

    createDeck() {
        const CARDNUMS = [1,1,1,2,2,3,3,4,4,5]
        //const cardreference = ['white', 'red', 'green', 'blue', 'yellow']
        const CARDCOLORS = ['#F5F5F5', '#BA55D3', '#9ACD32', '#87CEEB', '#FFA500']
   
        for (let i = 0; i < CARDCOLORS.length; i++) {
            for (let j = 0; j < CARDNUMS.length; j++) {
                
                let color = CARDCOLORS[i];
                let num = CARDNUMS[j]
                this.deckArray.push(new Card(this.game, color, [], num))
            }
        }
        this.shuffleDeck()
        
    }

    shuffleDeck() {
        const shuffledArr = this.deckArray.sort((a, b) => 0.5 - Math.random());

        return this.deckArray = shuffledArr;
    }
}


module.exports = Deck
