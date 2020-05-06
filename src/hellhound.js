class Hellhound extends Enemy {
    constructor(canvas, knight) {
        super(canvas, knight, "hellhound", "img/hell-hound-run.png", 5, 1, 0, 335, 32, 200, 20, 5, undefined, undefined,200);
    }

    update(){
        super.update();
        this.x -= 2 + this.knight.speedX;
    }

    kill() {
        if (this.knight.right() > this.left() && this.knight.right() < this.right() && this.knight.bottom() > this.y ) {
            if (Math.floor(Math.random() * 100) > 94) {
                return Math.floor(Math.random() * this.strength);
            } else {
                return 0;
            }
        } else {
            return 0;
        }

    }
}