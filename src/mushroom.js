class Mushroom extends Enemy {
    constructor(canvas, knight,x,y) {
        super(canvas, knight, "hellhound", "img/Mushroom left.png", 8, 1, 0, 1200, 43, 200, 15, knight.armorLevelStart * 0.09);
    }

    update(){
        super.update();
        this.x -= 1.5 + this.knight.speedX;
    }

    kill() {
        if (this.knight.right() > this.left() && this.knight.right() < this.right() && this.knight.bottom() > this.y ) {
            if (Math.floor(Math.random() * 100) > 96) {
                return this.strength;
            } else {
                return 0;
            }
        } else {
            return 0;
        }

    }
}