const GameObject = require('./game_object')

class Clue extends GameObject {
    constructor(game, color, pos) {
        super(game, color, pos)
        this.radius = 20
    }


    draw(ctx, xPos, yPos) {
        ctx.beginPath();
        ctx.arc(xPos, yPos, this.radius, 0, 2*Math.PI, true);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.strokeStyle = this.color;
        ctx.stroke();
    }

}
module.exports = Clue;

//  const CARDCOLORS = ['#F5F5F5', '#FF1493', '#9ACD32', '#87CEEB', '#F4A460']
