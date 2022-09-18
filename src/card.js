// const { EPSILON } = require('core-js/core/number');
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
    
    // handleEvents(){
    //     window.addEventListener("click", (e) => {
    //         if ((e.pageX >= this.pos[0] && e.pageX <= this.pos[0] + 140) && e.pageY >= this.pos[1] && e.pageY <= this.pos[1] + 220) {
    //             this.handleCardClick(e)
    //         }
    //     })
    // }

    handleCardClick(event) {
        console.log("inside card handle click")
        event.preventDefault();
        if (!this.selected) this.selected = true
        console.log(this + this.selected) 
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



