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
    

    handleCardClick(event, ctx) {
        console.log("inside card handle click")  
        event.preventDefault();
        // console.log("selected status:" + this.selected)
        if (!this.selected) {
            this.selected = true
        } else this.selected = false;
        // console.log("selected status:" + this.selected)
        // this.game.draw(ctx, this.pos[0], this.pos[1], this.color, this.selected)
        // this.game.drawObjects(ctx)
        // } else this.selected = false
        // console.log(this + this.selected) 
    }

    draw(ctx, xPos, yPos, color, selected) {
        ctx.beginPath();
        // ctx.beginPath();
        if (selected) {
            // console.log("selected?:" + selected)
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
        ctx.fillStyle = color
        ctx.fill();
    }
    
    drawCardNum(ctx, xPos, yPos, number) {
        ctx.font = "30px Helvetica"
        ctx.fillStyle="black"
        
        ctx.fillText(`${this.pos}`, xPos, yPos+90)
        ctx.fillText(`${number}`, xPos+60, yPos+115)
    }

}

module.exports = Card;



