const GameObject = require('./game_object')

class Clue extends GameObject {
    constructor(game, color, pos) {
        super(game, color, pos)
        this.radius = 20
    }
}
module.exports = Clue;

//  const CARDCOLORS = ['#F5F5F5', '#FF1493', '#9ACD32', '#87CEEB', '#F4A460']
