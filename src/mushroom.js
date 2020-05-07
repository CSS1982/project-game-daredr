class Mushroom extends Enemy {
    constructor(canvas, knight) {
        super(canvas, knight, "mushroom", "img/Mushroom left.png", 8, 1, 0, 1200, 43, 200, 15, 4, undefined, undefined, 8, 96);
    }

    update() {
        super.update();
        this.x -= 2 + this.knight.speedX;
    }

}