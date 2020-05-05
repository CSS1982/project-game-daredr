class Fireball extends Enemy {
    constructor(canvas, knight, x, y) {
        super(canvas, knight, "fireball","img/mage-bullet-13x13.png",5, 1, 0, 65, 13, 80, 1, knight.armorLevelStart * 0.09, x, y);
    }

    update() {
        super.update();
        this.x -= 4 + this.knight.speedX;
        this.y = this.canvas.height * 0.70;
    }

    kill() {
        if ( this.knight.x*0.7 < this.x  && this.x < this.knight.x && this.knight.bottom() > this.y) {
            this.health--; 
            return this.strength;
        } else {
            return 0;
        }
    }
}