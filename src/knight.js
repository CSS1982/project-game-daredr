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
    this.totalNumberOfFrames = 11; // ten images in the image (see the url above)
    this.imageFrameNumber = 0; // This is changed to make the sprite animate  
  }

  inicialize() {
    
    this.img = new Image();
    this.img.src = "img/Idle.png";


      var widthOfImage = 1540; // find the width of the image
      this.height = 85/1540 * widthOfImage; // find the height of the image
      this.y = this.canvas.height - 150;
      this.width = (widthOfImage / this.totalNumberOfFrames); // The width of each image in the spirite
      
      this.img.onload = () =>this.ctx.drawImage(this.img, this.imageFrameNumber * this.width, 0, // x and y - where in the sprite
        this.width, this.height, // width and height
        this.x, this.y, // x and y - where on the screen
        100, 150// width and height
      );

      /*this.width = 200;
      this.height = (80 / 94) * this.width;
      this.x = 0;
      this.y = this.canvas.height - this.height;
      this.img = new Image();
      this.img.onload = () => this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
      this.img.src = 'img/spellun-sprite.png';*/
    
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
      if (this.y >= this.canvas.height - 150) {
        this.y = this.canvas.height - 150;
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
      //this.ctx.drawImage(this.img, this.x, this.y, 120, 80 / 94 * this.width);
      this.imageFrameNumber++;
      this.imageFrameNumber = this.imageFrameNumber % this.totalNumberOfFrames;
      this.ctx.drawImage(this.img, this.imageFrameNumber * this.width, 0, // x and y - where in the sprite
        this.width, this.height, // width and height
        this.x, this.y, // x and y - where on the screen
        100,150 // width and height
      );
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
        this.bottom() < enemy.top() - 1 ||
        this.top() > enemy.bottom() + 1 ||
        this.right() < enemy.left() - 1 ||
        this.left() > enemy.right() + 1
      );
    }


    kill(enemy) {
      if (this.attack) {
        console.log("kill");
        console.log(this.x + this.width);
        console.log(enemy.left());
        this.attack = false;
        return (this.x + this.width + 10 > enemy.left());
      }
    }

    loseArmor() {
      if (this.armorLevel > 0) {
        this.armorLevel--;
      }

    }

  }