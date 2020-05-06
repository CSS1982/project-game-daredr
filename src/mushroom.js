class Mushroom extends Enemy {
    constructor(canvas, knight) {
        super(canvas, knight, "mushroom", "img/Mushroom left.png", 8, 1, 0, 1200, 43, 200, 15, 4, undefined, undefined, 8);
    }

    update() {
        super.update();
        this.x -= 2 + this.knight.speedX;
    }

    kill() {
        if (this.knight.right() > this.left() && this.knight.right() < this.right() && this.knight.bottom() > this.y) {
            if (Math.floor(Math.random() * 100) > 96) {
                return Math.floor(Math.random() * this.strength);
            } else {
                return 0;
            }
        } else {
            return 0;
        }

    }
}