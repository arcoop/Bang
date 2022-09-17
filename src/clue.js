const GameObject = require('./game_object')

class Clue extends GameObject {
    constructor(game, color, pos) {
        super(game, color, pos)
    }

    draw(ctx, xPos, yPos, color, number) {
        ctx.beginPath();
        // ctx.beginPath();
        ctx.roundRect(xPos, yPos, 50, 200, 15);
        ctx.stroke();
        ctx.fillStyle = color
    }

}
module.exports = Clue;