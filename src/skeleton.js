class Skeleton extends Enemy {
    constructor(canvas, knight) {
        super(canvas, knight, "skeleton","img/undead_attack_sheet_left.png",20, 1, 0, 1120, 30,400, 20, knight.armorLevelStart * 0.05);
    }

    update(){
        super.update();
        this.x -= 1 + this.knight.speedX;
    }

    kill() {
        if (this.knight.right() > this.left() && this.knight.right() < this.right()  && this.knight.bottom() > this.y  ) {
            this.attack = true;
            if( Math.floor(Math.random() * 100) > 97){
                return this.strength;
            }else{
                return 0;
            }
        }else{
            return 0;
        }
      
    }

}