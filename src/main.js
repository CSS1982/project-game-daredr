

const main = () => {

    const buildDom = (html) => {
        const main = document.querySelector('main');
        main.innerHTML = html;

    };

    const buildSplashScreen = () => {
        buildDom(`
        <section class="splash-screen" style="text-align:center; margin: 50px 0px;">
        <div style="text-align:center; margin: 50px 0px;">
        <img id ="logo"
          src="img/dare title.png"
          alt="dare image"
          class="game-logo"
        />
      </div>
      <div style="text-align:center; margin: 50px 0px;">
        <button id="start-game-button">START GAME</button>
      </div>
        </section>
        `);
        const startButton = document.querySelector('button');
        startButton.addEventListener('click', buildGameScreen);

    };

    const buildGameScreen = () => {
        buildDom(`
            <section class="game-screen">
                <canvas></canvas>
            </section>
            
        `);

        const width = document.querySelector('.game-screen').offsetWidth;
        const height = document.querySelector('.game-screen').offsetHeight;

        var myMusic;

        function sound(src) {
            this.sound = document.createElement("audio");
            this.sound.src = src;
            this.sound.setAttribute("preload", "auto");
            this.sound.setAttribute("controls", "none");
            this.sound.style.display = "none";
            document.body.appendChild(this.sound);
            this.play = function () {
                this.sound.play();
            };
            this.stop = function () {
                this.sound.pause();
            };
        }
        myMusic = new sound("snd/2019-10-06_-_Villainous_-_David_Fesliyan.mp3");
        myMusic.play();
        const canvasElement = document.querySelector('canvas');

        canvasElement.setAttribute('width', width);
        canvasElement.setAttribute('height', height);

        const level = new Level(canvasElement);

        level.gameOverCallback(buildGameOver);

        level.startLoop();

        const setPlayerDirection = (e) => {
            switch (e.which) {
                case 65: // left arrow-a
                    level.knight.speedX -= 1;
                    break;
                case 68: // right arrow -d
                    level.knight.speedX += 1;
                    break;
                case 87: // up arrow-w
                    level.knight.speedY -= 12;
                    break;
                case 75: // k
                    level.knight.attack = true;
                    break;
            }
        };

        document.addEventListener('keydown', setPlayerDirection);

        document.onkeyup = function (e) {
            level.knight.speedX = 0;
            level.knight.speedY = 0;
        };

    };

    const buildGameOver = () => {
        buildDom(`
            <section class="game-over">
                <h1>Game Over</h1>
                <button>Restart</button>
            </section>
        `);

        const restartButton = document.querySelector('button');
        restartButton.addEventListener('click', buildGameScreen);
    };

    buildSplashScreen();

};

window.addEventListener('load', main);