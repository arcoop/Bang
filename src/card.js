// const { EPSILON } = require('core-js/core/number');
const GameObject = require('./game_object.js')

class Card extends GameObject {
    constructor(game, color, pos, num) {
        // this.game = game;
        super(game, color, pos);
        this.touched = false;
        // this.played = false;
        this.num = num
        this.selected = false;
        this.secondarySelected = false;
        this.revealedNum = false;
        this.revealedColor = false;
        // this.discarded = false;
        this.revealed = this.revealedNum && this.revealedColor;
    }
    
    handleCardClick(event) {
        event.preventDefault();
        if (!this.selected) {
            this.selected = true
        } else this.selected = false;
    }

}

module.exports = Card;



