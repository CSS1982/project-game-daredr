class Skeleton extends Enemy {
    constructor(canvas, knight,x,y) {
        super(canvas, knight, "skeleton","img/undead_walk_sheet-right.png", 20, 1, 0, 1120, 26,400, 20, knight.armorLevelStart * 0.10);
    }
    kill() {
        if (this.knight.right() > this.left() && this.knight.right() < this.right()) {
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