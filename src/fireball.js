class Fireball extends Enemy {
    constructor(canvas, knight, x, y) {
        super(canvas, knight, "fireball", "img/mage-bullet-13x13.png", 5, 1, 0, 65, 13, 80, 1, knight.armorLevelStart * 0.10, x, y);
    }

    update() {
        super.update();
        this.speedX = -4;
        this.y = this.canvas.height*0.80;
    }

    kill() {
        if (this.x < this.knight.x * 1.20 && this.knight.y === this.knight.height) {
            if (Math.floor(Math.random() * 100) > 60) {
                return this.strength;
                this.health--;
            } else {
                return 0;
            }
        } else {
            return 0;
        }
    }
}