class Disciple extends Enemy {
    constructor(canvas, knight) {
        super(canvas, knight, "disciple", "img/disciple-45x51 mirrored.png", 4, 3, 0, 180, 153, 400, 40, 10,undefined,undefined,2);
    }

    update() {
        super.update();
        if (this.x > this.knight.x * 2.5) {
            this.speedX = 0;
        }
        this.x -= this.knight.speedX;
    }
    summonFireball() {
        if (Math.floor(Math.random() * 100) > 97) {
            return 1;
        } else {
            return 0;
        }
    }

    kill() {
        if (this.knight.right() > this.left() && this.knight.right() < this.right() && this.knight.bottom() > this.y ) {
            if (Math.floor(Math.random() * 100) > 90) {
                return Math.floor(Math.random() * this.strength);
            } else {
                return 0;
            }
        } else {
            return 0;
        }

    }
}