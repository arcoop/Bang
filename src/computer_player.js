const Player = require("./player");

class ComputerPlayer extends Player {
    constructor(name, teammatesHand) {
        super(name)
        this.human = false;
        this.teammatesHand = teammatesHand;
    }

    makeMove() {
        let move;
        if (this.teammatesHand[4].num === 5) {
            move = clue(5)
        }
    }

}



module.exports = ComputerPlayer;