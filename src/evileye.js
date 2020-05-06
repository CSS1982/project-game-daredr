class EvilEye extends Enemy {
    constructor(canvas, knight) {
        super(canvas, knight, "evileye", "img/EyeAttackleft.png", 8, 1, 0, 1200, 44, 180, 15, 10, undefined, 300, 2);
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
        if (this.knight.right() > this.left() && this.knight.right() < this.right() && this.knight.bottom() < this.canvas.height / 2) {
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