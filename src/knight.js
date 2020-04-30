//Caballero. Actúa como Player.
class Knight {
  constructor(canvas, armorLevel) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
    this.speedX = 0;
    this.speedY = 0;
    this.armorLevel = armorLevel;
    this.jump = false;
    this.img = null;
    this.points = 0;
    this.attack = false;
  }

  inicialize() {
    this.width = 120;
    this.height = 80 / 94 * this.width;
    this.x = 0;
    this.y = this.canvas.height - this.height;
    this.img = new Image();
    this.img.onload = () => this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    this.img.src = 'img/spellun-sprite.png';
  }

  newPos() {
    this.x += this.speedX;
    if (this.x >= this.canvas.width - this.width) {
      this.x = this.canvas.width - this.width;
    }
    if (this.x <= 0) {
      this.x = 0;
    }
    if (this.jump === true) {
      this.speedY += 0.01;
    }
    this.y += this.speedY + 0.011;
    if (this.y >= this.canvas.height - this.height) {
      this.y = this.canvas.height - this.height;
      this.jump = false;
    } else if (this.y <= this.canvas.height - 2 * this.height) {
      this.y = this.canvas.height - 2 * this.height;
      this.jump = true;
    } else {
      this.jump = true;
    }
  }

  left() {
    return this.x;
  }

  right() {
    return this.x + this.width;
  }

  top() {
    return this.y;
  }

  bottom() {
    return this.y + this.height;
  }

  update() {
    this.ctx.drawImage(this.img, this.x, this.y, 120, 80 / 94 * this.width);
  }

  score() {
    this.ctx.font = "24px bold Verdana";
    this.ctx.fillStyle = "red";
    this.ctx.fillText("Score: " + this.points, this.canvas.width - 200, 50);
  }

  /*crashWith(enemy) {
    return !(
      this.bottom() < enemy.top() ||
      this.top() > enemy.bottom() ||
      this.right() < enemy.left() ||
      this.left() > enemy.right()
    );
  }*/

  checkCollisionEnemy(enemy) {
    return !(
      this.bottom() < enemy.top() ||
      this.top() > enemy.bottom() ||
      this.right() < enemy.left() ||
      this.left() > enemy.right()
    );
  }


  kill(enemy) {
    if (this.attack) {
     console.log("kill");
      return !(this.right() < enemy.left() + 10);
    }
  }

  loseArmor() {
    if (this.armorLevel > 0) {
      this.armorLevel--;
    }

  }

}