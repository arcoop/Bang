const Card = require('./card.js')

class Deck {
    constructor() {
        // this.game = game
        this.deckArray = []
        this.createDeck()
    }

    createDeck() {
        const CARDNUMS = [1,1,1,2,2,3,3,4,4,5]
        //const cardreference = ['white', 'red', 'green', 'blue', 'yellow']
        const CARDCOLORS = ['#F5F5F5', '#BA55D3', '#9ACD32', '#87CEEB', '#FFA500']

        let id = 1;
        for (let i = 0; i < CARDCOLORS.length; i++) {
            for (let j = 0; j < CARDNUMS.length; j++) {
                let color = CARDCOLORS[i];
                let num = CARDNUMS[j]
                this.deckArray.push(new Card(color, [], num, id))
                id += 1;
            }
        }
        this.shuffleDeck()
    }

    shuffleDeck() {
        //common deck shuffling method that I found on Stack Overflow
        const shuffledArr = this.deckArray.sort((a, b) => 0.5 - Math.random());

        return this.deckArray = shuffledArr;
    }

    // addCard(hand) {
    //     hand.unshift(this.deckArray.shift())
    // }

    // dealCards() {
    //     for (let i = 0; i < this.game.players.length; i++) {
    //         let player = this.game.players[i]
    //         while (player.hand.length < 5) {
    //             this.addCard(player.hand)
    //         }
    //     }
    // }
}


module.exports = Deck
