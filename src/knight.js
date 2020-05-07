//Caballero. Actúa como Player.
class Knight {
  constructor(canvas, armorLevel) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.height = 500;
    this.width = 0;
    this.armorLevelStart = armorLevel;
    this.armorLevel = this.armorLevelStart;
    this.x = 0;
    this.xInitial = null;
    this.y = this.height;
    this.speedX = 0;
    this.speedY = 0;
    this.points = 0;
    this.attack = false;
    this.jump = false;
    this.direction = "right";
    this.type = "knight";
    this.imgIdle = null;
    this.imgIdleLeft = null;
    this.imgRun = null;
    this.imgRunLeft = null;
    this.imgAttack = null;
    this.imgAttackLeft = null;
    this.row = 0;
    //this.animationSpeed = 1;
    //this.updateCounter = 0;
  }

  inicialize() {

    this.imgIdle = new imageG(this.ctx, "img/Idle.png", 1540, 85, this.height, 11, 1, this.row);
    this.imgIdle.inicialize();
    this.x = this.imgIdle.width / 2;
    this.xInitial = this.x;
    this.width = this.imgIdle.width;
    this.imgIdle.update(this.x - this.imgIdle.width / 2, this.y, this.type);
    this.imgIdleLeft = new imageG(this.ctx, "img/IdleLeft.png", 1540, 85, this.height, 11, 1, this.row);
    this.imgIdleLeft.inicialize();

    this.imgRun = new imageG(this.ctx, "img/Run.png", 1120, 85, this.height, 8, 1, this.row);
    this.imgRun.inicialize();
    this.imgRunLeft = new imageG(this.ctx, "img/Runleft.png", 1120, 85, this.height, 8, 1, this.row);
    this.imgRunLeft.inicialize();

    this.imgAttack = new imageG(this.ctx, "img/Attack.png", 840, 85, this.height, 6, 1, this.row);
    this.imgAttack.inicialize();
    this.imgAttackLeft = new imageG(this.ctx, "img/Attackleft.png", 840, 85, this.height, 6, 1, this.row);
    this.imgAttackLeft.inicialize();


  }


  newPos(enemies) {

    if (this.jump) {
      this.speedY -= 75;
      this.jump = false;
    }
    this.speedY += 1;
    if (this.direction === "right") {
      if (this.speedX > 8) {
        this.speedX = 8;
      }
      this.x += this.speedX;
    }
    if (this.direction === "left") {

      if (this.x <= this.xInitial) {
        this.speedX = 0;
        this.x = this.xInitial;
      } else {
        if (this.speedX < -6) {
          this.speedX = -6;
        }
        this.x += this.speedX;
      }
    }
    this.y += this.speedY;
    this.speedY *= 0.95;
    this.speedX *= 0.95;


    enemies.forEach(enemy => {
      if (this.right() > enemy.left() && this.bottom() > enemy.top() && this.right() < enemy.x + 100) {
        this.x = enemy.left();
      }

    });

    if (this.y >= this.canvas.height - this.height) {
      this.y = this.canvas.height - this.height;
    }
    if (this.x >= this.canvas.width / 2 - this.imgIdle.width / 4) {
      this.x = this.canvas.width / 2 - this.imgIdle.width / 4;
    }



  }

  left() {
    return this.x - this.width / 4;
  }


  right() {
    return this.x + this.width / 4;
  }


  top() {
    return this.y;
  }

  bottom() {
    return this.y + this.height;
  }

  update() {
    // if (Number.isInteger(this.updateCounter / this.animationSpeed)) {

    if (this.speedX > -3 && this.speedX < 3 && !this.attack && this.direction === "right") {
      this.imgIdle.update(this.x - this.imgIdle.width / 2, this.y);
    }

    if (this.speedX > -3 && this.speedX < 3 && !this.attack && this.direction === "left") {
      this.imgIdleLeft.update(this.x - this.imgIdleLeft.width / 2, this.y);
    }

    if (this.speedX > 3 && this.direction === "right") {
      this.imgRun.update(this.x - this.imgIdle.width / 2, this.y);

    }

    if (this.speedX < -3 && this.direction === "left") {
      this.imgRunLeft.update(this.x - this.imgIdle.width / 2, this.y);

    }
    if (this.speedX === 0 && this.attack && this.direction === "right") {
      this.imgAttack.update(this.x - this.imgIdle.width / 2, this.y);
    }
    if (this.speedX === 0 && this.attack && this.direction === "left") {
      this.imgAttackLeft.update(this.x - this.imgIdle.width / 2, this.y);
    }

    // }
    // this.updateCounter++;
  }

  status() {
    this.ctx.font = "50px Creepster";
    this.ctx.fillStyle = "red";
    this.ctx.fillText("Kills: " + this.points, this.canvas.width - 400, 50);
    this.ctx.fillText("Health: ", this.canvas.width - 500, 100);
    this.ctx.fillRect(this.canvas.width - 350, 80, this.armorLevel * 150 / this.armorLevelStart, 20);

  }

  checkRightAttack(enemy) {

    return (this.attack && this.right() > enemy.left() && this.left() <= enemy.left() && this.direction === "right" && this.top() < enemy.bottom() * 0.7);
  }
  checkLeftAttack(enemy) {

    return (this.attack && this.right() >= enemy.right() && this.direction === "left" && this.top() < enemy.bottom() * 0.7);
  }



  attackEnemy() {
    if (this.attack) {
      var attackValue = Math.floor(Math.random() * 20);
      if (attackValue < 10) {
        return 0;
      } else if (attackValue < 14) {
        return 2;
      } else if (attackValue < 16) {
        return 4;
      } else if (attackValue < 18) {
        return 5;
      } else {
        return 10;
      }

    }
  }


  loseArmor(damage) {
    if (this.armorLevel > 0) {
      this.armorLevel -= damage;
    }

  }

}