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
        this.encounter = 10;
        this.frames = 0;
        this.fireballs = [];
        this.mode = undefined; //Possible values: "easy", "medium", "hard", "endless"
        this.simultaneousEnemies = 2;
    }

    startLoop() {
        this.knight = new Knight(this.canvas, 100);
        this.inicialize();
        this.knight.inicialize();

       /* switch (mode) {
            case "easy":
                this.simultaneousEnemies = 2;
                this.encounter = 3;
                break;
            case "medium":
                this.simultaneousEnemies = 3;
                this.encounter = 5;
                break;
            case "hard":
                this.simultaneousEnemies = 3;
                this.encounter = 10;
                break;
            case "endless":
                this.simultaneousEnemies = 3;
                this.encounter = 100;
                break;

        }*/



        const loop = () => {
            if (this.enemies.length <= this.simultaneousEnemies) {
                if (this.encounter > 0) {
                    if (Math.floor(Math.random() > 0.97)) {
                        var dice = 0;
                        dice = Math.floor(Math.random() * 10);
                        if (dice < 2) {
                            this.enemies.push(new Mushroom(this.canvas, this.knight));
                            this.enemies[this.enemies.length - 1].inicialize();
                            this.encounter--;
                        } else if (dice < 5) {
                            this.enemies.push(new Skeleton(this.canvas, this.knight));
                            this.enemies[this.enemies.length - 1].inicialize();
                            this.encounter--;
                        } else if (dice < 7) {
                            this.enemies.push(new EvilEye (this.canvas, this.knight));
                            this.enemies[this.enemies.length - 1].inicialize();
                            this.encounter--;
                        }else if (dice < 8) {
                            this.enemies.push(new Disciple(this.canvas, this.knight));
                            this.enemies[this.enemies.length - 1].inicialize();
                            this.encounter--;
                        }
                    }
                }
            }
            this.update();
            this.knight.newPos(this.enemies);
            this.knight.update();
            this.knight.status();
            this.updateEnemies();
            this.checkAllAttacks();
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
        this.ctx.font = "25px Creepster";
        this.ctx.fillStyle = "red";
        this.ctx.fillText("Jump: W", 0, 50);
        this.ctx.fillText("Right: D", 0, 80);
        this.ctx.fillText("Left: A", 0, 110);
        this.ctx.fillText("Attack: K", 0, 140);
    }

    updateEnemies() {
        for (let i = 0; i < this.enemies.length; i++) {
            if (this.enemies[i].x > 0.55 * this.canvas.width) {
                this.enemies[i].x -= 1;
            } else {
                this.enemies[i].x -= 0;
            }
            if ((this.knight.attack && this.knight.right() > this.enemies[i].left() && this.knight.left() < this.enemies[i].left() && this.knight.direction === "right") ||
                (this.knight.attack && this.knight.left() > this.enemies[i].right() && this.knight.right() > this.enemies[i].right() && this.knight.direction === "left")) //check for attack left
            {
                this.enemies[i].receiveDamage(this.knight.attackEnemy());
                if (this.enemies[i].health <= 0 || this.enemies[i].x < 0) {
                    this.enemies.splice(i, 1);
                    this.knight.points++;
                    if (this.enemies.length === 0 && this.encounter === 0) {
                        this.isGameFinished = true;
                        this.onGameFinished();
                    }
                }

            } else {
                this.enemies[i].update();
            }
        }

        for (let i = 0; i < this.fireballs.length; i++) {
            this.fireballs[i].x -= 1;
            if (this.fireballs[i].health <= 0 || this.fireballs[i].x < 0) {
                this.fireballs.splice(i, 1);
            } else {
                this.fireballs[i].update();
            }
        }
    }

    checkAllAttacks() {
        this.enemies.some((enemy) => {
            if (enemy.type === "disciple") {
                if (enemy.summonFireball()) {
                    if (this.fireballs.length <= 4) {
                        this.fireballs.push(new Fireball(this.canvas, this.knight, enemy.x, enemy.y));
                        this.fireballs[this.fireballs.length - 1].inicialize();
                    }
                }
            }else if (enemy.type === "evileye") {
                if (enemy.summonFireball()) {
                    if (this.fireballs.length <= 4) {
                        this.fireballs.push(new Fireball(this.canvas, this.knight, enemy.x, enemy.y));
                        this.fireballs[this.fireballs.length - 1].inicialize();
                    }
                }
            }
            this.knight.loseArmor(enemy.kill());
            if (this.knight.armorLevel <= 0) {
                this.isGameOver = true;
                this.onGameOver();
            }
        });
        this.fireballs.some((fireball) => {
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