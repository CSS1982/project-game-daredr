//Caballero. Actúa como Player.
class Knight {
  constructor(canvas, armorLevel) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.height = 500;
    this.armorLevel = armorLevel;
    this.x = 0;
    this.y = this.height;
    this.speedX = 0;
    this.speedY = 0;
    this.points = 0;
    this.attack = false;
    this.jump = false;

    this.imgIdle = null;
    this.imgRun = null;
    this.imgAttack = null;
  }

  inicialize() {

    this.imgIdle = new imageG(this.ctx,"img/Idle.png", 1540, 85,this.height, 11);
    this.imgIdle.inicialize();
    this.x = this.imgIdle.width/2;
    this.imgIdle.update(this.x - this.imgIdle.width/2,this.y);

    this.imgRun = new imageG(this.ctx,"img/Run.png", 1120, 85,this.height, 8);
    this.imgRun.inicialize();

    this.imgAttack = new imageG(this.ctx,"img/Attack.png", 840, 85,this.height, 6);
    this.imgAttack.inicialize();
  }


  newPos() {

    if (this.jump) {
      this.speedY += 120 * -1;
      this.jump = false;
    }
    this.speedY += 2;
    this.x += this.speedX;
    console.log(`the value of x is ${this.x}`);
    this.y += this.speedY;
    this.speedX *= 0.95;
    this.speedY *= 0.8;

    if (this.y >= this.canvas.height - this.height) {
      this.y = this.canvas.height - this.height;
    }
    if (this.y < this.canvas.height - 3 * this.height) {
      this.y = this.canvas.height - 2 * this.height;
    }
    if (this.x >= this.canvas.width / 2 - this.imgIdle.width / 4) {
      this.x = this.canvas.width / 2 - this.imgIdle.width / 4;
    }
    if (this.x <= -0.10 * this.widthIdle) {
      this.x = -0.10 * this.imgIdle.width;
    }


  }

  left() {
    if (this.speedX === 0) {
      return this.x - 3 * this.widthIdle / 4;
    } else {
      return this.x - 3 * this.widthRun / 4;
    }
  }

  right() {
    if (this.speedX === 0) {
      return this.x + 3 * this.widthIdle / 4;
    } else {
      return this.x + 3 * this.widthRun / 4;
    }
  }

  top() {
    return this.y;
  }

  bottom() {
    return this.y + this.height;
  }

  update() {

    if (this.speedX < 3 && !this.attack) {
      this.imgIdle.update(this.x - this.imgIdle.width/2,this.y);
    }
    if (this.speedX > 3) {
      this.imgRun.update(this.x - this.imgIdle.width/2,this.y);

    }
    if (this.speedX === 0 && this.attack) {
      this.imgAttack.update(this.x - this.imgIdle.width/2,this.y);
    }

  }

  score() {
    this.ctx.font = "100px Creepster";
    this.ctx.fillStyle = "red";
    this.ctx.fillText("Kills: " + this.points, this.canvas.width - 500, 100);
    this.ctx.fillText("Armor: " + this.armorLevel, this.canvas.width - 500, 210);
  }

  checkCollisionEnemy(enemy) {
    console.log(this.right());
    console.log(enemy.left());
    if ((this.bottom() < enemy.top() - 1)){
      return "bottom";
    }else if ((this.top() > enemy.bottom() + 1 )){
      return "top";
    }else if ((this.right() < enemy.left() - 1)){
      return "right";
    }else if ((this.left() > enemy.right() + 1)){
      return "left";
    }
    return !(
      this.bottom() < enemy.top() - 1 ||
      this.top() > enemy.bottom() + 1 ||
      this.right() < enemy.left() - 1 ||
      this.left() > enemy.right() + 1
    );
  }


  kill(enemy) {
    if (this.attack) {
       console.log("kill");
       console.log(this.x + this.imgIdle.width);
       console.log(enemy.left());
      return (this.right() > enemy.x && this.left() < enemy.left());
    }
  }

  loseArmor() {
    if (this.armorLevel > 0) {
      this.armorLevel--;
    }

  }

}