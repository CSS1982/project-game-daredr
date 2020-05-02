//Caballero. Actúa como Player.
class Knight {
  constructor(canvas, armorLevel) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.x = 0;
    this.y = 0;
    this.widthIdle = 0;
    this.widthRun = 0;
    this.widthAttack = 0;
    this.height = 500;
    this.speedX = 0;
    this.speedY = 0;
    this.armorLevel = armorLevel;
    this.jump = false;
    this.imgIdle = null;
    this.imgRunRight = null;
    this.points = 0;
    this.attack = false;
    this.totalNumberOfFramesIdle = 11; // ten images in the image (see the url above)
    this.totalNumberOfFramesRun = 8;
    this.totalNumberOfFramesAttack = 6;
    this.imageFrameNumber = 0; // This is changed to make the sprite animate  
    this.widthOfImageIdle = 0;
    this.widthOfImageRun = 0;
    this.widthOfImageAttack = 0;
    this.widthOfUnitIdle = 0;
    this.widthOfUnitRun = 0;
    this.widthOfUnitAttack = 0;
    this.heightOfImageIdle = 0;
    this.heightOfImageRun = 0;
    this.heightOfUnitAttack = 0;
  }

  inicialize() {

    this.imgIdle = new Image();
    this.imgIdle.src = "img/Idle.png";
    this.widthOfImageIdle = 1540; // find the width of the image
    this.heightOfImageIdle = 85; // find the height of the image
    this.widthOfUnitIdle = (this.widthOfImageIdle / this.totalNumberOfFramesIdle); // The width of each image in the spirite
    this.widthIdle = this.widthOfUnitIdle * this.height / this.heightOfImageIdle;
    this.x = -0.25 * this.widthIdle;
    this.y = this.canvas.height - this.height;
    this.imgIdle.onload = () => this.ctx.drawImage(this.imgIdle, this.imageFrameNumber * this.widthOfUnitIdle, 0, // x and y - where in the sprite
      this.widthOfUnitIdle, this.heightOfImageIdle, // width and height
      this.x, this.y, // x and y - where on the screen
      this.widthIdle, this.height // width and height
    );

    this.imgRunRight = new Image();
    this.imgRunRight.src = "img/Run.png";
    this.widthOfImageRun = 1120; // find the width of the image
    this.heightOfImageRun = 85; // find the height of the image
    this.widthOfUnitRun = (this.widthOfImageRun / this.totalNumberOfFramesRun); // The width of each image in the spirite
    this.widthRun = this.widthOfUnitRun * this.height / this.heightOfImageRun;

    this.imgAttack = new Image();
    this.imgAttack.src = "img/Attack.png";
    this.widthOfImageAttack = 840; // find the width of the image
    this.heightOfImageAttack = 85; // find the height of the image
    this.widthOfUnitAttack = (this.widthOfImageAttack / this.totalNumberOfFramesAttack); // The width of each image in the spirite
    this.widthAttack = this.widthOfUnitAttack * this.height / this.heightOfImageAttack;

  }


  newPos() {

    if (this.jump) {
      this.speedY -= 150;
      this.jump = false;
    }
    this.speedY += 2;
    this.x += this.speedX;
    this.y += this.speedY;
    this.speedX *= 0.95;
    this.speedY *= 0.8;

    if (this.y >= this.canvas.height - this.height) {
      this.y = this.canvas.height - this.height;
    }
    if (this.x >= this.canvas.width - this.widthIdle) {
      this.x = this.canvas.width - this.widthIdle;
    }
    if (this.x <= -0.25 * this.widthIdle) {
      this.x = -0.25 * this.widthIdle;
    }


  }

  left() {
    return this.x;
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
    this.imageFrameNumber++;
    //this.ctx.drawImage(this.img, this.x, this.y, 120, 80 / 94 * this.width);
    if (this.speedX < 3 && !this.attack) {
      this.imageFrameNumber = this.imageFrameNumber % this.totalNumberOfFramesIdle;
      this.ctx.drawImage(this.imgIdle, this.imageFrameNumber * this.widthOfUnitIdle, 0, // x and y - where in the sprite
        this.widthOfUnitIdle, this.heightOfImageIdle, // width and height
        this.x, this.y, // x and y - where on the screen
        this.widthIdle, this.height // width and height
      );
    }
    if (this.speedX > 3) {
      this.imageFrameNumber = this.imageFrameNumber % this.totalNumberOfFramesRun;
      this.ctx.drawImage(this.imgRunRight, this.imageFrameNumber * this.widthOfUnitRun, 0, // x and y - where in the sprite
        this.widthOfUnitRun, this.heightOfImageRun, // width and height
        this.x, this.y, // x and y - where on the screen
        this.widthRun, this.height // width and height
      );
    }
    if (this.speedX === 0 && this.attack) {
      this.imageFrameNumber = this.imageFrameNumber % this.totalNumberOfFramesAttack;
      this.ctx.drawImage(this.imgAttack, this.imageFrameNumber * this.widthOfUnitAttack, 0, // x and y - where in the sprite
        this.widthOfUnitAttack, this.heightOfImageAttack, // width and height
        this.x, this.y, // x and y - where on the screen
        this.widthAttack, this.height // width and height
      );
    }
  }

  score() {
    this.ctx.font = "100px Creepster";
    this.ctx.fillStyle = "red";
    this.ctx.fillText("Kills: " + this.points, this.canvas.width - 500, 100);
  }

  checkCollisionEnemy(enemy) {
    /*console.log(this.right());
    console.log(enemy.left());*/
    return !(
      this.bottom() < enemy.top() - 1 ||
      this.top() > enemy.bottom() + 1 ||
      this.right() < enemy.left() - 1 ||
      this.left() > enemy.right() + 1
    );
  }


  kill(enemy) {
    if (this.attack) {
      /* console.log("kill");
       console.log(this.x + this.widthIdle);
       console.log(enemy.left());*/
      return (this.right() > enemy.x && this.left() < enemy.left());
    }
  }

  loseArmor() {
    if (this.armorLevel > 0) {
      this.armorLevel--;
    }

  }

}