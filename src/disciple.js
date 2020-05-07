class Disciple extends Enemy {
    constructor(canvas, knight) {
        super(canvas, knight, "disciple", "img/disciple-45x51 mirrored.png", 4, 3, 0, 180, 153, 2, 400, undefined, undefined, 40, 10, 90);
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