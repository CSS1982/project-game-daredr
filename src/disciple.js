class Disciple extends Enemy {
    constructor(canvas, knight) {
        super(canvas, knight, "disciple", "img/disciple-45x51 mirrored.png", 4, 3, 0, 180, 153, 400, 40, knight.armorLevelStart*0.25);
    }

    update(){
        super.update();
        if (this.x > this.knight.x*2.5){
            this.speedX =0;
        }
    }
        summonFireball(enemies) {
            if( Math.floor(Math.random() * 100) > 98){
            return 1;
            }else{
                return 0;
            }
        }

        kill() {
            if (this.knight.right() > this.left() && this.knight.right() < this.right()) {
                if( Math.floor(Math.random() * 100) > 90){
                    return this.strength;
                }else{
                    return 0;
                }
            }else{
                return 0;
            }
          
        }
    }

