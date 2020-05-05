//Clase para generar los enemigos
class Enemy {
    constructor(canvas, knight, type, source, totalNumberOfFrames, numberofRows, row, imageWidth, imageHeight, height, health, strength, x, y) {
        this.canvas = canvas;
        this.knight = knight;
        this.ctx = this.canvas.getContext("2d");
        this.width = null;
        this.height = height;
        this.x = x;
        this.y = y;
        this.speedX = -1;
        this.speedY = 0;
        this.direction = "left";
        this.img = null;
        this.source = source;
        this.totalNumberOfFrames = totalNumberOfFrames;
        this.imageFrameNumber = 0;
        this.row = row;
        this.numberOfRows = numberofRows;
        this.imageWidth = imageWidth;
        this.widthOfUnit = null;
        this.imageHeight = imageHeight;
        this.health = health;
        this.strength = strength;
        this.type = type;
    }

    inicialize() {

        this.widthOfUnit = (this.imageWidth / this.totalNumberOfFrames);
        this.width = this.widthOfUnit * this.height / this.heightOfImage;
        this.img = new imageG(this.ctx, this.source, this.imageWidth, this.imageHeight, this.height, this.totalNumberOfFrames, this.numberOfRows, this.row);
        this.img.inicialize();
        if (this.x === undefined){
            this.x = this.img.width / 2 + this.canvas.width;
        }
        this.y = this.canvas.height - this.img.height;
        this.width = this.img.width;
        this.img.update(this.x - this.img.width / 2, this.y, this.direction, this.type);

    }

    update() {
        if (this.knight.right() > this.x && this.knight.left() < this.left()) {
            this.speedX = 0;
        }
        this.img.update(this.x - this.img.width / 2, this.y, this.direction, this.type);
    }

    left() {
        return this.x - this.width / 2;
    }
    right() {
        return this.x + this.width / 2;
    }
    top() {
        return this.y;
    }
    bottom() {
        return this.y + this.height;
    }

    receiveDamage(damage) {
        this.health -= damage;
    }

}