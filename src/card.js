// const { EPSILON } = require('core-js/core/number');
const GameObject = require('./game_object.js')

class Card extends GameObject {
    constructor(game, color, pos, num) {
        // this.game = game;
        super(game, color, pos);
        this.touched = false;
        this.num = num
        this.selected = false;
        this.revealedNum = false;
        this.revealedColor = false;
        this.discarded = false;
        this.revealed = this.revealedNum && this.revealedColor;
    }
    
    
    handleCardClick(event) {
        event.preventDefault();
        if (!this.selected) {
            this.selected = true
        } else this.selected = false;

    }

    draw(ctx, revealedColor, revealedNum) {
        ctx.beginPath();
        if (this.selected) {
            ctx.roundRect(this.pos[0]-1, this.pos[1]-1, 148, 225, 15);
            ctx.lineWidth = 15;
            ctx.strokeStyle = "pink";
            ctx.stroke();
        } else if (this.touched) {
            ctx.roundRect(this.pos[0]-1, this.pos[1]-1, 145, 223, 15);
            ctx.lineWidth = 13;
            ctx.strokeStyle = "#40E0D0";
            ctx.stroke();
        }else {
            ctx.roundRect(this.pos[0], this.pos[1], 140, 220, 15);
            ctx.lineWidth = 1;
            ctx.strokeStyle = "gray"
            ctx.stroke();
        }
        if (revealedColor) {
            ctx.fillStyle = this.color
            ctx.fill();
        } else {
            ctx.fillStyle = this.color //"gray"
            ctx.fill();
        }
        if (revealedNum) {
            ctx.font = "30px Helvetica"
            ctx.fillStyle="black"
            ctx.fillText(`${this.pos}`, this.pos[0], this.pos[1]+90)
            ctx.fillText(`${this.num}`, this.pos[0]+60, this.pos[1]+115)
        }
    }

}

module.exports = Card;



