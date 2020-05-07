class Game {
    constructor(canvas, mode) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.knight = null; //jugador
        this.armorLevel = null; //vida del jugador
        this.enemies = []; // array de los enemigos
        this.isGameOver = false; 
        this.isGameFinished = false; 
        this.img = null;
        this.x = 200;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.encounter = null;
        this.frames = 0;
        this.fireballs = [];
        this.mode = mode; //Possible values: "easy", "medium", "hard", "endless"
        this.simultaneousEnemies = null;
        this.dice = null; // valor del dado según el cuál se generaran enemigos
        this.diceFaces = null; //caras del dado
        this.source = null; //source de la música
        this.musicGame = new Sound("music");
        this.musicMuted = false;
    }
    //Configuración según la dificultad escogida
    setMode() {
        switch (this.mode) {
            case "easy":
                this.simultaneousEnemies = 2;
                this.encounter = 10;
                this.diceFaces = 8;
                this.armorLevel = 100;
                this.source = "img/dark-forest-background.jpg";
                break;
            case "medium":
                this.simultaneousEnemies = 3;
                this.encounter = 20;
                this.diceFaces = 12;
                this.armorLevel = 250;
                this.source = "img/background-caverns.jpg";
                break;
            case "hard":
                this.simultaneousEnemies = 4;
                this.encounter = 30;
                this.diceFaces = 13;
                this.armorLevel = 400;
                this.source = "img/background-cave.jpg";
                break;

        }
    }

    startLoop() {
        this.setMode(); // Cargar las condiciones de dificultad
        this.knight = new Knight(this.canvas, this.armorLevel); // creación del caballero
        this.inicialize(); //inicilaización del área de juego
        this.knight.inicialize(); //inicialización del caballero
        this.musicGame.play(); //puesta en marcha de la música

        const loop = () => {
            //creación de los enemigos
            if (this.enemies.length <= this.simultaneousEnemies) {
                if (this.encounter > 0) {
                    if (Math.floor(Math.random() > 0.97)) {
                        this.dice = Math.floor(Math.random() * this.diceFaces);
                        if (this.dice < 3) {
                            this.enemies.push(new Mushroom(this.canvas, this.knight));
                            this.enemies[this.enemies.length - 1].inicialize();
                            this.encounter--;
                        } else if (this.dice < 5) {
                            this.enemies.push(new Skeleton(this.canvas, this.knight));
                            this.enemies[this.enemies.length - 1].inicialize();
                            this.encounter--;
                        } else if (this.dice < 8) {
                            this.enemies.push(new EvilEye(this.canvas, this.knight));
                            this.enemies[this.enemies.length - 1].inicialize();
                            this.encounter--;
                        } else if (this.dice < 12) {
                            this.enemies.push(new Disciple(this.canvas, this.knight));
                            this.enemies[this.enemies.length - 1].inicialize();
                            this.encounter--;
                        }
                    }
                }
            }
            
            this.update(); //update de la área de juego
            this.gameControls(); //impresión de los controles en pantalla
            this.knight.newPos(this.enemies); // nueva posición del caballero
            this.knight.update(); // dibujado del caballero
            this.updateEnemies(); //dibujado de los enemigos
            this.checkAllAttacks(); //validación de los ataques
            this.knight.status(); //estado del caballero
            //validación de las condiciones de victoria/derrota
            if (!this.isGameOver && !this.isGameFinished) {
                window.requestAnimationFrame(loop);
            }

        };

        window.requestAnimationFrame(loop);
    }

    //Inicialización Area de juego
    inicialize() {
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.img = new Image();
        this.img.src = this.source;
        this.img.onload = () => this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    //Actualización Area de juego
    update() {
        this.width = this.img.width;
        this.ctx.drawImage(this.img, this.x, 0, this.width, this.height);
        this.ctx.drawImage(this.img, this.x - this.width, 0, this.width, this.height);
        this.x -= this.knight.speedX;
        if (this.x >= this.img.width) {
            this.x = 0;
        }
        if (this.x <= 0) {
            this.x = this.img.width;
        }
    }

    //Actualización de los enemigos
    updateEnemies() {
        //control enemigos
        for (let i = 0; i < this.enemies.length; i++) {
            if (this.enemies[i].x > 0.55 * this.canvas.width) {
                this.enemies[i].x -= 1;
            } else {
                this.enemies[i].x -= 0;
            }
            if (this.knight.checkRightAttack(this.enemies[i]) || this.knight.checkLeftAttack(this.enemies[i])) {
                this.enemies[i].receiveDamage(this.knight.attackEnemy());
                if (this.enemies[i].health <= 0 || this.enemies[i].x < 0) {
                    this.enemies.splice(i, 1);
                    this.knight.points++;
                    if (this.enemies.length === 0 && this.encounter === 0) {
                        this.musicGame.stop();
                        this.isGameFinished = true;
                        this.onGameFinished();
                    }
                }
            } else {
                this.enemies[i].update();
            }
        }
        //control bolas de fuego
        for (let i = 0; i < this.fireballs.length; i++) {
            this.fireballs[i].x -= 1;
            if (this.fireballs[i].health <= 0 || this.fireballs[i].x < 0) {
                this.fireballs.splice(i, 1);
            } else {
                this.fireballs[i].update();
            }
        }
    }
    
    //validación de los ataques
    checkAllAttacks() {
        this.enemies.some((enemy) => {
            if (enemy.type === "disciple" || enemy.type === "evileye") {
                if (enemy.summonFireball()) {
                    if (this.fireballs.length <= 3) {
                        this.fireballs.push(new Fireball(this.canvas, this.knight, enemy.x, enemy.y));
                        this.fireballs[this.fireballs.length - 1].inicialize();
                    }
                }
            }
            this.knight.loseArmor(enemy.kill());
        });
        this.fireballs.some((fireball) => {
            this.knight.loseArmor(fireball.kill());
        });
        if (this.knight.armorLevel <= 0) {
            this.musicGame.stop();
            this.isGameOver = true;
            this.onGameOver();
        }
    }

    //impresión de los controles en pantalla
    gameControls() {
        this.ctx.font = "25px Creepster";
        this.ctx.fillStyle = "red";
        this.ctx.fillText("Jump: W", 0, 50);
        this.ctx.fillText("Right: D", 0, 80);
        this.ctx.fillText("Left: A", 0, 110);
        this.ctx.fillText("Attack: K", 0, 140);
        if (this.musicMuted) {
            this.ctx.fillText("Unmute: M", 0, 170);
        } else {
            this.ctx.fillText("Mute: M", 0, 170);
        }
    }

    //Callback condición derrota
    gameOverCallback(callback) {
        this.onGameOver = callback;
    }

    //Callback condición victoria
    gameFinishedCallback(callback) {
        this.onGameFinished = callback;
    }
}