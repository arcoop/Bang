const GameObject = require('./game_object')

class Clue extends GameObject {
    constructor(game, color, pos) {
        super(game, color, pos)
        this.radius = 20;
    }

    draw(ctx, xPos, yPos) {
        ctx.beginPath();
        ctx.arc(xPos, yPos, this.radius, 0, 2*Math.PI, true);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

}
module.exports = Clue;