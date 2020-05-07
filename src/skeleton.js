class Skeleton extends Enemy {
    constructor(canvas, knight) {
        super(canvas, knight, "skeleton", "img/Skeleton2.png", 8, 1, 0, 1200, 92, 400, 20, 6, undefined, undefined, 9, 97);
    }

    update() {
        super.update();
        this.x -= 1 + this.knight.speedX;
    }

}