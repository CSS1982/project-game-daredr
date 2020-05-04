class Hellhound extends Enemy {
    constructor(canvas, knight,x,y) {
        super(canvas, knight, "hellhound", "img/hell-hound-run.png", 5, 1, 0, 335, 32, 200, 15, knight.armorLevelStart * 0.15);
    }
    kill() {
        if (this.knight.right() > this.left() && this.knight.right() < this.right()) {
            if (Math.floor(Math.random() * 100) > 93) {
                return this.strength;
            } else {
                return 0;
            }
        } else {
            return 0;
        }

    }
}