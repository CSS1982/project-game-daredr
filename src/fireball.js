class Fireball extends Enemy {
    constructor(canvas, knight, x, y) {
        super(canvas, knight, "fireball", "img/mage-bullet-13x13.png", 5, 1, 0, 65, 13, 80, 1, knight.armorLevelStart * 0.009, x, y, 2);
    }
    update() {
        super.update();
        this.x -= 4 + this.knight.speedX;
        this.y = this.y * 1.005;
        console.log(this.y);
        if (this.y > this.canvas.height * 0.75) {
            this.y = this.canvas.height * 0.75;
        }

    }
    kill() {
        if (this.knight.x * 0.9 < this.x && this.x < this.knight.x && this.knight.bottom() > this.y) {
            this.health--;
            return this.strength;
        } else {
            return 0;
        }
    }
}