// const { EPSILON } = require('core-js/core/number');
const GameObject = require('./game_object.js')

class Card extends GameObject {
    constructor(game, color, pos, num) {
        // this.game = game;
        super(game, color, pos);

        this.num = num
        this.selected = false;
        this.revealedNum = false;
        this.revealedColor = false;
        this.discarded = false;
        this.revealed = this.revealedNum && this.revealedColor;
    }
    
    handleCardClick(event) {
        event.preventDefault();
        console.log(this)
        if (!this.selected) {
            this.selected = true
        } else this.selected = false;

    }

    draw(ctx, xPos, yPos, selected, revealedColor, revealedNumber) {
        ctx.beginPath();
        if (selected) {
            ctx.roundRect(xPos-1, yPos-1, 148, 225, 15);
            ctx.lineWidth = 15;
            ctx.strokeStyle = "pink";
            ctx.stroke();
        } else {
            ctx.roundRect(xPos, yPos, 140, 220, 15);
            ctx.lineWidth = 1;
            ctx.strokeStyle = "gray"
            ctx.stroke();
        }
        if (revealedColor) {
            ctx.fillStyle = color
            ctx.fill();
        } else {
            ctx.fillStyle = "gray"
            ctx.fill();
        }
        if (revealedNumber) {
            ctx.font = "30px Helvetica"
            ctx.fillStyle="black"
            ctx.fillText(`${this.pos}`, xPos, yPos+90)
            ctx.fillText(`${number}`, xPos+60, yPos+115)
        }
    }

}

module.exports = Card;



