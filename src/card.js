// const { EPSILON } = require('core-js/core/number');
const GameObject = require('./game_object.js')

class Card extends GameObject {
    constructor(color, pos, num, id) {
        super(color, pos);
        this.num = num;
        this.id = id;
        // this.game = game;
        this.touched = false;
        // this.played = false;
        this.selected = false;
        this.secondarySelected = false;
        this.revealedNum = false;
        this.revealedColor = false;
        this.revealed = this.revealedNum && this.revealedColor;
        this.possibleNums = {
            0: 1,
            1: 2,
            2: 3,
            3: 4,
            4: 5
        }
        this.possibleColors = {
            'F5F5F5': 1, 
            'BA55D3': 2,
            '9ACD32': 3,
            '87CEEB': 4,
            'FFA500': 5
        }
    }
    
    handleCardClick(event) {
        event.preventDefault();
        if (!this.selected) {
            this.selected = true
        } else this.selected = false;
    }

}

module.exports = Card;



