const GameObject = require('./game_object.js')

class Card extends GameObject {
    constructor(game, color, pos, num) {
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
        if (!this.selected) this.selected = true
       
    }

    draw(ctx, xPos, yPos, color) {
        ctx.beginPath();
        // ctx.beginPath();
        ctx.roundRect(xPos, yPos, 140, 220, 15);
        ctx.strokeStyle = "gray"
        ctx.stroke();
        ctx.fillStyle = color
        ctx.fill();
    }

    drawCardNum(ctx, xPos, yPos, number) {
        ctx.font = "30px Helvetica"
        ctx.fillStyle="black"
        ctx.fillText(`${number}`, xPos+60, yPos+115)
    }

}

module.exports = Card;



