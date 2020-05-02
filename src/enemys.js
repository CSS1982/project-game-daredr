//Clase para generar los enemigos
class Enemy {
    constructor(width, height, x,y,canvas, knight) {
        this.canvas = canvas;
        this.knight = knight;
        this.ctx = this.canvas.getContext("2d");
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.speedX = -3;
        this.speedY = 0;
        this.img = new Image();
        this.img.onload = () => this.ctx.drawImage(this.img, this.x, this.y - this.height*0.7, this.width, this.height);
        this.img.src = 'img/orc.png';
    }

    update() {
        this.x -= this.knight.speedX;
        //console.log(`Knight speed: ${this.knight.speedX}`);
        this.ctx.drawImage(this.img, this.x,  this.y - this.height*0.7, this.width, this.height);
    }

    left() {
        return this.x + this.width/3;
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
}


