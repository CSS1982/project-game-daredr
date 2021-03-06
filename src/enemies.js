//Clase para generar los enemigos
class Enemy {
    //constructor(canvas, knight, type, source, totalNumberOfFrames, numberofRows, row, imageWidth, imageHeight, height, health, strength, x, y, animationSpeed, chance)
    constructor(canvas, knight, type, source, totalNumberOfFrames, numberofRows, row, imageWidth, imageHeight, animationSpeed, height, x, y, health, strength, chance) {
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
        this.animationSpeed = animationSpeed;
        this.updateCounter = 0;
        this.health = health;
        this.strength = strength;
        this.type = type;
        this.chance = chance;
    }

    //Inicialización enemigos
    inicialize() {

        this.widthOfUnit = (this.imageWidth / this.totalNumberOfFrames);
        this.width = this.widthOfUnit * this.height / this.heightOfImage;//Imagen total
        this.img = new imageG(this.ctx, this.source, this.imageWidth, this.imageHeight, this.height, this.totalNumberOfFrames, this.numberOfRows, this.row);
        this.img.inicialize();
        if (this.x === undefined) {

            this.x = this.img.width / 2 + this.canvas.width;
        }
        if (this.y === undefined) {
            this.y = this.canvas.height - this.img.height;
        }

        this.width = this.img.width;//Imagen frame
        this.img.update(this.x - this.img.width / 2, this.y, this.direction, this.type);
    }

    //Inicialización enemigos
    update() {
        if (this.knight.right() > this.x && this.knight.left() < this.left()) {
            this.speedX = 0;
        }
        if (this.updateCounter % this.animationSpeed) {
            this.img.update(this.x - this.img.width / 2, this.y);
        }
        this.updateCounter++;
    }
    
    //límite izquierda
    left() {
        return this.x - this.width / 2;
    }

    //límite derecha
    right() {
        return this.x + this.width / 2;
    }

    //límite arriba
    top() {
        return this.y;
    }

    //límite abajo
    bottom() {
        return this.y + this.height;
    }

    //validación área de ataque
    killZone() {
        return this.knight.right() > this.left() && this.knight.right() < this.right() && this.knight.bottom() > this.y;
    }

    //cálculo puntos de daño
    kill() {
        if (this.killZone() && Math.floor(Math.random() * 100) > this.chance) {
            return Math.floor(Math.random() * this.strength);
        } else {
            return 0;
        }
    }

    //pérdida de puntos de vida
    receiveDamage(damage) {
        this.health -= damage;
    }

}