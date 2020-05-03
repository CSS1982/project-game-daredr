//Clase para generar los enemigos
class Enemy {
    constructor(canvas, knight) {
        this.canvas = canvas;
        this.knight = knight;
        this.ctx = this.canvas.getContext("2d");
        this.width = null;
        this.height = 400;
        this.x = null;
        this.y = null;
        this.speedX = -1;
        this.speedY = 0;
        this.img = null;
        this.totalNumberOfFrames = 4;
        this.imageFrameNumber = 0;
        this.widthOfUnit = null;
        this.heightOfImage = null;
    }

    inicialize() {

        this.img = new Image();
        this.img.src = "img/disciple-45x51 mirrored.png";

        this.widthOfImage = 180; // find the width of the image
    this.heightOfImage = 153/3; // find the height of the image
    this.widthOfUnit = (this.widthOfImage / this.totalNumberOfFrames); // The width of each image in the spirite
    this.width = this.widthOfUnit * this.height / this.heightOfImage;

        this.x = this.canvas.width;
        this.y = this.canvas.height - this.height;
        this.img.onload = () => this.ctx.drawImage(this.img, this.imageFrameNumber * this.widthOfUnit, 0, // x and y - where in the sprite
          this.widthOfUnit, this.heightImage, // width and height
          this.x, this.y, // x and y - where on the screen
          this.width, this.height // width and height
        );
    
      }


    update() {
        //console.log(`Knight speed: ${this.knight.speedX}`);

        if (this.knight.right() > this.x && this.knight.left() < this.left()) {

            this.speedX = 0;
        }
            this.x -= this.knight.speedX;


        this.imageFrameNumber++;
        this.imageFrameNumber = this.imageFrameNumber % this.totalNumberOfFrames;
        this.ctx.drawImage(this.img, this.imageFrameNumber * this.widthOfUnit, 0, // x and y - where in the sprite
            this.widthOfUnit, this.heightOfImage, // width and height
            this.x, this.y, // x and y - where on the screen
            this.width, this.height // width and height
          );
      
    }

    left() {
        return this.x - this.width/3;
    }
    right() {
        return this.x + this.width/3;
    }
    top() {
        return this.y;
    }
    bottom() {
        return this.y + this.height;
    }

    kill() {
        var hit = Math.floor(Math.random()*100) > 95;
        return (hit && this.knight.right() > this.x && this.knight.left() < this.left());
    }
}