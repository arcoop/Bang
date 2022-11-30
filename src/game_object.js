class GameObject {
    constructor(color, pos) {
        this.pos = pos
        this.color = color
    }
}

// class Card extends GameObject {
//     constructor(color, number) {
//         this.color = color;
//         this.number = number;
//         this.revealedNum = false
//         this.revealedColor = false;
//         this.discarded = false;
//         this.revealed = this.revealedNum && this.revealedColor;
//     }

//     draw(ctx, xPos, yPos, color, number) {
//         ctx.beginPath();
//         // ctx.beginPath();
//         ctx.roundRect(xPos, yPos, 50, 200, 15);
//         ctx.stroke();
//         ctx.fillStyle = color
//     }
// }





module.exports = GameObject;

