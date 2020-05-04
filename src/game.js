class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.knight = null;
        this.enemies = [];
        this.isGameOver = false;
        this.isGameFinished = false;
        this.img = null;
        this.x = 200;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.encounter = 3;
        this.frames = 0;
        this.fireballs = [];
    }

    startLoop() {
        this.knight = new Knight(this.canvas, 100);
        this.inicialize();
        this.knight.inicialize();
        var dice = 0;


        const loop = () => {
            if (this.enemies.length <= 2) {
                if (this.encounter === 0) {
                    this.isGameFinished = true;
                    this.onGameFinished();
                }
                dice = Math.floor(Math.random() * 6);
                if (dice < 3) {
                    this.enemies.push(new Hellhound(this.canvas, this.knight));
                    this.enemies[this.enemies.length - 1].inicialize();
                } else if (dice < 5) {
                    this.enemies.push(new Skeleton(this.canvas, this.knight));
                    this.enemies[this.enemies.length - 1].inicialize();
                } else {
                    this.enemies.push(new Disciple(this.canvas, this.knight));
                    this.enemies[this.enemies.length - 1].inicialize();
                }
            }
        this.update();
        this.knight.newPos(this.enemies);
        this.knight.update();
        this.knight.status();
        this.updateEnemies();
        this.checkAllCollisions();
        if (!this.isGameOver && !this.isGameFinished) {
            window.requestAnimationFrame(loop);
        }

    };

    window.requestAnimationFrame(loop);
}



inicialize() {
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.img = new Image();
    this.img.src = "img/dark-forest-background.jpg";
    this.img.onload = () => this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
}


update() {
    this.width = this.img.width;
    this.ctx.drawImage(this.img, this.x, 0, this.width, this.height);
    this.ctx.drawImage(this.img, this.x - this.width, 0, this.width, this.height);
    this.x -= this.knight.speedX;
    if (this.x <= 0) {
        this.x = this.img.width;
    }
}

updateEnemies() {
    for (let i = 0; i < this.enemies.length; i++) {
        if (this.enemies[i].x > 0.55 * this.canvas.width) {
            this.enemies[i].x -= 1;
        } else {
            this.enemies[i].x -= 0;
        }
        if (this.knight.attack && this.knight.right() > this.enemies[i].left() && this.knight.left() < this.enemies[i].left()) {
            this.enemies[i].receiveDamage(this.knight.attackEnemy());
            if (this.enemies[i].health <= 0) {
                this.enemies.splice(i, 1);
                this.knight.points++;
                this.encounter--;
            }

        } else {
            this.enemies[i].update();
        }
    }

    for (let i = 0; i < this.fireballs.length; i++) {
        this.fireballs[i].x -= 1;
        if (this.fireballs[i].health <= 0 || this.fireballs[i].x < 0) {
            this.fireballs.splice(i, 1);
        }else{
            this.fireballs[i].update();
        }
    }
}




checkAllCollisions() {
    this.enemies.some((enemy, index) => {
        if (enemy.type != "disciple") {
            this.knight.loseArmor(enemy.kill());
        } else {
            if (enemy.summonFireball()) {
                if (this.fireballs.length <= 3) {
                    this.fireballs.push(new Fireball(this.canvas, this.knight, enemy.x, enemy.y));
                    this.fireballs[this.fireballs.length - 1].inicialize();
                }
            }
        }
        if (this.knight.armorLevel <= 0) {

            this.isGameOver = true;
            this.onGameOver();
        }
    });

    this.fireballs.some((fireball, index) => {
        this.knight.loseArmor(fireball.kill());
        if (this.knight.armorLevel <= 0) {
            this.isGameOver = true;
            this.onGameOver();
        }
    });
}

gameOverCallback(callback) {
    this.onGameOver = callback;
}

gameFinishedCallback(callback) {
    this.onGameFinished = callback;
}
}