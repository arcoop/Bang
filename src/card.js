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

    draw(ctx, revealedColor, revealedNum) {
        ctx.beginPath();
        if (this.selected || this.secondarySelected) {
            ctx.roundRect(this.pos[0]-1, this.pos[1]-1, 148, 225, 15);
            ctx.lineWidth = 15;
            ctx.strokeStyle = "pink";
            // ctx.stroke();
        } else if (this.touched) {
            ctx.roundRect(this.pos[0]-1, this.pos[1]-1, 145, 223, 15);
            ctx.lineWidth = 10;
            ctx.strokeStyle = "#40E0D0";
            // ctx.stroke();
        } else {  
            ctx.roundRect(this.pos[0], this.pos[1], 140, 220, 15);
            ctx.lineWidth = 1;
            ctx.strokeStyle = "black"
            // ctx.stroke();
        }
        ctx.stroke();
        if (revealedColor) {
            ctx.fillStyle = this.color
            ctx.fill();
        } else {
            let image = document.getElementById("card-background")
            ctx.drawImage(image, this.pos[0] + 6, this.pos[1] + 48, 120, 120)
        }
        if (revealedNum) {
            ctx.font = "30px Albert Sans"
            ctx.fillStyle="black"
            ctx.fillText(`${this.num}`, this.pos[0]+20, this.pos[1]+33)
        }
    }

}

module.exports = Card;



