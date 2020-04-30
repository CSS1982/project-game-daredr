//Clase para generar los enemigos
class Enemy {
    constructor(width, height, x,y,canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.speedX = 0;
        this.speedY = 0;
        this.img = new Image();
        this.img.onload = () => this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        this.img.src = 'img/orc.png';
    }

    update() {
        this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
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
}


