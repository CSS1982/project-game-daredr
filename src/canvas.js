const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
//id de los RequestAnimation Frame.
var id1;

//Forest. Actúa como frame del juego
const forest = {
img: null,
x: 0,
y: 0,
width: 0,
height: 0,

inicialize: function () {
this.width = canvas.width;
this.height = canvas.height;
this.img = new Image();
this.img.src = "img/dark-forest.jpg";
this.img.onload = () => ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
},
update: function () {
this.width = this.img.width;
//ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.drawImage(this.img, this.x, 0, this.width, this.height);
//ctx.drawImage(this.img, this.x - this.img.width, 0, this.width, this.height);
ctx.drawImage(this.img, this.x - this.width, 0, this.width, this.height);
this.x -= 0.5;
if (this.x <= 0) {
this.x = this.img.width;
}

}

};

//Caballero. Actúa como Player.
const knight = {

img: null,
x: 0,
y: 0,
width: 0,
height: 0,
speedX: 0,
speedY: 0,
points: 0,

inicialize: function () {

this.width = 120;
this.height = 80 / 94 * this.width;
this.x = 0;
this.y = canvas.height - this.height;
this.img = new Image();
this.img.onload = () => ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
this.img.src = 'img/spellun-sprite.png';
},

newPos: function () {
this.x += this.speedX;
if (this.x >= forest.width - this.width) {
this.x = forest.width - this.width;
}
if (this.x <= 0) {
this.x = 0;
}
this.y += this.speedY + 0.5;
if (this.y >= canvas.height - this.height) {
this.y = canvas.height - this.height;
} else if (this.y <= canvas.height - 2 * this.height) {
this.y = canvas.height - 2 * this.height;
}
},

left: function () {
return this.x;
},

right: function () {
return this.x + this.width;
},

top: function () {
return this.y;
},

bottom: function () {
return this.y + this.height;
},

update: function () {
ctx.drawImage(this.img, this.x, this.y, 120, 80 / 94 * this.width);
},

score: function () {
this.points = Math.floor(frames / 50);
ctx.font = "24px bold Verdana";
ctx.fillStyle = "red";
ctx.fillText("Score: " + this.points, canvas.width - 200, 50);
},

crashWith: function (enemy) {
return !(
this.bottom() < enemy.top() ||
this.top() > enemy.bottom() ||
this.right() < enemy.left() ||
this.left() > enemy.right()
);
}
};

//Cálculo si la tecla <- o -> ha sido pulsada y aumento el desplazamiento acorde
document.onkeydown = function (e) {
switch (e.which) {
case 37: // left arrow
knight.speedX -= 1;
break;
case 39: // right arrow
knight.speedX += 1;
break;
case 38: // up arrow
knight.speedY -= 12;
break;
}
};

//Si las telas <- o -> se dejan de pulsar se para el desplazamiento lateral
document.onkeyup = function (e) {
knight.speedX = 0;
knight.speedY = 0;
};

//Clase para generar los enemigos
class Enemy {
constructor(width, height, x, y) {
this.width = width;
this.height = height;
this.x = x;
this.y = y;
this.speedX = 0;
this.speedY = 0;
this.img = new Image();
this.img.onload = () => ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
this.img.src = 'img/orc.png';
}

update() {
ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
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
//Creación de la array donde se guardaran todos los enemigos creados
var myEnemies = [];
//frames para hacer avanzar los enemigos
let frames = 0;

//función para actualizar la posición de cada uno de los enemigos
function updateEnemies() {

for (i = 0; i < myEnemies.length; i++) {
myEnemies[i].x -= 1;
myEnemies[i].update();
}
frames += 1;
if (frames % Math.floor(Math.random() * 200 + 200) === 0) {
var y = canvas.height - 80;
var x = canvas.width + 100;
myEnemies.push(
new Enemy(80, 80, x, y));
}
}

//Checkeo si el coche ha chocado con el enemigo
function checkGameOver() {
var crashed = myEnemies.some(function (enemy) {
return knight.crashWith(enemy);
});
if (crashed) {
cancelAnimationFrame(id1);
ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.font = "40px Verdana";
ctx.fillStyle = "red";
ctx.fillText("GAME OVER!", canvas.width * 0.26, canvas.height * 0.4);
ctx.fillStyle = "gold";
ctx.fillText("Score: " + knight.points + " points", canvas.width * 0.25, canvas.height * 0.5);
}
}

//Inicializo Bosque y Caballero
function startGame() {
forest.inicialize();
knight.inicialize();
}

//Actualizo todos los componentes del juego
function updateGame() {
forest.update();
knight.newPos();
knight.update();
knight.score();
updateEnemies();
id1 = requestAnimationFrame(updateGame);
checkGameOver();
}

//Lanzo el juego cuando se pulsa el start-button
window.onload = () => {
document.getElementById('start-game-button').onclick = () => {
startGame();
updateGame();
id1 = requestAnimationFrame(updateGame);
};
};
