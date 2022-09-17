const GameObject = require('./game_object.js')

class Card extends GameObject {
    constructor(game, color, pos, num) {
        super(game, color, pos);
        this.num = num
        this.revealedNum = false;
        this.revealedColor = false;
        this.discarded = false;
        this.revealed = this.revealedNum && this.revealedColor;
    }

    // handleCardClicks(e) {
    //     addEventListener("click") {

    //     }
    // }

    draw(ctx, xPos, yPos, color, number) {
        ctx.beginPath();
        // ctx.beginPath();
        ctx.roundRect(xPos, yPos, 50, 200, 15);
        ctx.stroke();
        ctx.fillStyle = color
    }

    
}

module.exports = Card;



