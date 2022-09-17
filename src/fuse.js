// const GameObject = require('./game_object.js');
const Clue = require('./clue.js')

class Fuse extends Clue {
    constructor(game, color, pos) {
        super(game, color, pos)
        this.radius = 40
    }

}

module.exports = Fuse;