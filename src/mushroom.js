class Mushroom extends Enemy {
    constructor(canvas, knight) {
        //Datos a entrar: 1 - elemento canvas(canvas), 2 - el jugador(knight), 3 -  nombre del tipo de enemigo(eg."mushroom"), 
        //4 - src imagen del tipo de enemigo, 5 - número de frames, 6 - Número de filas, 7 - fila del enemigo, 8 - ancho de la imagen
        //9- altura de la imagen, 10 - velocidad de dibujado, 11 - Altura del enemigo en la área de juego, 12 - posición X de inicio, 13 - posición Y de inicio, 
        // 14 - vida, 15 - fruerza,   16 - probabilidad de impacto
        //super(canvas, knight, "mushroom", "img/Mushroom left.png", 8, 1, 0, 1200, 43, 200, 15, 4, undefined, undefined, 8, 96);
        super(canvas, knight, "mushroom", "img/Mushroom left.png", 8, 1, 0, 1200, 43, 8, 200, undefined, undefined, 15, 4, 96);
    }

    update() {
        super.update();
        this.x -= 2 + this.knight.speedX;
    }

}