class Hellhound extends Enemy {
    constructor(canvas, knight) {
        super(canvas, knight, "hellhound", "img/hell-hound-run.png", 5, 1, 0, 335, 32, 200, 20, 5, undefined, undefined,200,94);
    }

    update(){
        super.update();
        this.x -= 2 + this.knight.speedX;
    }
}