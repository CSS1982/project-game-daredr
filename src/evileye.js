class EvilEye extends Enemy {
    constructor(canvas, knight) {
        super(canvas, knight, "evileye", "img/EyeAttackleft.png", 8, 1, 0, 1200, 44, 180, 15, 10, undefined, 300, 2,90);
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

}