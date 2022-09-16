class Card {
    constructor(color, num) {
        this.color = color;
        this.num = num;
        this.revealedNum = false;
        this.revealedColor = false;
        this.discarded = false;
        this.revealed = this.revealedNum && this.revealedColor;
    }

    //add event handler for cards?

    draw(ctx) {
        ctx.beginPath();
        ctx.beginPath();
        ctx.rect(20, 20, 100, 200);
        ctx.stroke();
    }
}

module.exports = Card



