class Level {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.knight = null;
        this.enemies = [];
        this.isGameOver = false;
        this.img = null;
        this.x = 200;
        this.y = 0;
        this.width = 0;
        this.height = 0;
    }

    //Math.random() > 0.97

    startLoop() {
        this.knight = new Knight(this.canvas, 100);
        this.inicialize();
        this.knight.inicialize();

        const loop = () => {
            if (this.enemies.length === 0) {
                //var y = this.canvas.height - 100;
                this.enemies.push(new Enemy(this.canvas, this.knight));
                this.enemies[this.enemies.length - 1].inicialize();
            }
            //console.log("oups");

            this.update();
            this.knight.newPos();
            this.knight.update();
            this.knight.score();
            this.updateEnemies();
            //console.log("end oups");
            this.checkAllCollisions();
            if (!this.isGameOver) {
                window.requestAnimationFrame(loop);
            }

        };

        window.requestAnimationFrame(loop);
    }



    inicialize() {
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.img = new Image();
        this.img.src = "img/dark-forest 3.jpg";
        this.img.onload = () => this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    update() {
        this.width = this.img.width;
        //ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.ctx.drawImage(this.img, this.x, 0, this.width, this.height);
        //ctx.drawImage(this.img, this.x - this.img.width, 0, this.width, this.height);
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
            //this.enemies[i].x -= 1;
            if (this.knight.attack && this.knight.kill(this.enemies[0])) {
                console.log("i am in");
                console.log(this.knight.kill(this.enemies[0]));
                this.enemies.splice(0, 1);
                this.knight.points++;
            } else {
                this.enemies[i].update();
            }
        }
        //console.log(this.enemies.length);
    }


    checkAllCollisions() {
        this.enemies.some((enemy, index) => {
            if (enemy.kill()) {
                this.knight.loseArmor();
            }
            /*switch (this.knight.checkCollisionEnemy(enemy)) {
                case "bottom":
                    this.knight.y = enemy.top() + this.knight.height;
                    break;
                case "top":
                    this.knight.y = enemy.bottom();
                    break;
                case "left":
                    this.knight.x = enemy.left();
                    console.log("case:left");
                    break;
                case "right":
                    this.knight.x = enemy.right() - this.knight.height;
                    break;
            }*/
            if (this.knight.armorLevel === 0) {

                this.isGameOver = true;
                this.onGameOver();
            }
        });
    }

    gameOverCallback(callback) {
        this.onGameOver = callback;
    }
}